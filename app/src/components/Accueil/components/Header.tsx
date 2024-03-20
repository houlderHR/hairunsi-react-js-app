import logo from './../../../assets/logo-hairun.svg'
import exit from './../assets/FluentMdl2Cancel 1.svg'
import notify from './../assets/notify.svg'
import ellipse from './../assets/Ellipse 909.png'
import vector from './../assets/Vector.svg'
const Header = () => {
    return (
        <div className="flex flex-row w-full h-[56px] bg-[#12103b]">
            <div className="w-1/2 bg-transparent flex flex-row justify-start items-center">
                <div className="w-[56px] h-[56px]">
                    <img 
                        src={exit}
                        alt='exit'
                        className="mx-2 w-[1vw]"
                    />
                </div>
                <div className="ml-5 flex flex-row">
                    <div>
                        <img 
                            src={logo} 
                            alt="logo" 
                            className="h-[4vh]"
                        />
                    </div>
                    <div className="-ml-1 w-[4.8vw] bg-transparent flex flex-col justify-end  items-end text-[#fff]">
                        <div className="text-[1em] font-medium">HaiRun</div>
                        <div className="text-[0.3em] font-light -mt-1">Technology</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end mx-2 w-1/2 bg-transparent">
                    <div className="flex justify-center items-center bg-[#2b335b] rounded-full h-[34px] w-[34px] mx-2">
                        <img 
                            src={notify}
                            alt='notify'
                            className="h-[24px] w-[24px] justify-center"
                        />
                    </div>
                    <div className="flex flex-row justify-around items-center text-[#fff] border-l-[1px] border-[#2b335b] w-[280px] h-[56px]">
                        <div className="flex flex-row w-[208px] h-[34px] bg-transparent">
                            <div className="h-[34px] w-[34px]">
                                <img 
                                    src={ellipse}
                                    alt="ellipse"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="bg-transparent flex flex-col justify-start items-center w-[158px] h-[34px] text-[#fff]">
                                <div className="font-500 text-[16px] h-[18px]">
                                    Darlene Robertson
                                </div>
                                <div className="font-normal text-[12px] h-[18px]">
                                    Web Designer
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-[24px] w-[24px] bg-transparent">
                            <img 
                                src={vector}
                                alt='vector'
                                className="w-[10px] h-[5px]"
                            />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Header;