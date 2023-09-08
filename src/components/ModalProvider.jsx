import { useNavigate } from 'react-router-dom'

import { PopUpConfirmation, Table } from '.'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../utils/http-interceptors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md'
import { BiEditAlt } from 'react-icons/bi'
import { useEffect } from 'react'
import { useStateContext } from '../utils/ContextProvider'

/* eslint-disable react/prop-types */
const ModalProvider = ({ dataProvider, dataProducts }) => {
  const navigate = useNavigate()

  const [logo, setLogo] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [disableButton, setDisableButton] = useState(true)

  const { dataProduct, setDataProduct } = useStateContext()

  const numberFormat = new Intl.NumberFormat("id-ID")

  const { register, handleSubmit } = useForm()

  const updateProvider = useMutation({
    mutationFn: (data) => {
      return axiosInstance.patch(`/administrator/layanan/${dataProvider.id}`, data)
    },
  })

  const uploadIcon = useMutation({
    mutationFn: (dataIcon) => {
      const formData = new FormData()
      formData.append('image', dataIcon)

      return axios.post(`http://182.253.225.226:8000/administrator/layanan/${dataProvider.id}/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
      })
    },
  })

  const handleFileChange = (event) => {
    setDisableButton(false)
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

    if (newData.service_name !== dataProvider.service_name) {
      updateProvider.mutate(newData, {
        onSuccess: () => {
          toast.success('Data berhasil diubah')
          window.location.reload()
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message)
        }
      })
    }
  }

  const Column_Products = [
    {
      Header: 'Kode Produk',
      accessor: 'product_code',
    },
    {
      Header: 'Nama Produk',
      accessor: 'product_name'
    },
    {
      Header: 'Harga Dasar',
      accessor: 'harga_dasar',
      Cell: row => (
        <span>
          Rp {numberFormat.format(row.value)}
        </span>
      ),
    },
    {
      Header: 'Harga Jual',
      accessor: 'harga_jual',
      Cell: row => (
        <span>
          Rp {numberFormat.format(row.value)}
        </span>
      ),
    },
    {
      Header: 'Cashback',
      accessor: 'cashback',
      Cell: row => (
        <span>
          Rp {numberFormat.format(row.value)}
        </span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: row => (
        <span className={`px-4 py-2 rounded-lg text-current ${row.value ? 'bg-success' : 'bg-error'}`}>
          {row.value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      Header: 'Deskripsi Produk',
      accessor: 'product_description',
    },
    {
      Header: 'Action',
      accessor: 'id',
      Cell: row => (
        <div className="flex justify-center space-x-2">
          <button
            className="bg-primary text-white text-xl rounded-lg px-2 py-2 hover:bg-opacity-80"
            onClick={() => {navigate(`/products/edit/${dataProvider.id}/${row.row.original.service_code}/${row.row.original.product_code}`), window.location.reload()}}
          >
            <BiEditAlt />
          </button>
          <button
            className="bg-error text-white text-xl rounded-lg px-2 py-2 hover:bg-opacity-80"
            onClick={() => setDataProduct(row.row.original)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ]
  
  const valueToAdd = {
    Header: 'Tipe Produk',
    accessor: 'product_type',
    Cell: row => (
      <span>
        {row.value === 1 ? 'Pulsa' : 'Paket Data'}
      </span>
    ),
  }
  
  const Column_Products_With_Type = [
    ...Column_Products.slice(0, 2),
    valueToAdd,
    ...Column_Products.slice(2),
  ]
  
  const idIrsPulsaData = [7, 8, 9, 10, 11]
  
  useEffect(() => {
    if (dataProduct) {
      window.modal_confirmation.showModal()
    }
  }, [dataProduct])
  
  console.log(dataProvider)
  console.log(dataProducts)
  
  return (
    <>
      <form
        className="modal-box max-h-[calc(100%-136px)] max-w-full w-full"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h3 className="font-bold text-lg capitalize">Detail Provider {dataProvider.service_name}</h3>
        <label className="label">
          <span className="label-text font-bold">Icon</span>
        </label>
        <div className="flex gap-5 my-4">
          <img
            src={selectedImage || (dataProvider.icon === '' ? '/src/assets/img/profile-photo.jpeg' : `http://182.253.225.226:8000${dataProvider.icon}`)}
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
          <span className="label-text font-bold">Fitur</span>
        </label>
        <input
          type="text"
          defaultValue={dataProvider.feature}
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <label className="label">
          <span className="label-text font-bold">Kode Provider</span>
        </label>
        <input
          type="text"
          defaultValue={dataProvider.service_code}
          className="input input-md input-bordered w-full mb-2"
          disabled
        />
        <label className="label">
          <span className="label-text font-bold">Nama Provider</span>
        </label>
        <input
          type="text"
          defaultValue={dataProvider.service_name}
          className="input input-md input-bordered w-full mb-2"
          onChangeCapture={() => setDisableButton(false)}
          {...register('service_name', { required: true })}
        />
        <div className='flex justify-between'>
          <label className="label">
            <span className="label-text font-bold">List Produk</span>
          </label>
          <button
            className="btn btn-sm btn-primary shadow-md"
            onClick={() => navigate(`/products/create/${dataProvider.id}/${dataProvider.service_code}`)}
          >
            Tambah Produk
          </button>
        </div>
        <Table kolom={idIrsPulsaData.includes(dataProvider.id) ? Column_Products_With_Type : Column_Products} dataTabel={dataProducts} />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="btn text-white bg-base-text hover:bg-base-text/70 active:bg-gray-800"
            onClick={() => (navigate('/products'), window.location.reload())}
          >
            Kembali
          </button>
          <button
            className="btn text-white bg-success hover:bg-success/70 active:bg-green-900"
            type='submit'
            disabled={disableButton}
          >
            Simpan
          </button>
        </div>
      </form>
      {dataProduct && <PopUpConfirmation data={dataProduct} field='product' />}
    </>
  )
}

export default ModalProvider
