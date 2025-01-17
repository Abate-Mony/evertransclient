import {  AiOutlineMenu } from "react-icons/ai"
import { useNavigation, Link, redirect, useNavigate, } from "react-router-dom"
import { motion } from 'framer-motion'
import { useravatar } from '../Assets/images';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import UiButton from "../components/UiButton"
import { Rounded } from './'
import { useDashBoardContext } from "./DashboardLayout"

export default function Header() {
    const navigate = useNavigate()
    const { user,
        toggleSideBar,
        view, setView, toggleDarkTheme, isDarkTheme, logoutUser
    } = useDashBoardContext()
    return (

        <div className="min-h-[60px] z-[0] 
relative border-5 justify-between flex items-center  
bg-white dark:bg-color_dark shadow-sm shadow-slate-300 container-- mx-auto px-4" >
            <div className='hover:bg-slate-300 md:hidden w-[50px] h-[50px] transition-bg flex items-center justify-center rounded-full ' onClick={toggleSideBar}>
                <AiOutlineMenu size={25} />
            </div>

            <div className="flex gap-x-5">

                <div className="hidden md:block gap-x-4">
                    <motion.div
                        initial={false}
                        className="h-[30px] w-[30px]   mx-auto shadow-2xl border-2 overflow-hidden  rounded-full mt- p-0 ">
                        <img src={useravatar} alt="user "
                            onClick={() => 0} className='w-full h-full m-0  object-cover scale-[1.3]' />
                    </motion.div>
                    <p className="w-fit mx-auto ">{user?.fullname || "loading"}</p>

                </div>
            </div>
            <Link to="/dashboard" className="-auto">DashBoard </Link>
            <div className="md:space-x-6 space-x-3 flex items-center">
                <UiButton name="Change view" className="hidden !text-xs lg:!inline-block !rounded-xl" onClick={() => setView(!view)} />

                <button
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="hidden md:inline-block 
            rounded bg-blue-500   px-3 py-1 text-xs font-montserrat font-medium 
leading-normal text-white 
shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-blue-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                    onClick={() => navigate("/")}
                >
                    view site
                </button>
                <Rounded
                    className={"!w-[40px] !h-[40px]"}
                    onClick={toggleDarkTheme}
                >
                    {
                        isDarkTheme ? <BsMoonStars size={25} /> : <BsSun size={25} />
                    }
                </Rounded>

                <button
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="inline-block  rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                    onClick={() => logoutUser()}
                >
                    logout
                </button>
            </div>
        </div>

    )
}