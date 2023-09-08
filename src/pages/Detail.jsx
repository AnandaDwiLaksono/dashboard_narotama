import { useQuery } from "@tanstack/react-query"

import { Footer, Navbar, Sidebar, ModalUserDetail, LoadingAnimation, ErrorAnimation, ModalTransaction, ModalProvider } from "../components"
import axiosInstance from "../utils/http-interceptors"

const Detail = () => {
  const urlString = window.location.href
  const parsedUrl = new URL(urlString)
  const pathSegments = parsedUrl.pathname.split('/')

  const data = useQuery({
    queryKey: ['data'],
    queryFn: () => {
      if (pathSegments[1] === 'users') {
        return axiosInstance.get(`/administrator/users/${pathSegments[3]}`)
      }

      if (pathSegments[1] === 'transactions') {
        return axiosInstance.get(`/administrator/transaction/${pathSegments[3]}?type=${pathSegments[4]}`)
      }

      if (pathSegments[1] === 'products') {
        return axiosInstance.get(`/administrator/layanan/${pathSegments[3]}`)
      }
    }
  })

  const dataTable = useQuery({
    queryKey: ['table'],
    queryFn: () => {
      if (pathSegments[1] === 'users') {
        return axiosInstance.get(`/administrator/transaction/user/${pathSegments[3]}`)
      } else if (pathSegments[1] === 'products') {
        return axiosInstance.get(`/administrator/product/irs/${pathSegments[4]}`)
      } else {
        return null
      }
    }
  })

  console.log(pathSegments)
  console.log(data.data?.data)
  console.log(dataTable.data?.data.reverse())

  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        {data.isLoading && dataTable.isLoading && (<LoadingAnimation />)}
        {data.isError && dataTable.isError && (<ErrorAnimation />)}
        {data.isSuccess && dataTable.isFetched && pathSegments[1] === 'users' && (
          <ModalUserDetail dataUser={data?.data?.data} dataTransactionUser={dataTable.data?.data.reverse()} />
        )}
        {data.isSuccess && dataTable.isFetched && pathSegments[1] === 'transactions' && (
          <ModalTransaction data={data?.data?.data} url={pathSegments} />
        )}
        {data.isSuccess && dataTable.isFetched && pathSegments[1] === 'products' && (
          <ModalProvider dataProvider={data?.data?.data} dataProducts={dataTable.data.data} />
        )}
        <Footer className="absolute right-12 bottom-0" />
      </div>
    </div>
  )
}

export default Detail
