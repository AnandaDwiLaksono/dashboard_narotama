import { NavLink } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { HiOutlineDatabase, HiOutlineUsers } from 'react-icons/hi'
import { GoHistory } from 'react-icons/go'
// import { GrMultimedia } from 'react-icons/gr'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsBoxSeam } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { useStateContext } from '../utils/ContextProvider'
import logo from '../assets/img/logo_GoUTama.png'

const menus = [
  {
    name: 'dashboard',
    icon: <RxDashboard />,
  },
  {
    name: 'users',
    icon: <HiOutlineUsers />,
  },
  {
    name: 'transactions',
    icon: <GoHistory />,
  }
]

const masterDataMenus = [ 'features', 'fees', 'data banks', 'products', 'promotions']

const Sidebar = () => {
  const { showDropdown, setShowDropdown } = useStateContext();

  const activeLink = 'flex items-center gap-3 pl-4 pt-2.5 pb-2.5 rounded-[43px] text-primary shadow-md bg-light border-primary border-solid border 2xl:h-12 h-10';
  const normalLink = 'flex items-center gap-3 pl-4 pt-2.5 pb-2.5 rounded-[43px] text-dark hover:bg-light hover:bg-opacity-25 hover:shadow 2xl:h-12 h-10';

  return (
    <div className="w-1/6 h-screen flex flex-col 2xl:gap-4 gap-2 2xl:px-8 px-6">
      <div className="rounded-2xl bg-primary w-4/5 2xl:h-11 h-10 mx-auto 2xl:mt-10 my-8">
        <img
          src={logo}
          alt="logo GoUTama"
          className="w-3/4 h-5 mx-auto 2xl:my-3 my-2.5"
        />
      </div>
      {menus.map((menu, index) => (
        <NavLink
          to={`/${menu.name}`}
          key={index}
          className={({ isActive }) => isActive ? activeLink : normalLink}
        >
          {menu.icon}
          <span className='capitalize'>{menu.name}</span>
        </NavLink>
      ))}
      <button
        className={`flex items-center gap-3 pl-4 pt-2.5 pb-2.5 rounded-[43px] text-dark h-10 ${showDropdown ? 'bg-light bg-opacity-25 shadow' : 'hover:bg-light hover:bg-opacity-25 hover:shadow'}}`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <HiOutlineDatabase />
        <span className='capitalize'>Master data</span>
        <MdOutlineKeyboardArrowDown className='text-2xl' />
      </button>
      <div className={`flex flex-col pl-5 -mt-1 ${showDropdown ? 'block' : 'hidden'}`}>
        {masterDataMenus.map((menu, index) => (
          <NavLink
            to={`/${menu}`}
            key={index}
            className={({ isActive }) => isActive ? activeLink : normalLink}
          >
            <BsBoxSeam />
            <span className='capitalize'>{menu}</span>
          </NavLink>
        ))}
      </div>
      <NavLink
        to='/settings'
        className={({ isActive }) => `${isActive ? activeLink : normalLink} bottom-8 pr-[calc(16.666667%-140px)] fixed`}
      >
        <IoSettingsOutline />
        <span className='capitalize'>Settings</span>
      </NavLink>
    </div>
  )
}

export default Sidebar
