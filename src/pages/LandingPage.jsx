import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#2F418A] to-[#0C2071]">
      <img 
        src='src/assets/img/background_landing.png' 
        alt="Background Landing Page"
        className="absolute top-0 left-0 w-screen h-screen"
      />
      <div className='flex flex-col h-screen justify-between relative'>
        <div className='h-[46%] flex flex-col justify-end'>
          <img
            src='src/assets/img/logo_GoUTama.png'
            alt="Logo GoUtama"
            className="lg:w-1/3 md:w-1/2 w-2/3 mx-auto mb-5"
          />
        </div>
        <div className='w-screen text-center text-white 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl h-[14%]'>
          Administrator Back Office
        </div>
        <div className='h-[31%] flex flex-col'>
          <Link to='/login'
            className="rounded-xl bg-secondary w-fit mx-auto xl:mb-60 mb-56 hover:scale-105 static"
          >
            <div className='xl:mx-11 mx-9 my-2 text-dark xl:text-3xl text-2xl font-bold'>
              Login
            </div>
          </Link>
        </div>
        <div className='flex w-screen justify-center lg:gap-7 gap-5 text-white 2xl:text-xl xl:text-lg md:text-sm text-xs h-[8%]'>
          <p>Copyright@ ICN2023</p>
          <p>About us</p>
          <p>Blog</p>
          <p>Call us</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
