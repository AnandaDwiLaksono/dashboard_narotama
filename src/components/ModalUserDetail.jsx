import { useNavigate } from 'react-router-dom'
import { BiSearchAlt } from 'react-icons/bi'

import { Table } from '.'

/* eslint-disable react/prop-types */
const ModalUserDetail = ({ dataUser, dataTransactionUser }) => {
  const navigate = useNavigate()

  const numberFormat = new Intl.NumberFormat('id-ID')

  const Column_User_Transaction_History = [
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
          onClick={() => {
            navigate(`/transactions/detail/${row.row.original.no_ref}/${row.row.original.type}`)
            window.location.reload()
          }}
        >
          <BiSearchAlt />
        </button>
      ),
    }
  ]
  
  return (
    <div className="modal-box max-h-[calc(100%-136px)] max-w-full w-full">
      <h3 className="font-bold text-lg capitalize">Detail Pengguna</h3>
      <div>
        <div className="profil flex justify-center mb-4">
          <div className="avatar">
            <div className="w-24 rounded-full shadow-md ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={dataUser.profile === '' ? '/src/assets/img/profile-photo.jpeg' : `http://182.253.225.226:8000${dataUser.profile}`} />
            </div>
          </div>
        </div>
        <label className="label">
          <span className="label-text font-bold">Username</span>
        </label>
        <input
          type="text"
          defaultValue={dataUser.username}
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <label className="label">
          <span className="label-text font-bold">Saldo</span>
        </label>
        <input
          type="text"
          defaultValue={`Rp. ${numberFormat.format(dataUser.acc_balance)}`}
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <label className="label">
          <span className="label-text font-bold">Riwayat Transaksi</span>
        </label>
        <Table kolom={Column_User_Transaction_History} dataTabel={dataTransactionUser.sort((a, b) => b.id - a.id)} />
        <div className="flex justify-end mt-4">
          <button 
            className="btn text-white bg-success hover:bg-success/70 active:bg-green-900"
            onClick={() => {navigate('/users'), window.location.reload()}}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalUserDetail
