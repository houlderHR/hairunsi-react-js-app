import './style.scss'
const OptionButton = (props : any) => {
  return(
    <div className="col-center content-option">
      <img
          src={props.src}
          alt="projet"
          className="w-[35.77px] h-[35.78px]"
      />
      <div className="center col-center pt-2 w-[64px] h-[14px] text-[12px] font-normal">
          {props.title}
      </div>
  </div>
  )
}

export default OptionButton;