import { useState } from "react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { useQuery } from "@tanstack/react-query"

import PopUpProfile from "./PopUpProfile"
import axiosInstance from "../utils/http-interceptors"

// eslint-disable-next-line react/prop-types
const Navbar = ({ title }) => {
  const [isClicked, setIsClicked] = useState(false)

  const dataProfile = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      return axiosInstance.get(`/administrator/users/${localStorage.getItem("USER_ID")}`)
    },
  })

  return (
    <>
      <div className="flex justify-between h-20">
        <div className="text-dark text-4xl pt-7">
          {title}
        </div>
        <button 
          className="flex gap-2 pt-6 pr-10"
          onClick={() => setIsClicked(!isClicked)}
        >
          <img
            src={dataProfile.data?.data?.profile === '' ? '/src/assets/img/profile-photo.jpeg' : `http://182.253.225.226:8000${dataProfile.data?.data?.profile}`}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <div className="text-dark">
              {dataProfile.data?.data?.name}
            </div>
            <div className="text-base-text font-light leading-4">
              {dataProfile.data?.data?.role === 1 ? 'Super Admin' : 'Admin'}
            </div>
          </div>
          <div className="mt-3">
            <MdOutlineKeyboardArrowDown className='text-2xl' />
          </div>
        </button>
      </div>

      {isClicked && (<PopUpProfile />)}
    </>
  )
}

export default Navbar
