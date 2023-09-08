import { useQuery } from "@tanstack/react-query"
import { Header, Footer, Navbar, Sidebar, Table, LoadingAnimation, ErrorAnimation } from "../components"
import axiosInstance from "../utils/http-interceptors"
import { useNavigate } from "react-router"
import { BiSearchAlt } from "react-icons/bi"

const Provider = () => {
  const navigate = useNavigate()

  const dataProvider = useQuery({
    queryKey: ['data'],
    queryFn: () => {
      return axiosInstance.get('/administrator/layanan')
    }
  })

  const Column_Provider = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Icon',
      accessor: 'icon',
      Cell: (row) => (
        <span>
          {row.value === '' ? (
            <div className="w-10 h-10 rounded-full bg-base-text text-light text-xl px-[7px] py-[6px]">
              {row.row.original.service_name.split(' ').slice(0,2).map(word => word.charAt(0))}
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
      Header: 'Kode Provider',
      accessor: 'service_code',
    },
    {
      Header: 'Nama Provider',
      accessor: 'service_name',
    },
    {
      Header: 'Fitur',
      accessor: 'feature',
    },
    {
      Header: 'Action',
      Cell: row => (
        <div className="flex justify-center space-x-2">
          <button
            className="bg-primary text-white text-xl rounded-lg px-2 py-2 hover:bg-opacity-80"
            onClick={() => navigate(`/products/list/${row.row.original.id}/${row.row.original.service_code}`)}
          >
            <BiSearchAlt />
          </button>
        </div>
      ),
    },
  ]

  console.log(dataProvider.isFetched)
  console.log(dataProvider.isSuccess)

  return (
    <div className='flex h-screen relative'>
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        <Header title="Manajemen Produk"/>
        {dataProvider.isLoading && (<LoadingAnimation />)}
        {dataProvider.isError && (<ErrorAnimation />)}
        {dataProvider.isSuccess && dataProvider.isFetched && (
          <Table kolom={Column_Provider} dataTabel={dataProvider?.data?.data?.sort((a, b) => a.id - b.id)} />
        )}
        <Footer className="absolute right-12 bottom-0" />
      </div>
    </div>
  )
}

export default Provider
