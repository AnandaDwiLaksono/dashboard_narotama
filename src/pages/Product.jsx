import { useEffect, useState } from "react"

import { Header, Footer, Navbar, Sidebar, Table } from "../components"
import axiosInstance from "../utils/http-interceptors"


const Product = () => {
  const [data, setData] = useState([]) // Menggunakan state untuk menyimpan data

  const listProviderPulsa = [ 'telkomsel', 'three', 'xl', 'smartfren', 'indosat' ]
  const listProviderEwallet = [ 'dana', 'mandiri', 'gopay', 'grab-driver', 'linkaja', 'ovo-admin1000', 'shopeepay' ]
  const listProviderGame = [ 'aov', 'codm', 'ff', 'ml', 'pubg' ]

  useEffect(() => {
    const fetchData = async () => {
      const combinedData = []

      for (const item of listProviderPulsa) {
        const response = await axiosInstance.get(`/administrator/product/irs/pulsa-data/${item}`)
        combinedData.push(...response.data)
      }

      for (const item of listProviderEwallet) {
        const response = await axiosInstance.get(`/administrator/product/irs/ewallet/${item}`)
        combinedData.push(...response.data)
      }

      for (const item of listProviderGame) {
        const response = await axiosInstance.get(`/administrator/product/irs/voucher-game/${item}`)
        combinedData.push(...response.data)
      }

      const plnResponse = await axiosInstance.get(`/administrator/product/irs/pln/prepaid`)
      combinedData.push(...plnResponse.data)

      setData(combinedData)
    }

    fetchData()
  }, []) // Empty dependency array to ensure the effect runs once on mount

  const Column_Product = [
    {
        Header: 'Kode Produk',
        accessor: 'product_code',
    },
    {
        Header: 'Nama Produk',
        accessor: 'product_name'
    },
    {
        Header: 'Harga Dasar',
        accessor: 'harga_dasar',
        Cell: row => (
            <span>
            Rp {numberFormat.format(row.value)}
            </span>
        ),
    },
    {
        Header: 'Harga Jual',
        accessor: 'harga_jual',
        Cell: row => (
            <span>
            Rp {numberFormat.format(row.value)}
            </span>
        ),
    },
    {
        Header: 'Cashback',
        accessor: 'cashback',
        Cell: row => (
            <span>
            Rp {numberFormat.format(row.value)}
            </span>
        ),
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: row => (
            <span className={`px-4 py-2 rounded-lg text-current ${row.value ? 'bg-success' : 'bg-error'}`}>
              {row.value ? 'Active' : 'Inactive'}
            </span>
        ),
    },
    {
        Header: 'Deskripsi Produk',
        accessor: 'product_description',
    },
  ]

  console.log(data)

  if (data.length > 0) {
    return (
      <div className="flex h-screen relative">
        <Sidebar />
        <div className="w-5/6 pl-2 pr-12">
          <Navbar />
          <Header title="Manajemen Produk" desc="Atur Transaksi" />
          <Table kolom={Column_Product} dataTabel={data} />
          <Footer className="absolute right-12 bottom-0" />
        </div>
      </div>
    )
  }
}

export default Product
