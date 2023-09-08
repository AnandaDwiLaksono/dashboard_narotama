import { Header, Footer, Navbar, Sidebar } from "../components";
// import { Column_Users } from "../components/column";
// import MOCK_DATA from "../assets/MOCK_DATA.json";

const Multimedia = () => {
  return (
    <div className='flex h-screen relative'>
      <Sidebar />
      <div className="w-5/6 pl-2 pr-12">
        <Navbar />
        <Header title="Daftar Multimedia" desc="Temukan media" />
        {/* <Table kolom={Column_Users} dataTabel={MOCK_DATA} /> */}
        <Footer className="absolute right-12 bottom-0" />
      </div>
    </div>
  );
};

export default Multimedia;