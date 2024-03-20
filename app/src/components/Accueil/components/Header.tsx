import logo from './../../../assets/logo-hairun.svg'
import exit from './../assets/FluentMdl2Cancel 1.svg'
const Header = () => {
    return (
        <div className="flex flex-row w-full h-[5vh] bg-[#12103b]">
            <div className="w-1/2 bg-transparent flex flex-row justify-start items-center">
                <div>
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
            <div className="w-1/2 border-r-red-300">

            </div>
        </div>
    )
}

export default Header;