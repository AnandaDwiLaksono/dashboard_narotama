import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { BiEditAlt } from "react-icons/bi"

import { Header, Footer, Navbar, Sidebar, Table, LoadingAnimation, ErrorAnimation } from "../components"
import axiosInstance from "../utils/http-interceptors"

const DataBank = () => {
  const navigate = useNavigate()

  const dataBank = useQuery({
    queryKey: ['bank'],
    queryFn: () => {
      return axiosInstance.get('/administrator/bank')
    }
  })

  const Column_Bank = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Logo',
      accessor: 'icon',
      Cell: (row) => (
        <span>
          {row.value === '' ? (
            <div className="w-10 h-10 rounded-full bg-base-text text-light text-xl px-[7px] py-[6px]">
              {row.row.original.name.split(' ').slice(0,2).map(word => word.charAt(0))}
            </div>
          ) : (
            <img
              src={`http://182.253.225.226:8000${row.value}`}
              alt={row.value}
              className="w-10 h-10 rounded-full"
            />
          )}
        </span>
      )
    },
    {
      Header: 'Kode Bank',
      accessor: 'code'
    },
    {
      Header: 'Nama Bank',
      accessor: 'name'
    },
    {
      Header: 'Action',
      Cell: row => (
        <button
          className="bg-primary text-white text-xl rounded-lg px-2 py-2 hover:shadow-xl hover:bg-opacity-80"
          onClick={() => navigate(`/data banks/edit/${row.row.original.code}`)}
        >
          <BiEditAlt />
        </button>
      ),

    }
  ]

  console.log(dataBank.data?.data)

  return (
    <div className='flex h-screen relative'>
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        <Header title="Manajemen Bank" desc="Atur Transaksi" />
        {dataBank.isLoading && <LoadingAnimation />}
        {dataBank.isError && <ErrorAnimation />}
        {dataBank.isSuccess && dataBank.isFetched && (
          <Table kolom={Column_Bank} dataTabel={dataBank.data?.data.sort((a, b) => a.code - b.code)} />
        )}
        <Footer className="absolute right-12 bottom-0" />
      </div>
    </div>
  )
}

export default DataBank
