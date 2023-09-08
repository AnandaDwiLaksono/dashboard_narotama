import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'

import axiosInstance from '../utils/http-interceptors'

/* eslint-disable react/prop-types */
const ModalEditFitur = ({ data }) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const [logo, setLogo] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const { register, handleSubmit } = useForm()

  const updateFitur = useMutation({
    mutationFn: (dataFitur) => {
      return axiosInstance.patch(`/administrator/menu/${data.id}`, dataFitur)
    },
  })

  const uploadIcon = useMutation({
    mutationFn: (dataIcon) => {
      const formData = new FormData()
      formData.append('image', dataIcon)

      return axios.post(`http://182.253.225.226:8000/administrator/menu/${data.id}/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
      })
    },
  })

  const handleFileChange = (event) => {
    setLogo(event.target.files[0])

    const selectedFile = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      setSelectedImage(e.target.result)
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }
  }

  
  const onSubmitHandler = (newData) => {
    console.log(newData)
    
    if(logo !== null) {
      console.log(logo)
      uploadIcon.mutate(logo, {
        onSuccess: () => {
          toast.success('Icon berhasil diubah')
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message)
        }
      })
    }

    const dataPayload = {
      ...newData,
      status: newData.status === 'true' ? true : false
    }

    console.log(dataPayload)

    updateFitur.mutate(dataPayload, {
      onSuccess: () => {
        toast.success('Data berhasil diubah')
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message)
      }
    })
  }

  console.log(data)
  
  return (
    <form
      className="modal-box max-h-[calc(100%-136px)] max-w-full w-full"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <h3 className="font-bold text-lg capitalize">Ubah Fitur</h3>
      <label className="label">
        <span className="label-text font-bold">Icon</span>
      </label>
      <div className="flex gap-5 my-4">
        <img
          src={selectedImage || (data.icon === '' ? '/src/assets/img/profile-photo.jpeg' : `http://182.253.225.226:8000${data.icon}`)}
          alt="Icon"
          className="object-contain h-20 w-20 shadow-md ring ring-primary ring-offset-base-100 ring-offset-2"
        />
        <div className='flex flex-col justify-center'>
          <input
            type="file"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            name='image'
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <label className="label">
        <span className="label-text font-bold">Nama Fitur</span>
      </label>
      <input
        type="text"
        defaultValue={data.nama}
        className="input input-md input-bordered w-full mb-2"
        name='nama'
        {...register('nama')}
      />
      <label className="label">
        <span className="label-text font-bold">Endpoint</span>
      </label>
      <input
        type="text"
        defaultValue={data.endpoint}
        className="input input-md input-bordered w-full mb-2"
        name='endpoint'
        {...register('endpoint')}
      />
      <label className="label">
        <span className="label-text font-bold">Status</span>
      </label>
      <select
        className="select select-bordered w-full mb-2 font-normal"
        name='status'
        {...register('status', { required: true })}
      >
        <option value={data.status} hidden>{data.status === true ? 'Active' : 'Inactive'}</option>
        <option value={true}>Active</option>
        <option value={false}>Inactive</option>
      </select>
      <label className="label">
        <span className="label-text font-bold">Deskripsi</span>
      </label>
      <input
        type="text"
        defaultValue={data.deskripsi}
        className="input input-md input-bordered w-full mb-2"
        name='deskripsi'
        {...register('deskripsi')}
      />
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="btn text-white bg-base-text hover:bg-base-text/70 active:bg-gray-800"
          onClick={() => {
            (navigate('/features'), window.location.reload())
            queryClient.invalidateQueries()
            window.location.reload()
          }}
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

export default ModalEditFitur
