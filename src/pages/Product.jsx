import { useEffect, useState } from "react"
import { Header, Footer, Navbar, Sidebar, Table } from "../components"
import { Column_Product } from "../components/column"
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
