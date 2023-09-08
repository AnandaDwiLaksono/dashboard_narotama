import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaRegUser } from "react-icons/fa"
import { AiOutlineEye } from "react-icons/ai"
import { PiEyeClosed } from "react-icons/pi"
import { MdLockOutline } from "react-icons/md"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  const onClickPasswordEye = (e) => {
      e.preventDefault()
      setIsPasswordHidden((prev) => {
        return !prev
      })
  }

  const login = useMutation({
    mutationFn: (data) => {
      return axios.post('http://182.253.225.226:8000/administrator/login', data)
    },
  })

  const onSubmitHandler = (data) => {
    setIsDisabled(true)

    login.mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem('REFRESH_TOKEN', res.data?.refresh_token)
        localStorage.setItem('ACCESS_TOKEN', res.data?.access_token)
        localStorage.setItem('USER_ID', res.data?.id)
        localStorage.setItem('ROLE', res.data?.role)
        toast.success('Login Success')
        navigate('/dashboard')
        setIsDisabled(false)
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message)
        setIsDisabled(false)
      }
    })
  }

  return (
    <div className="flex sm:flex-row flex-col w-full h-screen">
      <div className="bg-gradient-to-l from-[#2F418A] to-[#0C2071] xl:w-5/12 sm:w-2/5 w-full sm:h-screen h-1/4">
        <img 
          src='src/assets/img/bg_login.png'
          alt="Background Login"
          className="absolute xl:w-5/12 sm:w-2/5 w-full sm:h-screen h-1/4"
        />
        <div className="flex flex-col justify-between sm:h-screen h-1/4 relative sm:ml-14 ml-4 sm:mr-16 mr-4">
          <img
            src='src/assets/img/logo_GoUTama.png'
            alt="Logo GoUtama"
            className="2xl:w-80 xl:w-60 sm:w-40 w-1/2 2xl:h-12 xl:h-10 h-7 2xl:mt-20 sm:mt-16 mt-4 sm:mb-0 mb-8"
          />
          <div className="flex flex-col gap-4 xl:mb-32 lg:mb-36 md:mb-24 sm:mb-28">
            <div className='text-white 2xl:text-6xl xl:text-4xl sm:text-2xl text-3xl xl:mb-2'>
              Welcome Back!
            </div>
            <div className='text-white 2xl:text-4xl xl:text-2xl lg:text-base sm:text-sm text-lg'>
              Nikmati pengalaman pembayaran yang aman dan nyaman di ujung jari Anda.
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-7/12 sm:w-3/5 sm:h-screen h-3/4">
        <div className="flex flex-col justify-between sm:h-screen h-full 2xl:ml-48 xl:ml-40 lg:ml-28 md:ml-16 ml-14 2xl:mr-56 xl:mr-48 lg:mr-32 md:mr-20 mr-14">
          <div className="h-[30%] 2xl:h-[26%] flex flex-col justify-end">
            <div className='text-dark text-4xl'>
              Hello!
            </div>
          </div>
          <div className="h-[8%]">
            <div className='text-base-text xl:text-2xl md:text-lg mt-3'>
              Login ke dasbor admin sekarang
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="h-[51%]">
            {errors.username && errors.username.type === 'required' && (
              <span className='text-red-500 text-sm w-full mx-auto'>Username is required</span>
            )}
            <div className='rounded-xl bg-light 2xl:h-20 h-12 flex w-full mb-3'>
              <div className='2xl:w-14 2xl:h-14 rounded-lg bg-white 2xl:m-3 w-8 h-8 m-2'>
                <FaRegUser className="2xl:w-6 2xl:h-6 2xl:m-4 w-4 h-4 m-2 text-[#20327F]" />
              </div>
              <input
                type="text"
                placeholder="Your username"
                className="my-auto mx-3 bg-light outline-none 2xl:w-[calc(100%-104px)] w-[calc(100%-72px)]"
                name="username"
                {...register('username', { required: true })}
                />
            </div>
            {errors.password && errors.password.type === 'required' && (
              <span className='text-red-500 text-sm w-full mx-auto'>Password is required</span>
            )}
            <div className='rounded-xl bg-light 2xl:h-20 h-12 flex w-full justify-between mb-3'>
              <div className='2xl:w-14 2xl:h-14 rounded-lg bg-white 2xl:m-3 w-8 h-8 m-2'>
                <MdLockOutline className="2xl:w-7 2xl:h-7 2xl:m-3.5 w-5 h-5 m-1.5 text-[#2F418A]" />
              </div>
              <input
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Your password"
                className="my-auto mx-3 bg-light outline-none 2xl:w-[calc(100%-184px)] w-[calc(100%-112px)]"
                name="password"
                {...register('password', { required: true })}
              />
              <button 
                className="hover:drop-shadow-xl"
                onClick={(e) => {onClickPasswordEye(e)}}
              >
                <div className="2xl:w-8 2xl:h-8 2xl:m-6 w-6 h-6 m-3.5 2xl:text-3xl text-xl text-base-text">
                  {isPasswordHidden ? <PiEyeClosed /> : <AiOutlineEye />}
                </div>
              </button>
            </div>
            <button
              className='bg-primary w-full 2xl:h-20 h-12 rounded-xl text-white 2xl:text-3xl text-xl hover:drop-shadow-xl disabled:bg-base-text'
              disabled={isDisabled}
              type="submit"
              >
              {isDisabled ? 'Loading...' : 'Login'}
            </button>
          </form>
          <div className='flex w-full justify-center md:gap-7 gap-4 text-base-text xl:text-base text-xs h-[7%]'>
            <p>Copyright@ ICN2023</p>
            <p>About us</p>
            <p>Blog</p>
            <p>Call us</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
