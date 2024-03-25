import './style.scss'
const OptionButton = (props : any) => {
  return(
    <div className="button-option-container">
      <img
          src={props.src}
          alt="projet"
          className="button-option-image"
      />
      <div className="button-option-label">
          {props.title}
      </div>
  </div>
  )
}

export default OptionButton;