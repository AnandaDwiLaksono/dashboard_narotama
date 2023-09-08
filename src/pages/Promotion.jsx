// import { useQuery } from "@tanstack/react-query"
// import { BiEditAlt } from "react-icons/bi"
// import { useNavigate } from "react-router-dom"

import { Header, Footer, Navbar, Sidebar } from "../components"
// import { Header, Footer, Navbar, Sidebar, Table, LoadingAnimation, ErrorAnimation } from "../components"
// import axiosInstance from "../utils/http-interceptors"

const Promotion = () => {
  // const navigate = useNavigate()

  // const dataMenus = useQuery({
  //   queryKey: ['menu'],
  //   queryFn: () => {
  //     return axiosInstance.get('/administrator/menu')
  //   }
  // })

  // const Column_Menus = [
  //   {
  //     Header: 'Id',
  //     accessor: 'id',
  //   },
  //   {
  //     Header: 'Icon',
  //     accessor: 'icon',
  //     Cell: (row) => (
  //       <span>
  //         {row.value === '' ? (
  //           <div className="w-10 h-10 rounded-full bg-base-text text-light text-xl px-[7px] py-[6px]">
  //             {row.row.original.nama.split(' ').slice(0,2).map(word => word.charAt(0))}
  //           </div>
  //         ) : (
  //           <img
  //             src={`http://182.253.225.226:8000${row.value}`}
  //             alt={row.value}
  //             className="w-10 h-10 rounded-full"
  //           />
  //         )}
  //       </span>
  //     )
  //   },
  //   {
  //     Header: 'Nama',
  //     accessor: 'nama'
  //   },
  //   {
  //     Header: 'Endpoint',
  //     accessor: 'endpoint'
  //   },
  //   {
  //     Header: 'Status',
  //     accessor: 'status',
  //     Cell: row => (
  //       <span className={`px-4 py-2 rounded-lg text-white ${row.value ? 'bg-success' : 'bg-error'}`}>
  //         {row.value ? 'Active' : 'Inactive'}
  //       </span>
  //     ),
  //   },
  //   {
  //     Header: 'Deskripsi',
  //     accessor: 'deskripsi'
  //   },
  //   {
  //     Header: 'Action',
  //     Cell: row => (
  //       <button
  //         className="bg-primary text-white text-xl rounded-lg px-2 py-2 hover:shadow-xl hover:bg-opacity-80"
  //         onClick={() => navigate(`/features/edit/${row.row.original.id}`)}
  //       >
  //         <BiEditAlt />
  //       </button>
  //     ),
  //   }
  // ]

  return (
    <div className='flex h-screen relative'>
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        <Header title="Manajemen Promosi" />
        {/* {dataMenus.isLoading && (<LoadingAnimation />)}
        {dataMenus.isError && (<ErrorAnimation />)}
        {dataMenus.isSuccess && dataMenus.isFetched && (
          <Table kolom={Column_Menus} dataTabel={dataMenus.data?.data} />
        )} */}
        <Footer className="absolute right-12 bottom-0" />
      </div>
    </div>
  )
}

export default Promotion
