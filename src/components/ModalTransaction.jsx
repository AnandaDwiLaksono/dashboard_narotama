import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/http-interceptors'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

/* eslint-disable react/prop-types */
const ModalTransaction = ({ data, url }) => {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()

  const numberFormat = new Intl.NumberFormat('id-ID')

  const dataUser = useQuery({
    queryKey: ['dataUser'],
    queryFn: () => {
      return axiosInstance.get(`/administrator/users/${data?.uuid ? data?.uuid : data?.user_id}`)
    },
  })

  const editStatus = useMutation({
    mutationFn: (dataUser) => {
      return axiosInstance.post('/administrator/users/create', dataUser)
    },
  })

  const onSubmitHandler = (data) => {
    console.log(data)

    const dataPayload = {
      transaction_status: parseInt(data?.transaction_status),
      message: data?.message ? data?.message : '',
    }

    console.log(dataPayload)
    editStatus.mutate(dataPayload, {
      onSuccess: () => {
        toast.success('Berhasil mengubah status transaksi')
        navigate('/transactions')
        window.location.reload()
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message)
      }
    })
  }

  let formatDetailRiwayatTransaksi = []

  if (url[4] === '1' && data?.type === 1) {
    formatDetailRiwayatTransaksi = [
      {
        label: 'Tipe Transaksi',
        value: 'Top Up Saldo'
      },
      {
        label: 'Nominal Top Up Saldo',
        value: 'Rp ' + numberFormat.format(data?.amount)
      },
      {
        label: 'Biaya Transaksi',
        value: 'Rp ' + numberFormat.format(data?.fee)
      },
    ]
  }

  if (url[4] === '1' && data?.type === 2) {
    formatDetailRiwayatTransaksi = [
      {
        label: 'Tipe Transaksi',
        value: 'Tarik Saldo'
      },
      {
        label: 'Bank Tujuan',
        value: data?.bank_data?.name
      },
      {
        label: 'No. Rekening',
        value: data?.no_rek
      },
      {
        label: 'Nama Pemilik Rekening',
        value: data?.nama_pemilik
      },
      {
        label: 'Nominal Tarik Saldo',
        value: 'Rp ' + numberFormat.format(data?.amount)
      },
      {
        label: 'Biaya Transaksi',
        value: 'Rp ' + numberFormat.format(data?.fee)
      },
    ]
  }

  if (url[4] === '2') {
    formatDetailRiwayatTransaksi = [
      {
        label: 'Tipe Transaksi',
        value: 'Transfer Saldo'
      },
      {
        label: 'Nama Pengirim',
        value: data?.users_from?.name
      },
      {
        label: 'No. Pengirim',
        value: data?.from_phone
      },
      {
        label: 'Nama Penerima',
        value: data?.users_to?.name
      },
      {
        label: 'No. Penerima',
        value: data?.to_phone
      },
      {
        label: 'Jumlah',
        value: 'Rp ' + numberFormat.format(data?.amount)
      },
    ]
  }

  if (url[4] === '3') {
    formatDetailRiwayatTransaksi = [
      {
        label: 'Jenis Transaksi',
        value: 'Terima Pembayaran'
      },
      {
        label: 'No. HP',
        value: data?.phone_number
      },
      {
        label: 'No. Referensi QRIS',
        value: data?.noref_qris
      },
      {
        label: 'Nama Produk',
        value: data?.product_name
      },
      {
        label: 'Jumlah',
        value: 'Rp ' + numberFormat.format(data?.amount)
      },
      {
        label: 'Biaya Transaksi',
        value: 'Rp ' + numberFormat.format(data?.fee)
      },
    ]
  }

  // belum ada riwayat transaksinya
  // if (url[4] === '4') {
  //   formatDetailRiwayatTransaksi = [
  //     {
  //       label: 'Jenis Produk',
  //       value: data?.type === 1 ? 'PLN Prabayar' : 'PLN Pascabayar'
  //     },
  //     {
  //       label: 'Kode Produk',
  //       value: data?.product
  //     },
  //     {
  //       label: 'Nama Produk',
  //       value: data?.name_product
  //     },
  //     {
  //       label: 'No. Tujuan',
  //       value: data?.no_tujuan
  //     },
  //     {
  //       label: 'Jumlah',
  //       value: 'Rp ' + numberFormat.format(data?.amount)
  //     },
  //     {
  //       label: 'Pesan',
  //       value: data?.message
  //     },
  //   ]
  // }

  if (url[4] === '5') {
    formatDetailRiwayatTransaksi = [
      {
        label: 'Jenis Produk',
        value: data?.type === 1 ? 'PLN Prabayar' : 'PLN Pascabayar'
      },
      {
        label: 'Kode Produk',
        value: data?.product
      },
      {
        label: 'Nama Produk',
        value: data?.name_product
      },
      {
        label: 'No. Tujuan',
        value: data?.no_tujuan
      },
      {
        label: 'Jumlah',
        value: 'Rp ' + numberFormat.format(data?.amount)
      },
    ]
  }

  // belum ada riwayat transaksinya
  // if (url[4] === '6') {
  //   formatDetailRiwayatTransaksi = [
  //     {
  //       label: 'Jenis Produk',
  //       value: data?.type === 1 ? 'PLN Prabayar' : 'PLN Pascabayar'
  //     },
  //     {
  //       label: 'Kode Produk',
  //       value: data?.product
  //     },
  //     {
  //       label: 'Nama Produk',
  //       value: data?.name_product
  //     },
  //     {
  //       label: 'No. Tujuan',
  //       value: data?.no_tujuan
  //     },
  //     {
  //       label: 'Jumlah',
  //       value: 'Rp ' + numberFormat.format(data?.amount)
  //     },
  //     {
  //       label: 'Pesan',
  //       value: data?.message
  //     },
  //   ]
  // }

  if (url[4] === '7') {
    formatDetailRiwayatTransaksi = [
      {
        label: 'Kode Produk',
        value: data?.product
      },
      {
        label: 'Nama Produk',
        value: data?.name_product
      },
      {
        label: 'No. Tujuan',
        value: data?.no_tujuan
      },
      {
        label: 'Jumlah',
        value: 'Rp ' + numberFormat.format(data?.amount)
      },
    ]
  }

  if (url[4] === '8') {
    formatDetailRiwayatTransaksi = [
      {
        label: 'Kode Produk',
        value: data?.product_code
      },
      {
        label: 'Nama Produk',
        value: data?.product_name
      },
      {
        label: 'Username',
        value: data?.no_tujuan
      },
      {
        label: 'Jumlah',
        value: 'Rp ' + numberFormat.format(data?.amount)
      },
      {
        label: 'Biaya Transaksi',
        value: 'Rp ' + numberFormat.format(data?.fee)
      },
      {
        label: 'Cashback',
        value: 'Rp ' + numberFormat.format(data?.cashback)
      },
    ]
  }

  console.log(data)
  console.log(url[4])
  if (data) {
    return (
      <form
        className="modal-box max-h-[calc(100%-136px)] max-w-full w-full"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h3 className="font-bold text-lg capitalize">Detail Riwayat Transaksi</h3>
        <label className="label">
          <span className="label-text font-bold">No. Referensi</span>
        </label>
        <input
          type="text"
          className="input input-md input-bordered w-full mb-2"
          defaultValue={data?.no_ref ? data?.no_ref : data?.noref}
          disabled
        />
        <label className="label">
          <span className="label-text font-bold">Tanggal Transaksi</span>
        </label>
        <input
          type="text"
          className="input input-md input-bordered w-full mb-2"
          defaultValue={new Date(data?.created_at).toLocaleDateString()+ ' ' + new Date(data?.created_at).toLocaleTimeString()}
          disabled
        />
        {url[4] !== '2' && (
          <>
            <label className="label">
              <span className="label-text font-bold">Nama Pengguna</span>
            </label>
            <input
              type="text"
              className="input input-md input-bordered w-full mb-2"
              defaultValue={dataUser?.data?.data?.name}
              disabled
            />
          </>
        )}
        {formatDetailRiwayatTransaksi.map((item, index) => (
          <div key={index} className="flex flex-col mb-2">
            <label className="label">
              <span className="label-text font-bold">{item.label}</span>
            </label>
            <input
              type="text"
              className="input input-md input-bordered w-full mb-2"
              defaultValue={item.value}
              disabled
            />
          </div>
        ))}
        <label className="label">
          <span className="label-text font-bold">Status Transaksi</span>
        </label>
        {data?.transaction_status === '2' ? (
          <select
            className="select select-bordered w-full mb-2 font-normal"
            disabled={data?.transaction_status === '2' ? false : true}
            {...register('transaction_status', { required: true })}
          >
            <option hidden>{data?.transaction_status === '1' ? 'Success' : (data.transaction_status === '2' ? 'Pending' : 'Failed')}</option>
            <option value={'1'}>Success</option>
            <option value={'2'}>Pending</option>
            <option value={'3'}>Failed</option>
          </select>
        ) : (
          <>
            <span className={`py-2 px-5 rounded-lg text-white text-lg font-medium ${data?.transaction_status === "1" ? 'bg-success' : 'bg-error'}`}>
              {data?.transaction_status === "1" ? 'Success' : 'Failed'}
            </span>
          </>
        )}
        {url[4] === '5' || url[4] === '7' && (
          <>
            <label className="label">
              <span className="label-text font-bold">Pesan</span>
            </label>
            <input
              type="text"
              className="input input-md input-bordered w-full mb-2"
              defaultValue={data?.message}
              disabled={data?.transaction_status === '2' ? false : true}
              {...register('message', { required: true })}
            />
          </>
        )}
        <div className="flex justify-end gap-4 mt-4">
          <button 
            className="btn text-white bg-base-text hover:bg-base-text/70 active:bg-gray-800"
            onClick={() => {navigate('/transactions'), window.location.reload()}}
          >
            Kembali
          </button>
          {localStorage.getItem('ROLE') === 1 && data?.transaction_status !== '2' && (
            <button 
              className="btn text-white bg-success hover:bg-success/70 active:bg-green-900"
              type='submit'
              disabled={data?.transaction_status === '2' ? false : true}
            >
              Simpan
            </button>
          )}
        </div>
      </form>
    )
  }
}

export default ModalTransaction
