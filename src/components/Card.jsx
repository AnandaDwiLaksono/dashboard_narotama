/* eslint-disable react/prop-types */
const Card = (props) => {
    return (
      <div className={`card w-full rounded-3xl 2xl:p-7 px-7 py-5 ${props.bgColor} ${props.layout} static`}>
        <h4 className="2xl:text-2xl text-lg text-white">{props.judul}</h4>
        <h3 className="2xl:text-4xl text-2xl text-white font-bold">{props.jumlah}</h3>
        {props.value === '' ? '' : 
          <h4 className="2xl:mt-7 mt-5 2xl:text-2xl text-lg text-white font-normal">
            <span className={`bg-white rounded-xl px-2 mr-2 ${props.value.startsWith('-') ? 'text-error' : 'text-success'}`}>
              {props.value}
            </span>
            / hari
          </h4>
        }
      </div>
    );
  };

export default Card;