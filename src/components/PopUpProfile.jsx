import { useMutation } from "@tanstack/react-query"
import { FaRegUser } from "react-icons/fa"
import { IoLogOutOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import axiosInstance from "../utils/http-interceptors"

function PopUpProfile() {
  const handleLogout = useMutation({
    mutationFn: () => {
      return axiosInstance.post('/logout')
    },
    onSuccess: (res) => {
      console.log(res)

      localStorage.removeItem('REFRESH_TOKEN'),
      localStorage.removeItem('ACCESS_TOKEN'),
      localStorage.removeItem('USER_ID'),
      localStorage.removeItem('ROLE')
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return (
    <div className="absolute rounded-3xl border border-solid border-base-text text-base-text bg-white p-2 flex flex-col right-20 top-20 gap-2 py-4 pl-4 pr-6">
      <Link to="/profile">
        <div className="flex gap-4">
          <div className="text-xl mt-1">
            <FaRegUser />
          </div>
          <div className="text-xl ml-2">
            Profile
          </div>
        </div>
      </Link>
      <hr className="text-light-text" />
      <Link to="/login">
        <div className="flex gap-4">
          <div className="text-3xl">
            <IoLogOutOutline />
          </div>
          <div
            className="text-xl"
            onClick={() => {handleLogout.mutate()}}
          >
            Log Out
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PopUpProfile
