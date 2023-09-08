/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import axiosInstance from "../utils/http-interceptors"

const ModalEditFee = ({ data }) => {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()

  const updateFee = useMutation({
    mutationFn: (dataFee) => {
      return axiosInstance.patch(`/administrator/fee/${data.feeCode}`, dataFee)
    },
  })

  const onSubmitHandler = (newData) => {
    console.log(newData)

    const dataPayload = {
      feeName: newData.feeName,
      amount: parseInt(newData.amount)
    }

    console.log(dataPayload)
    
    updateFee.mutate(dataPayload, {
      onSuccess: () => {
        toast.success('Berhasil mengubah fee')
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message)
      }
    })
  }
  
  return (
    <form
      className="modal-box max-h-[calc(100%-136px)] max-w-full w-full"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h3 className="font-bold text-lg capitalize mb-5">Ubah Fee</h3>
      <label className="label">
        <span className="label-text font-bold">Kode Fee</span>
      </label>
      <input
        type="text"
        defaultValue={data.feeCode}
        className="input input-md input-bordered w-full mb-2"
        name='feeCode'
        disabled
      />
      <label className="label">
        <span className="label-text font-bold">Nama Fee</span>
      </label>
      <input
        type="text"
        defaultValue={data.feeName}
        className="input input-md input-bordered w-full mb-2"
        name='feeName'
        {...register('feeName')}
      />
      <label className="label">
        <span className="label-text font-bold">Jumlah Fee</span>
      </label>
      <input
        type="number"
        defaultValue={data.amount}
        className="input input-md input-bordered w-full mb-2"
        name='amount'
        {...register('amount', { required: true })}
      />
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="btn text-white bg-base-text hover:bg-base-text/70 active:bg-gray-800"
          onClick={() => (navigate('/fees'), window.location.reload())}
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

export default ModalEditFee
