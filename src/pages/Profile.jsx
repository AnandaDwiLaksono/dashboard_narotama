import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"

import { Footer, Header, Sidebar } from "../components"
import axiosInstance from "../utils/http-interceptors"

const Profile = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const [photoProfile, setPhotoProfile] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const { register, handleSubmit } = useForm()
  
  const dataProfile = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      return axiosInstance.get(`/administrator/users/${localStorage.getItem("USER_ID")}`)
    },
  })

  const updateProfile = useMutation({
    mutationFn: (data) => {
      return axiosInstance.patch(`/administrator/users/${dataProfile?.data?.data?.id}`, data)
    },
  })

  const uploadPhotoProfile = useMutation({
    mutationFn: (data) => {
      const formData = new FormData()
      formData.append('image', data)

      return axios.patch(`http://182.253.225.226:8000/administrator/users/${dataProfile?.data?.data?.id}/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
      })
    },
  })

  const handleFileChange = (event) => {
    setPhotoProfile(event.target.files[0])

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
    
    if(photoProfile !== null) {
      console.log(photoProfile)
      uploadPhotoProfile.mutate(photoProfile, {
        onSuccess: () => {
          toast.success('Foto profil berhasil diubah')
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message)
        }
      })
    }

    const dataPayload = {
      ...newData,
      name: newData.name
    }

    console.log(dataPayload)

    updateProfile.mutate(dataPayload, {
      onSuccess: () => {
        toast.success('Data berhasil diubah')
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message)
      }
    })
  }

  console.log(dataProfile.data?.data)

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className="flex flex-col justify-between w-5/6 pl-2 pr-12">
        <div className="flex flex-col gap-1 mt-20">
          <Header title="Profil" />
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex gap-5 my-4">
              <img
                src={selectedImage || (dataProfile?.data?.data?.profile === '' ? '/src/assets/img/profile-photo.jpeg' : `http://182.253.225.226:8000${dataProfile?.data?.data?.profile}`)}
                alt="Icon"
                className="object-contain h-20 w-20 shadow-md ring ring-primary ring-offset-base-100 ring-offset-2 ml-2"
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
            <input
              type="text"
              defaultValue={dataProfile?.data?.data?.name}
              className="border border-base-text bg-white text-dark text-xl px-5 py-3 rounded-2xl w-full mb-2"
              name='name'
              {...register('name')}
            />
            <input
              type="text"
              defaultValue={dataProfile?.data?.data?.role === 1 ? 'Super Admin' : 'Admin'}
              className="border border-base-text bg-white text-dark text-xl px-5 py-3 rounded-2xl w-full mb-2"
              disabled
            />
            <input
              type="text"
              defaultValue={dataProfile?.data?.data?.email}
              className="border border-base-text bg-white text-dark text-xl px-5 py-3 rounded-2xl w-full mb-2"
              disabled
            />
            <input
              type="text"
              defaultValue={dataProfile?.data?.data?.phone_number}
              className="border border-base-text bg-white text-dark text-xl px-5 py-3 rounded-2xl w-full mb-2"
              disabled
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="btn text-white bg-base-text hover:bg-base-text/70 active:bg-gray-800"
                onClick={() => {
                  navigate('/dashboard')
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
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Profile
