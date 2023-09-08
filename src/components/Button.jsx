// eslint-disable-next-line react/prop-types
const Button = ({ style, func, text}) => {
  return (
    <button
      className={style}
      onClick={func}
    >
      {text}
    </button>
  )
}

export default Button
