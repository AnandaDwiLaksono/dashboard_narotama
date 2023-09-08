import { useQuery } from "@tanstack/react-query"

import { Footer, Navbar, Sidebar, ModalEditUser, ModalEditFitur, LoadingAnimation, ErrorAnimation, ModalEditFee, ModalEditProduct, ModalEditBank } from "../components"
import axiosInstance from "../utils/http-interceptors"

const Edit = () => {
  const pathSegments = new URL(window.location.href).pathname.split('/')

  const data = useQuery({
    queryKey: ['data'],
    queryFn: () => {
      if (pathSegments[1] === 'users') {
        return axiosInstance.get(`/administrator/users/${pathSegments[3]}`)
      }

      if (pathSegments[1] === 'features') {
        return axiosInstance.get(`/administrator/menu/${pathSegments[3]}`)
      }

      if (pathSegments[1] === 'fees') {
        return axiosInstance.get(`/administrator/fee/${pathSegments[3]}`)
      }

      if (pathSegments[1] === 'products') {
        return axiosInstance.get(`/administrator/product/irs/${pathSegments[4]}/${pathSegments[5]}`)
      }

      if (pathSegments[1] === 'data%20banks') {
        return axiosInstance.get(`/administrator/bank/${pathSegments[3]}`)
      }
    },
  })

  console.log(pathSegments)

  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        {data.isLoading && (<LoadingAnimation />)}
        {data.isError && (<ErrorAnimation />)}
        {data.isSuccess && data.isFetched && (
          pathSegments[1] === 'users' && (
            <ModalEditUser data={data.data?.data} />
          ) || pathSegments[1] === 'features' && (
            <ModalEditFitur data={data.data?.data} />
          ) || pathSegments[1] === 'fees' && (
            <ModalEditFee data={data.data?.data} />
          ) || pathSegments[1] === 'products' && (
            <ModalEditProduct data={data.data?.data} />
          ) || pathSegments[1] === 'data%20bank' && (
            <ModalEditBank data={data.data?.data} />
          )
        )}
        <Footer className="absolute right-12 bottom-0" />
      </div>
    </div>
  )
}

export default Edit
