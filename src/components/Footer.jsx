/* eslint-disable react/prop-types */
const Footer = (props) => {
  return (
    <div className={`flex justify-end gap-7 text-base-text pb-5 pr-4 pt-3 ${props.className}`}>
      <p>Copyright@ ICN2023</p>
      <p>About us</p>
      <p>Blog</p>
      <p>Call us</p>
    </div>
  )
}

export default Footer
