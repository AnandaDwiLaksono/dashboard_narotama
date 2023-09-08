import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/http-interceptors'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

/* eslint-disable react/prop-types */
const ModalCreateUser = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const createUser = useMutation({
    mutationFn: (dataUser) => {
      return axiosInstance.post('/administrator/users/create', dataUser)
    },
  })

  const onSubmitHandler = (data) => {
    console.log(data)

    const dataPayload = {
      username: data.username,
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
      role: parseInt(data.role),
      password: data.password,
    }

    console.log(dataPayload)
    createUser.mutate(dataPayload, {
      onSuccess: () => {
        toast.success('Create Success')
        navigate('/users')
        window.location.reload()
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
      <h3 className="font-bold text-lg capitalize">Tambah Pengguna</h3>
      <label className="label">
        <span className="label-text font-bold">Username</span>
      </label>
      <input
        type="text"
        placeholder='Masukkan username'
        className="input input-md input-bordered w-full mb-2"
        name='username'
        {...register('username', { required: true })}
      />
      {errors.username && <p className='text-red-500'>Username is required</p>}
      <label className="label">
        <span className="label-text font-bold">Nama</span>
      </label>
      <input
        type="text"
        placeholder='Masukkan nama'
        className="input input-md input-bordered w-full mb-2"
        name='name'
        {...register('name', { required: true })}
      />
      {errors.name && <p className='text-red-500'>Name is required</p>}
      <label className="label">
        <span className="label-text font-bold">Email</span>
      </label>
      <input
        type="text"
        placeholder='Masukkan email'
        className="input input-md input-bordered w-full mb-2"
        name='email'
        {...register('email', { required: true })}
      />
      {errors.email && <p className='text-red-500'>Email is required</p>}
      <label className="label">
        <span className="label-text font-bold">No.HP</span>
      </label>
      <input
        type="text"
        placeholder='Masukkan no.hp'
        className="input input-md input-bordered w-full mb-2"
        name='phone_number'
        {...register('phone_number', { required: true })}
      />
      {errors.phone_number && <p className='text-red-500'>Phone Number is required</p>}
      <label className="label">
        <span className="label-text font-bold">Role</span>
      </label>
      <select
        className="select select-bordered w-full mb-2 font-normal"
        name='role'
        {...register('role', { required: true })}
      >
        <option>Pilih role</option>
        <option value={1}>Super Admin</option>
        <option value={2}>Admin</option>
      </select>
      {errors.role && <p className='text-red-500'>Role is required</p>}
      <label className="label">
        <span className="label-text font-bold">Password</span>
      </label>
      <input
        type="text"
        placeholder='Masukkan password'
        className="input input-md input-bordered w-full mb-2"
        name='password'
        {...register('password', { 
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          },
          Pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "Password must have at least 1 special, 1 uppercase, 1 lowercase, and 1 number"
          }
        })}
      />
      {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      <div className="flex justify-end gap-4 mt-4">
        <button 
          className="btn text-white bg-base-text hover:bg-base-text/70 active:bg-gray-800"
          onClick={() => {navigate('/users'), window.location.reload()}}
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

export default ModalCreateUser
