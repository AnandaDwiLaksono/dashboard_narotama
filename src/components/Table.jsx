/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useMemo, useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,

} from "react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "../assets/css/scrollBar.css";
import ExportFile from "./ExportFile";


const Table = ({kolom, dataTabel, ...props}) => {

  const columns = useMemo(() => kolom, []);
  const [data, setData] = useState(dataTabel);

  useEffect(() => {
    if (props.jenis === "transaction") {
      setData(props.filter);
    }
  }, [props.filter, props.jenis]);

  // console.log("ini adalah filter cuy: ", props.filter);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;
  const { globalFilter } = state;


  // console.log(data);
  // console.log("ini adalah filter cuy: ",props.filter);
  // console.log("variabel page", page)
  // if (props.jenis === "transaction") {
  //   const dateString = "2023-08-03T11:21:48.996295+07:00";
  //   const dateObject = new Date(dateString);
  // }



  return (
    <div className="h-[70%] overflow-y-auto rounded-xl border-solid border-[1px] border-base-text py-6">
      <div
        className={`flex ${
          props.jenis === "transaction" ? "justify-between" : "justify-end"
        } mb-6 px-8`}>
        {props.jenis === "transaction" ? (
          <ExportFile dataExport={dataTabel} fileName={props.jenis} />
        ) : (
          ""
        )}
        <div className="flex items-center">
          <span className="mr-2">Search</span>
          <input
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Cari disemua tabel..."
            className="input input-bordered w-full max-w-xs input-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto flex items-stretch px-4">
        <table
          className="table table-zebra text-base table-sm self-start"
          {...getTableProps()}>
          {/* head */}
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      column.id !== "name" &&
                        column.id !== "username" &&
                        column.id !== "balance" &&
                        column.id !== "transaction_name" &&
                        column.id !== "type" &&
                        column.id !== "created_at" &&
                        column.id !== "user.name" &&
                        column.id !== "code" &&
                        column.id !== "id"
                        ? {}
                        : column.getSortByToggleProps()
                    )}
                    className="text-normal">
                    <div className="flex items-center">
                      {/* merender Header */}
                      {column.render("Header")}

                      {/* Sortings*/}
                      {column.id !== "name" &&
                      column.id !== "username" &&
                      column.id !== "balance" &&
                      column.id !== "transaction_name" &&
                      column.id !== "type" &&
                      column.id !== "created_at" &&
                      column.id !== "user.name" &&
                      column.id !== "code" &&
                      column.id !== "id" ? (
                        ""
                      ) : column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaSortUp className="text-sm" />
                        ) : (
                          <FaSortDown className="text-sm" />
                        )
                      ) : (
                        <FaSort className="text-sm" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              // console.log("ini adalah row :",row);
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center mt-4 justify-between px-8">
        <select
          className="border-[1px] rounded-md p-1"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div>
          <button
            className="btn mr-4 border-primary btn-sm shadow-md"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}>
            Previous
          </button>
          <span className="mr-5">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button
            className="btn bg-primary text-white btn-sm shadow-md hover:text-primary"
            onClick={() => nextPage()}
            disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table