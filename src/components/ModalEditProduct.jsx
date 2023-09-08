/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import axiosInstance from "../utils/http-interceptors"
import { useEffect } from "react"

const ModalEditProduct = ({ data }) => {
  const navigate = useNavigate()

  const url = new URL(window.location.href).pathname.split('/')

  const { register, handleSubmit } = useForm()

  const editProduct = useMutation({
    mutationFn: (dataProduct) => {
      return axiosInstance.patch(`/administrator/product/irs/${url[4]}/${url[5]}`, dataProduct)
    },
  })

  console.log(data.status)
  console.log(data.product_type)

  const onSubmitHandler = (newData) => {
    console.log(newData)

    const dataPayload = {
      ...newData,
      product_code: newData.product_code,
      product_name: newData.product_name,
      harga_dasar: parseInt(newData.harga_dasar),
      harga_jual: parseInt(newData.harga_jual),
      cashback: parseInt(newData.cashback),
      product_description: newData.product_description === '' ? '-' : newData.product_description,
      product_type: parseInt(newData.product_type),
      status: newData.status === 'true' ? true : false,
    }

    console.log(dataPayload)
    
    editProduct.mutate(dataPayload, {
      onSuccess: () => {
        toast.success('Update Success')
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message)
      }
    })
  }

  const idIrsPulsaData = [7, 8, 9, 10, 11]

  useEffect(() => {
    console.log(data)
  }, [data])
  
  return (
    <form
      className="modal-box max-h-[calc(100%-136px)] max-w-full w-full"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h3 className="font-bold text-lg capitalize">Ubah Produk</h3>
      <label className="label">
        <span className="label-text font-bold">Kode Produk</span>
      </label>
      <input
        type="text"
        defaultValue={data.product_code}
        className="input input-md input-bordered w-full mb-2"
        name='product_code'
        {...register('product_code')}
      />
      <label className="label">
        <span className="label-text font-bold">Nama Produk</span>
      </label>
      <input
        type="text"
        defaultValue={data.product_name}
        className="input input-md input-bordered w-full mb-2"
        name='product_name'
        {...register('product_name')}
      />
      {idIrsPulsaData.includes(parseInt(url[3])) && (
        <>
          <label className="label">
            <span className="label-text font-bold">Tipe Produk</span>
          </label>
          <select
            className="select select-bordered w-full mb-2 font-normal"
            name='product_type'
            {...register('product_type')}
            defaultValue={data.product_type === 1 ? '1' : '2'}
          >
            <option value='1'>Pulsa</option>
            <option value='2'>Paket Data</option>
          </select>
        </>
      )}
      <label className="label">
        <span className="label-text font-bold">Harga Dasar</span>
      </label>
      <input
        type="number"
        defaultValue={data.harga_dasar}
        className="input input-md input-bordered w-full mb-2"
        name='harga_dasar'
        {...register('harga_dasar')}
      />
      <label className="label">
        <span className="label-text font-bold">Harga Jual</span>
      </label>
      <input
        type="number"
        defaultValue={data.harga_jual}
        className="input input-md input-bordered w-full mb-2"
        name='harga_jual'
        {...register('harga_jual')}
      />
      <label className="label">
        <span className="label-text font-bold">Cashback</span>
      </label>
      <input
        type="number"
        defaultValue={data.cashback}
        className="input input-md input-bordered w-full mb-2"
        name='cashback'
        {...register('cashback')}
      />
      <label className="label">
        <span className="label-text font-bold">Status</span>
      </label>
      <select
        className="select select-bordered w-full mb-2 font-normal"
        name='status'
        {...register('status')}
        defaultValue={data.status === true ? 'true' : 'false'}
      >
        <option value='true'>Active</option>
        <option value='false'>Inactive</option>
      </select>
      <label className="label">
        <span className="label-text font-bold">Deskripsi Produk</span>
      </label>
      <input
        type="text"
        defaultValue={data.product_description}
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

export default ModalEditProduct
