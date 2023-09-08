import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { LandingPage, Login, Dashboard, Users, Transaction, Fitur, DataBank, Provider, Profile, Settings, Edit, Detail, Fee, Create, Promotion } from './pages'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Users Page */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<Create field='users' />} />
          <Route path="/users/detail/:id" element={<Detail />} />
          <Route path="/users/edit/:id" element={<Edit />} />

          {/* Transactions Page */}
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/transactions/detail/:id/:type" element={<Detail />} />

          {/* Features Page */}
          <Route path="/features" element={<Fitur />} />
          <Route path="/features/edit/:id" element={<Edit />} />

          {/* Fees Page */}
          <Route path="/fees" element={<Fee />} />
          <Route path="/fees/edit/:code" element={<Edit />} />

          {/* Data Bank Page */}
          <Route path="/data banks" element={<DataBank />} />
          <Route path="/data banks/edit/:code" element={<Edit />} />

          {/* Provider & Product Page */}
          <Route path="/products" element={<Provider />} />
          <Route path="/products/list/:id/:servide_code" element={<Detail />} />
          <Route path="/products/create/:id/:servide_code" element={<Create field='products' />} />
          <Route path="/products/edit/:id/:servide_code/:product_code" element={<Edit />} />

          {/* Promotion Page */}
          <Route path="/promotions" element={<Promotion />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Slide}
      />
    </>
  )
}

export default App
