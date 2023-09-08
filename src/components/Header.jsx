// eslint-disable-next-line react/prop-types
const Header = ({ title, subtitle }) => {
  return (
    <>
      <div className="text-dark text-3xl pb-1">
        {title}
      </div>
      <div className="text-base-text text-base">
        {subtitle}
      </div>
    </>
  )
}

export default Header