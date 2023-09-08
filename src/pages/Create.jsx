import { Footer, Navbar, Sidebar, ModalCreateUser, ModalCreateProduct } from "../components"

// eslint-disable-next-line react/prop-types
const Create = ({ field }) => {
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        {field === 'users' ? (
          <ModalCreateUser />
        ) : (
          <ModalCreateProduct />
        )}
        <Footer className="absolute right-12 bottom-0" />
      </div>
    </div>
  )
}

export default Create
