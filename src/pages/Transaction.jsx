/* eslint-disable no-unsafe-optional-chaining */
import { useQuery } from "@tanstack/react-query";
import { Header, Footer, Navbar, Sidebar, Table, LoadingAnimation, ErrorAnimation, } from "../components";
// import { Column_Transaction_History } from "../components/column";
import axiosInstance from "../utils/http-interceptors";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi"

const formatSelection = (date) => {
  const dateString = date;
  const dateObject = new Date(dateString);

  // Mendapatkan tahun, bulan, dan tanggal dari objek Date
  const year = dateObject.getFullYear(); // Tahun (misalnya: 2023)
  const month = dateObject.getMonth() + 1; // Bulan (0-11, jadi kita tambahkan 1)
  const day = dateObject.getDate(); // Tanggal

  // Membuat format YYYY-MM-DD
    const formattedDate = year * 10000 + month * 100 + day;
    return formattedDate;
}

const formatDataDate = (dates) => {
  const dateObject = dates.map((item) => {
    const date = new Date(item);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Tambah 1 karena indeks bulan dimulai dari 0
    const day = date.getDate();

    // Menggabungkan tahun, bulan, dan tanggal menjadi angka 20230815
    const formattedDate = year * 10000 + month * 100 + day;
    return formattedDate;
  });

  return dateObject;
}

const stringDate = (numberDate) => {
  const inputDate = String(numberDate);

  // Memisahkan tahun, bulan, dan tanggal dari tanggal input
  const year = inputDate.slice(0, 4);
  const month = inputDate.slice(4, 6);
  const day = inputDate.slice(6, 8);

  // Membuat tanggal dalam format "YYYY-MM-DD"
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate
}

const Transaction = () => {
  const numberFormat = new Intl.NumberFormat("id-ID")

  const navigate = useNavigate()
  
  // data tanggal
  const currentDate = new Date();
  const [tanggal, setTanggal] = useState([
    {
      endDate: currentDate,
      startDate: null,
      key: "selection",
    },
  ]);

  // fetch API
  const dataTransaksi = useQuery({
    queryKey: ["Transaction"],
    queryFn: () => {
      return axiosInstance.get("/administrator/transaction/")
    },
  })

  if (dataTransaksi.isLoading) return <LoadingAnimation />;
  if (dataTransaksi.isError) return <ErrorAnimation />;

  // ambil tanggal
  const create_atData = dataTransaksi.data?.data.map((item) => item.created_at);
  const dateSelectionStart = tanggal[0].startDate;
  const dateSelectionEnd = tanggal[0].endDate;

  // ubah format
  const dates = dataTransaksi.data?.data;
  const dataDate = formatDataDate(create_atData);

  // filtering
  const filteringDate = (date) => {
    const startDate = formatSelection(dateSelectionStart);
    const endDate = formatSelection(dateSelectionEnd);
    return date >= startDate && date <= endDate;
  };
  const filteredDate = dataDate.filter(filteringDate);

  // index
  const bottomDate = filteredDate[0];
  const topDate = filteredDate[filteredDate.length - 1];
  const indexAwal = dataDate.indexOf(bottomDate);
  const indexAkhir = dataDate.lastIndexOf(topDate);

  // potong data
  const result = dates.slice(indexAwal, indexAkhir + 1);

  const startDateString = formatSelection(dateSelectionStart)
  console.log(stringDate(startDateString));

  const Column_Transaction_History = [
    {
        Header: 'Tanggal',
        accessor: 'created_at',
        Cell: row => (
            <span>
                {new Date(row.value).toLocaleDateString()+ ' ' + new Date(row.value).toLocaleTimeString()}
            </span>
        ),
    },
    {
        Header: 'Nama Pengguna',
        accessor: 'user.name',
    },
    {
        Header: 'Nama Transaksi',
        accessor: 'transaction_name'
    },
    {
        Header: 'Jumlah',
        accessor: 'amount',
        Cell: row => (
            <span>
              Rp {numberFormat.format(row.value)}
            </span>
        ),
    },
    {
        Header: 'Kategori',
        accessor: 'category',
    },
    {
        Header: 'Tipe',
        accessor: 'type',
        Cell: row => (
            <span>
                {
                    row.value === 1 ? 'TopUp & Tarik Saldo' :
                    (row.value === 2 ? 'Transfer Saldo' :
                    (row.value === 3 ? 'Terima Pembayaran' :
                    (row.value === 4 ? 'IRS(Pulsa)' :
                    (row.value === 5 ? 'IRS(PLN)' :
                    (row.value === 6 ? 'IRS(E-Wallet)' :
                    (row.value === 7 ? 'IRS(Voucer Game)' :
                    (row.value === 8 ? 'Bayar Kuliah': 'Tipe Tidak Dikenali'
                    )))))))
                }
            </span>
        ),
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: row => (
            <span className={`py-2 rounded-lg text-current ${row.value === "1" ? 'bg-success px-[17px]' : (row.value === "2" ? 'bg-gray-400 px-4' : 'bg-error px-[22px]')}`}>
              {row.value === "1" ? 'Success' : (row.value === "2" ? 'Pending' : 'Failed')}
            </span>
        ),
    },
    {
        Header: 'No Referensi',
        accessor: 'no_ref',
    },
    {
        Header: 'Action',
        accessor: 'id',
        Cell: row => (
            <button
            className="bg-primary text-white text-xl rounded-lg px-2 py-2 hover:shadow-xl hover:bg-opacity-80"
            onClick={() => navigate(`/transactions/detail/${row.row.original.no_ref}/${row.row.original.type}`)}
          >
            <BiSearchAlt />
          </button>
        ),
    }
  ]

  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        <Header title="Daftar Transaksi" />
        <div className="flex items-center">
          <div className="dropdown">
            <span className="mr-2">Tanggal</span>
            <label tabIndex={0} className="btn btn-sm border-2 mt-4 mb-2">
              <BsFillCalendarWeekFill />
              {formatSelection(dateSelectionStart) < 20230101 ? "Early" : stringDate(formatSelection(dateSelectionStart))} - {" "}
              {stringDate(formatSelection(dateSelectionEnd))}
            </label>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] card card-compact w-auto p-2 bg-white border-[1px] border-base-text shadow-2xl text-primary-content">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setTanggal([item.selection]);
                }}
                moveRangeOnFirstSelection={false}
                ranges={tanggal}
              />
            </div>
          </div>
        </div>

        <Table
          kolom={Column_Transaction_History}
          dataTabel={dataTransaksi.data?.data?.reverse()}
          jenis={"transaction"}
          filter={result}
        />

        <Footer className="absolute right-12 -bottom-10" />
      </div>
    </div>
  )
}

export default Transaction
