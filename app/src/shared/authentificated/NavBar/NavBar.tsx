import './style.scss'


const NavBar = () => {
    return (
        <div className="flex flex-row w-full h-[56px] bg-[#12103b]">
            <div className="w-1/2 bg-transparent flex flex-row justify-start items-center">
                <div className="hidden lg:flex lg:flex-col sm:flex sm:flex-col justify-center items-center lg:w-[56px] h-[56px] sm:w-[56px] hover:cursor-pointer">
                    <img 
                        src="FluentMdl2Cancel 1.svg"
                        alt='exit'
                        className="mx-2 w-[18.3px] h-[18.3px]"
                    />
                </div>
                <div className="ml-5 flex flex-row items-center w-[85px] h-[30px]">
                    <div className='flex justify-center items-center w-[23.87px] h-[29.99px]'>
                        <img 
                            src="/logo-hairun.svg"
                            alt="logo" 
                            className="h-[4vh]"
                        />
                    </div>
                    <div className="content-hairun-name">
                        <div className="text-[1em] font-medium w-[55.08px] h-[13.22px]">HaiRun</div>
                        <div className="sizing-techno">Technology</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-end mx-2 w-1/2 bg-transparent">
                    <div className="hidden lg:flex justify-center items-center bg-[#2b335b] rounded-full h-[34px] w-[34px] mx-2">
                        <img 
                            src="/notify.svg"
                            alt='notify'
                            className="h-[24px] w-[24px] justify-center"
                        />
                    </div>
                    <div className="flex flex-row w-auto justify-around items-center text-[#fff] lg:w-[280px] h-[56px]">
                        <div className="lg:w-[34px] lg:h-[1px] lg:rotate-90 border-1 bg-[#2b335b]">
                        </div>
                        <div className="flex flex-row lg:w-[208px] h-[34px] sm:w-[208px] w-auto bg-transparent">
                            <div className="h-[34px] w-[34px]">
                                <img 
                                    src="/Ellipse 909.png"
                                    alt="ellipse"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="hidden bg-transparent lg:flex lg:flex-col lg:justify-start sm:flex sm:flex-col sm:justify-start items-center w-[158px] h-[34px] text-[#fff]">
                                <div className="font-500 text-[16px] h-[18px]">
                                    Darlene Robertson
                                </div>
                                <div className="font-normal text-[12px] h-[18px]">
                                    Web Designer
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-[24px] w-[24px] bg-transparent hover:cursor-pointer">
                            <img 
                                src="Vector.svg"
                                alt='vector'
                                className="w-[10px] h-[5px]"
                            />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default NavBar;