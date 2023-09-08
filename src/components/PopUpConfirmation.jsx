import { useMutation } from "@tanstack/react-query"

import { useStateContext } from "../utils/ContextProvider"
import axiosInstance from "../utils/http-interceptors"
import { toast } from "react-toastify"

/* eslint-disable react/prop-types */
const PopUpConfirmation = ({ data, field }) => {
  const { setDataUser, setDataProduct } = useStateContext()

  const deleteData = useMutation({
    mutationFn: (data) => {
      if (field === 'user') {
        return axiosInstance.delete(`/administrator/users/${data.id}`)
      } else {
        return axiosInstance.delete(`/administrator/product/irs/${data.service_code}/${data.product_code}`)
      }
    },
  })

  const handleDelete = (id) => {
    deleteData.mutate(id, {
      onSuccess: () => {
        window.modal_confirmation.close()
        setDataUser(null)
        setDataProduct(null)
        toast.success('Delete Success')
        window.location.reload()
      },
      onError: (error) => {
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    })
  }

  console.log(data)

  return (
    <dialog id="modal_confirmation" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Konfirmasi!</h3>
        <p className="py-4">Apakah anda yakin untuk menghapus {field === 'user' ? 'akun' : 'produk'} <b>{field === 'user' ? data.name : data.product_name}</b>?</p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => {window.modal_confirmation.close(), setDataUser(null), setDataProduct(null)}}
          >
            Batal
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleDelete(data)}
          >
            Hapus
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default PopUpConfirmation
