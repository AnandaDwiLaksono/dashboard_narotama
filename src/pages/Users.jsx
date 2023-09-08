import { useQuery } from "@tanstack/react-query"
import { FaUserEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { RiUserSearchFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { Header, Footer, Navbar, Sidebar, Table, PopUpConfirmation, LoadingAnimation, ErrorAnimation } from "../components"
import axiosInstance from "../utils/http-interceptors"
import { useEffect } from "react"
import { useStateContext } from "../utils/ContextProvider"

const Users = () => {
  const navigate = useNavigate()

  const { dataUser, setDataUser } = useStateContext()

  const numberFormat = new Intl.NumberFormat('id-ID')

  const dataUsers = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await axiosInstance.get('/administrator/users')
    }
  })

  const Column_Users = [
    {
      Header: 'Foto',
      accessor: 'profile',
      Cell: row => (
        <img
          src={row.value === '' ? '/src/assets/img/profile-photo.jpeg' : `http://182.253.225.226:8000${row.value}`}
          alt={row.value}
          className="rounded-full max-w-[40px] max-h-[40px]"
        />
      )
    },
    {
      Header: 'Username',
      accessor: 'username'
    },
    {
      Header: 'Nama',
      accessor: 'name'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'No HP',
      accessor: 'phone_number'
    },
    {
      Header: 'Saldo',
      accessor: 'acc_balance',
      Cell: row => (
        <span>
          Rp {numberFormat.format(row.value)}
        </span>
      ),
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: row => (
        <span>
          {row.value === 1 ? 'Super Admin' : row.value === 2 ? 'Admin' : 'User'}
        </span>
      ),
    },
    {
      Header: 'Verifikasi',
      accessor: 'verified',
      Cell: row => (
        <span className={`px-4 py-2 rounded-lg text-white ${row.value ? 'bg-success' : 'bg-error'}`}>
          {row.value ? 'Verified' : 'Unverified'}
        </span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'acc_status',
      Cell: row => (
        <span className={`px-4 py-2 rounded-lg text-white ${row.value ? 'bg-success' : 'bg-error'}`}>
          {row.value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      Header: 'Action',
      accessor: 'id',
      Cell: row => (
        <div className="flex justify-center space-x-2">
          <button
            className="bg-secondary text-white text-xl rounded-lg px-2 py-2 hover:bg-opacity-80"
            onClick={() => {
              navigate(`/users/detail/${row.value}`)
              window.location.reload()
            }}
          >
            <RiUserSearchFill />
          </button>
          {localStorage.getItem('ROLE') === 1 && (
            <>
              <button
                className="bg-primary text-white text-xl rounded-lg px-2 py-2 hover:bg-opacity-80"
                onClick={() => navigate(`/users/edit/${row.value}`)}
              >
                <FaUserEdit />
              </button>
              <button
                className="bg-error text-white text-xl rounded-lg px-2 py-2 hover:bg-opacity-80"
                onClick={() => setDataUser(row.row.original)}
              >
                <MdDelete />
              </button>
            </>
          )}
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (dataUser) {
      window.modal_confirmation.showModal()
    }
  }, [dataUser])

  console.log(dataUsers.data?.data)

  return (
    <>
      <div className="flex h-screen relative">
        <Sidebar />
        <div className="w-5/6 pl-2 pr-12">
          <Navbar />
          <div className="flex justify-between">
            <Header title="Daftar User" desc="Temukan Pengguna" />
            {localStorage.getItem('ROLE') === 1 && (
              <button
                className="btn btn-sm btn-primary shadow-md"
                onClick={() => navigate('/users/create')}
              >
                Tambah Pengguna
              </button>
            )}
          </div>
          {dataUsers.isLoading && <LoadingAnimation />}
          {dataUsers.isError && <ErrorAnimation />}
          {dataUsers.isSuccess && dataUsers.isFetched && (
            <Table kolom={Column_Users} dataTabel={dataUsers?.data?.data} />
          )}
          <Footer className="absolute right-12 bottom-0" />
        </div>
      </div>

      {dataUser && <PopUpConfirmation data={dataUser} field='user' />}
    </>
  )
}

export default Users
