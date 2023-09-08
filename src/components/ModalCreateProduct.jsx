import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/http-interceptors'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

/* eslint-disable react/prop-types */
const ModalCreateProduct = () => {
  const navigate = useNavigate()

  const url = new URL(window.location.href).pathname.split('/')

  const { register, handleSubmit, formState: { errors } } = useForm()

  const createProduct = useMutation({
    mutationFn: (dataProduct) => {
      return axiosInstance.post(`/administrator/product/irs/${url[4]}`, dataProduct)
    },
  })

  const onSubmitHandler = (data) => {
    console.log(data)

    const dataPayload = {
      product_code: data.product_code,
      product_name: data.product_name,
      harga_dasar: parseInt(data.harga_dasar),
      harga_jual: parseInt(data.harga_jual),
      cashback: data.cashback === '' ? 0 : parseInt(data.cashback),
      product_description: data.product_description,
      service_code: url[4],
      product_type: parseInt(data.product_type),
    }

    console.log(dataPayload)
    
    createProduct.mutate(dataPayload, {
      onSuccess: () => {
        toast.success('Create Success')
        navigate(`/products/list/${url[3]}/${url[4]}`)
        window.location.reload()
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message)
      }
    })
  }

  const idIrsPulsaData = [7, 8, 9, 10, 11]
  
  return (
    <form
      className="modal-box max-h-[calc(100%-136px)] max-w-full w-full"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h3 className="font-bold text-lg capitalize">Tambah Produk</h3>
      <label className="label">
        <span className="label-text font-bold">Kode Produk</span>
      </label>
      <input
        type="text"
        placeholder='Masukkan kode produk'
        className="input input-md input-bordered w-full mb-2"
        name='product_code'
        {...register('product_code', { required: true })}
      />
      {errors.product_code && <p className='text-red-500'>Product Code is required</p>}
      <label className="label">
        <span className="label-text font-bold">Nama Produk</span>
      </label>
      <input
        type="text"
        placeholder='Masukkan nama produk'
        className="input input-md input-bordered w-full mb-2"
        name='product_name'
        {...register('product_name', { required: true })}
      />
      {errors.product_name && <p className='text-red-500'>Product Name is required</p>}
      {idIrsPulsaData.includes(parseInt(url[3])) && (
        <>
          <label className="label">
            <span className="label-text font-bold">Tipe Produk</span>
          </label>
          <select
            className="select select-bordered w-full mb-2 font-normal"
            name='product_type'
            {...register('product_type', { required: true })}
          >
            <option>Pilih tipe produk</option>
            <option value={1}>Pulsa</option>
            <option value={2}>Paket Data</option>
          </select>
        </>
      )}
      <label className="label">
        <span className="label-text font-bold">Harga Dasar</span>
      </label>
      <input
        type="number"
        placeholder='Masukkan harga dasar'
        className="input input-md input-bordered w-full mb-2"
        name='harga_dasar'
        {...register('harga_dasar', { required: true })}
      />
      {errors.harga_dasar && <p className='text-red-500'>Harga Dasar is required</p>}
      <label className="label">
        <span className="label-text font-bold">Harga Jual</span>
      </label>
      <input
        type="number"
        placeholder='Masukkan harga jual'
        className="input input-md input-bordered w-full mb-2"
        name='harga_jual'
        {...register('harga_jual', { required: true })}
      />
      {errors.harga_jual && <p className='text-red-500'>Harga Jual is required</p>}
      <label className="label">
        <span className="label-text font-bold">Cashback</span>
      </label>
      <input
        type="number"
        placeholder='Masukkan cashback'
        className="input input-md input-bordered w-full mb-2"
        name='cashback'
        {...register('cashback')}
      />
      <label className="label">
        <span className="label-text font-bold">Deskripsi Produk</span>
      </label>
      <input
        type="text"
        placeholder='Masukkan deskripsi produk'
        className="input input-md input-bordered w-full mb-2"
        name='product_description'
        {...register('product_description')}
      />
      <div className="flex justify-end gap-4 mt-4">
        <button 
          className="btn text-white bg-base-text hover:bg-base-text/70 active:bg-gray-800"
          onClick={() => {navigate(`/products/list/${url[3]}/${url[4]}`), window.location.reload()}}
        >
          Kembali
        </button>
        <button 
          className="btn text-white bg-success hover:bg-success/70 active:bg-green-900"
          type='submit'
        >
          Simpan
        </button>
      </div>
    </form>
  )
}

export default ModalCreateProduct
