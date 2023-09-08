import { MdArrowForwardIos } from "react-icons/md";
import { Footer, Header, Navbar, Sidebar } from "../components";

// eslint-disable-next-line react/prop-types
const ButtonSettings = ({ text }) => {
  return (
    <button className="flex justify-between items-center w-full px-5 py-3 rounded-2xl bg-white border border-base-text mb-1">
      <div className="text-dark text-xl">
        {text}
      </div>
      <div className="text-black text-xl">
        <MdArrowForwardIos />
      </div>
    </button>
  )
}

const Settings = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className="flex flex-col justify-between w-5/6 pl-2 pr-12">
        <Navbar />
        <div className="flex flex-col gap-2 h-[calc(100%-136px)]">
          <Header title="Settings" />
          <ButtonSettings text="Profil" />
          <ButtonSettings text="Tipe Akun" />
          <ButtonSettings text="Tema" />
          <ButtonSettings text="Profil" />
          <ButtonSettings text="Ketentuan Layanan" />
          <ButtonSettings text="Ketentuan Privasi" />
          <ButtonSettings text="Pusat Bantuan" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Settings;
