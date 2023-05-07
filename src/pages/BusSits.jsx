import { useState, useEffect } from "react"
import { Modal } from "../components"
import { useNavigate } from "react-router-dom"
import {AiOutlineArrowRight} from 'react-icons/ai'
import {NavLink} from 'react-router-dom'


import { TbArmchair2, TbArchiveOff, TbArmchairOff } from 'react-icons/tb'
const BusSits = () => {
  const weekDay = (index=0) => {
    const _days = [

      "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"
    ]
    if (index < 0 || index > 6) {
      index = 0
    }
return _days[index]
    


  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      // behavior: "smooth"
    })

  }, [])

  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const toggleModal = () => {
    setError(!error)
  }
  const checkBusAvailabity = (id, e = null) => {
    if (id & 1) {
      setError(true)
      setErrorMessage("Sheet has already beeen taken ; choose another sheet thanks")

      window.navigator.vibrate([50, 100, 60])


    } else {
      window.navigator.vibrate([50])
      setSelected(id)


    }
  }
  const proccedCheckout = (e) => {
  e.preventDefault()
    if (!selected) {
      setError(true)
      setErrorMessage("please select a sit and procced thanks")
      return
    }
    gotoCheckOut()

  }
  const gotoCheckOut = () => navigate("/information")
  return (
    <div
      className="min-h-screen"
    >
      <Modal toggle={error} toggleModal={toggleModal} information={errorMessage}  ></Modal>
     
      <div className="flex container mx-auto">

        <div className="flex-1 hidden lg:block"></div>

        <div className="flex-none cal-width  mx-auto  shadow-lg mt-6 py-6 pt-0 pb-20"

          style={{ "--w": "500px" }}>
              <nav className="flex mb-5 mt-5 px-5" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
    <li className="inline-flex items-center">
      <NavLink to={"/"} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        {/* <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> */}
        Home
      </NavLink>
    </li>
    <li className="inline-flex items-center">
    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
    
      <NavLink to={"/"} href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        {/* <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> */}
      Booking
      </NavLink>
    </li>
    <li>
      <div className="flex items-center">
        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
        <h1 className="text-slate-400  font-medium text-xl ">Checkout</h1>
        
        </a>
      </div>
    </li>
  
  </ol>
</nav>
          <div className="mb-6 flex   text-xs mt-[2rem] items-center">
                                <div className="flex-1 mx-1 relative min-h-[40px] 
                                border-2 flex items-center rounded-lg px-4">
                                    <span className="absolute left-[15px] px-2
                                    rounded-sm h-[30px] bg-color_light
                                dark:bg-color_dark top-[-10px]">
                                        From
                                    </span>
                                    <div className="relative uppercase">
                                        buea
                                    </div>

                                </div>
                                <AiOutlineArrowRight size={20} className='text-slate-400 dark:text-white flex-none'/>
                                <div className="flex-1 mx-1 relative min-h-[40px]
                                text-xs border-2 flex items-center rounded-lg px-4">
                                    <span className="absolute left-[10px] px-2 rounded-sm h-[30px] bg-color_light
                                dark:bg-color_dark top-[-10px] ">
                                        To
                                    </span>
                                    <div className="relative uppercase">
                                        Baffousam
                                    </div>

                                </div>


                            </div>

          <div className="flex justify-between px-2 items-center">
            <h1 className="text-lg">{weekDay(new Date().getDay())}</h1>
            <h1 className="text-lg pb-4">On {new Date().getDay()}th Sept2021 at </h1>
            <h2 className="text-lg">{new Date().getHours()} am</h2>
          </div>
          <p className="text-lg text-center capitalize pb-2 ">please select your bus shit </p>

          <div className="flex justify-between px-2 pb-2">
            <h1 className="text-xs lg:text- shadom-lg lg flex-1">
              <span className="w-[10px] mr-1 h-[10px] inline-block bg-green-400 rounded-full "></span>Available</h1>

            <h1 className="text-xs lg:text- shadom-lg lg flex-1">
              <span className="w-[10px] mr-1 h-[10px] inline-block bg-blue-400 rounded-full "></span>Rerservation
            </h1>

            <h1 className="text-xs lg:text- shadom-lg lg flex-1">
              <span className="w-[10px] mr-1 h-[10px] inline-block bg-orange-400 rounded-full "></span>
              Not Available
            </h1>



          </div>
          <div className="flex flex-wrap">
            {
              Array.from({ length: 16 }, (seat, i) => {
                return (
                  <div className="w-1/4 h-[80px] p-2 select-none" onClick={(e) => checkBusAvailabity(i, e)}>
                    <div className={`${i & 1 ? "bg-orange-400" : "bg-green-400"} peer
                ${selected == i ? "border-2 border-black dark:border-white" : ""} w-full h-full  relative
                rounded-lg flex items-center justify-center`}>
                      <div className="absolute top-[-10px] bg-color_light text-[12px] dark:bg-color_dark shadow-lg
                px-2 rounded-sm ">{i + 1}</div>
                      {i & 1 ? (<div><TbArmchairOff size={30} /></div>) : <div><TbArmchair2 size={30} /></div>}


                    </div>
                  </div>
                )
              })
            }
          </div>
          
          
          

                        <form onSubmit={proccedCheckout} className="md:px-3">
                            
                            <h1 className="text-lg text-center  mx-5 my-2">please  take your time to fill in the information</h1>


                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full 
                rounded 
                border-2
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent
                px-3 py-[0.32rem]
                leading-[2.15] 
                outline-none
                transition-all 
                duration-200
                ease-linear
                focus:placeholder:opacity-100
                data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="fullname"
                                    placeholder="Full Names" required />
                                <label
                                    htmlFor="fullname"
   className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                                >
                                    Full Names
                                </label>
                            </div>
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="number"
                                    className="peer block min-h-[auto] w-full 
                rounded 
                border-2
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent
                px-3 py-[0.32rem]
                leading-[2.15] 
                outline-none
                transition-all 
                duration-200
                ease-linear
                focus:placeholder:opacity-100
                data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="phonenumber"
                                    placeholder="Phone number" required />
                                <label
                                    htmlFor="phonenumber"
                                    className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                                >
                                    Phone Number
                                </label>
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full 
                rounded 
                border-2
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent
                px-3 py-[0.32rem]
                leading-[2.15] 
                outline-none
                transition-all 
                duration-200
                ease-linear
                focus:placeholder:opacity-100
                data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput3"
                                    placeholder="Email address" required />
                                <label
                                    htmlFor="exampleFormControlInput3"
                                      className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                                >Email address
                                </label>
                            </div>
                            <div className="mb-6 flex items-center justify-between select-none ">
                                <div className="mb-[0.125rem] pb-0
                                block min-h-[50px]  border-2 mr-4  relative pl-[1.5rem] flex-1">
                                <span className="absolute left-[15px] px-2
                                    rounded-sm h-[30px] bg-color_light
                                dark:bg-color_dark top-[-15px]">
                                user gender
                                     </span>
                                     <div className="px-2 w-fit mt-4 flex gap-2">
                                     <div className="flex items-center">
                                     
                                    <input
                                    className="pb-0"
                                        type="radio"
                                        value="male"
                                        id="male"
                                        name="gender"
                                        checked
                                    />
                                    <label
                                        className="inline-block  pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="gender">
                                        Male
                                    </label>
                                    </div>
                                    <div className="flex items-center">
                                    
                                    <input
                                        type="radio"
                                        value="female"
                                        id="female"
                                        name="gender"
                                    />
                                    <label
                                        className="inline-block  pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="gender">
                                        female
                                    </label>
                                    </div>
                                    
                                    </div>
                                    
                                </div>

                                <div className="relative w-[80px] flex-none" data-te-input-wrapper-init>
                                    <input
                                        type="number"
                                        className="peer block min-h-[auto] w-full 
                rounded
                border-2
                focus:border-2
                focus:border-blue-400
                valid:border-blue-400
                bg-transparent
                px-3 py-[0.32rem]
                leading-[2.15] 
                outline-none
                transition-all 
                duration-200
                ease-linear
                focus:placeholder:opacity-100
                data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="age"
                                        placeholder="age" required />
                                    <label
                                        htmlFor="age"
                                        className="pointer-events-none 
                absolute left-3
                top-0 mb-0
                max-w-[90%]
                origin-[0_0]
                truncate 
                pt-[0.37rem] 
                leading-[2.15]
                text-neutral-500
                transition-all duration-200  
                ease-out 
                peer-focus:-translate-y-[1.15rem]
                peer-focus:scale-[0.8]
                peer-valid:scale-[0.8]
                peer-valid:text-blue-400
                peer-valid:-translate-y-[1.15rem]
                peer-focus:text-blue-400
                peer-focus:bg-color_light
                peer-valid:bg-color_light
                dark:peer-focus:bg-color_dark
                dark:peer-valid:bg-color_dark
                px-0
                bg-transparent
                peer-data-[te-input-state-active]:-translate-y-[1.15rem]
                 rounded-sm
                 peer-data-[te-input-state-active]:scale-[0.8]
                motion-reduce:transition-none
                dark:text-neutral-200
                dark:peer-focus:text-primary"

                                    >
                                        Age
                                    </label>
                                </div>
                            </div>
                         
                            <button
                                type="submit"
                                className="hidden md:inline-block bg-blue-400 
              w-full rounded bg-primary px-7
              pb-2.5 pt-3 text-sm font-medium
              uppercase leading-normal
              text-white
              shadow-[0_4px_9px_-4px_#3b71ca]
              transition duration-150
              ease-in-out hover:bg-primary-600
              hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
              focus:bg-primary-600 
              focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
              focus:outline-none focus:ring-0 active:bg-primary-700 
              active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
              dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] 
              dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
              dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
              dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                               
                                >
                                Procced Checkout
                            </button>
                            <div className="md:hidden  h-[2.7rem] flex
                            items-center justify-center mt-5 fixed z-10 bottom-8 w-full">
        <button
          type="submit"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="inline-block  rounded bg-blue-500 cal-width mx-auto --w-[90%] md:hidden  pb-2 pt-2.5 text-lg font-montserrat font-medium uppercase
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] ml-0
  transition duration-150 ease-in-out hover:bg-primary-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          // onClick

        >
          CHECKOUT
        </button>

      </div>
                          
                        </form>
      </div>        </div>
    </div>
  )
}

export default BusSits