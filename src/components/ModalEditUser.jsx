import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/http-interceptors'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

/* eslint-disable react/prop-types */
const ModalEditUser = ({ data }) => {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()

  const updateUser = useMutation({
    mutationFn: (dataUser) => {
      return axiosInstance.patch(`/administrator/users/${data.id}`, dataUser)
    },
  })

  const onSubmitHandler = (newData) => {

    const dataPayload = {
      username: newData.username === data.username ? '' : newData.username,
      name: newData.name,
      email: newData.email === data.email ? '' : newData.email,
      phone_number: newData.phone_number === data.phone_number ? '' : newData.phone_number,
      acc_balance: parseInt(newData.acc_balance),
      role: parseInt(newData.role),
      verified: newData.verified === 'true' ? true : false,
      acc_status: newData.acc_status === 'true' ? true : false,
    }
    
    updateUser.mutate(dataPayload, {
      onSuccess: () => {
        toast.success('Update Success')
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
      <h3 className="font-bold text-lg capitalize">Ubah Pengguna</h3>
      <div className="profil flex justify-center mb-4">
        <div className="avatar">
          <div className="w-24 rounded-full shadow-md ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={data.profile === '' ? '/src/assets/img/profile-photo.jpeg' : `http://182.253.225.226:8000${data.profile}`} />
          </div>
        </div>
      </div>
      <label className="label">
        <span className="label-text font-bold">Username</span>
      </label>
      <input
        type="text"
        defaultValue={data.username}
        className="input input-md input-bordered w-full mb-2"
        name='username'
        {...register('username')}
      />
      <label className="label">
        <span className="label-text font-bold">Nama</span>
      </label>
      <input
        type="text"
        defaultValue={data.name}
        className="input input-md input-bordered w-full mb-2"
        name='name'
        {...register('name')}
      />
      <label className="label">
        <span className="label-text font-bold">Email</span>
      </label>
      <input
        type="text"
        defaultValue={data.email}
        className="input input-md input-bordered w-full mb-2"
        name='email'
        {...register('email')}
      />
      <label className="label">
        <span className="label-text font-bold">No.HP</span>
      </label>
      <input
        type="text"
        defaultValue={data.phone_number}
        className="input input-md input-bordered w-full mb-2"
        name='phone_number'
        {...register('phone_number')}
      />
      <label className="label">
        <span className="label-text font-bold">Saldo</span>
      </label>
      <input
        type="number"
        defaultValue={data.acc_balance}
        className="input input-md input-bordered w-full mb-2"
        name='acc_balance'
        {...register('acc_balance')}
      />
      <label className="label">
        <span className="label-text font-bold">Role</span>
      </label>
      <select
        className="select select-bordered w-full mb-2 font-normal"
        name='role'
        {...register('role')}
        defaultValue={data.role === 1 ? '1' : data.role === 2 ? '2' : '3'}
      >
        <option value='1'>Super Admin</option>
        <option value='2'>Admin</option>
        <option value='3'>User</option>
      </select>
      <label className="label">
        <span className="label-text font-bold">Verifikasi</span>
      </label>
      <select
        className="select select-bordered w-full mb-2 font-normal"
        name='verified'
        {...register('verified')}
        defaultValue={data.verified === true ? 'true' : 'false'}
      >
        <option value='true'>Verified</option>
        <option value='false'>Unverified</option>
      </select>
      <label className="label">
        <span className="label-text font-bold">Status</span>
      </label>
      <select
        className="select select-bordered w-full mb-2 font-normal"
        name='acc_status'
        {...register('acc_status')}
        defaultValue={data.acc_status === true ? 'true' : 'false'}
      >
        <option value='true'>Active</option>
        <option value='false'>Inactive</option>
      </select>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="btn text-white bg-base-text hover:bg-base-text/70 active:bg-gray-800"
          onClick={() => (navigate('/users'), window.location.reload())}
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

export default ModalEditUser
