import React from "react";

interface IconType {
  name:string;
  size?:string;
  width?:string;
  height?:string;
}

const Icon:React.FC<IconType> = ({name,width,height,size = "16"}) => {

  const generateWidth = () => {
    return width ? width : size;
  }

  const generateHeight = () => {
    return height ? height : size;
  }

  return <>
  <div style={{height: `${generateHeight()}px`, width: `${generateWidth()}px`}}>
    <img className="bg-no-repeat bg-contain w-full h-full" src={`/icon/${name}.svg`} alt="" />
  </div>
  </>
}

export default Icon;