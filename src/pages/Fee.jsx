import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { BiEditAlt } from "react-icons/bi"

import axiosInstance from "../utils/http-interceptors"
import { ErrorAnimation, Header, LoadingAnimation, Footer, Navbar, Sidebar, Table } from "../components"

const Fee = () => {
  const navigate = useNavigate()

  const numberFormat = new Intl.NumberFormat("id-ID")

  const dataFee = useQuery({
    queryKey: ['fee'],
    queryFn: () => {
      return axiosInstance.get('/administrator/fee')
    }
  })

  const Column_Fee = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
      Header: 'Kode Fee',
      accessor: 'feeCode'
    },
    {
      Header: 'Nama Fee',
      accessor: 'feeName'
    },
    {
      Header: 'Jumlah Fee',
      accessor: 'amount',
      Cell: row => (
        <span>
          Rp {numberFormat.format(row.value)}
        </span>
      ),
    },
    {
        Header: 'Action',
        Cell: row => (
          <button
            className="bg-primary text-white text-xl rounded-lg px-2 py-2 hover:shadow-xl hover:bg-opacity-80"
            onClick={() => navigate(`/fees/edit/${row.row.original.feeCode}`)}
          >
            <BiEditAlt />
          </button>
        ),
    }
  ]

  return (
    <div className='flex h-screen relative'>
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        <Header title="Manajemen Fee" desc="Atur Transaksi" />
        {dataFee.isLoading && (<LoadingAnimation />)}
        {dataFee.isError && (<ErrorAnimation />)}
        {dataFee.isSuccess && dataFee.isFetched && (
          <Table kolom={Column_Fee} dataTabel={dataFee?.data?.data} />
        )}
        <Footer className="absolute right-12 bottom-0" />
      </div>
    </div>
  )
}

export default Fee
