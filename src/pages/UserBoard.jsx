
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker';
import { VscFolderActive } from 'react-icons/vsc'
import Select from 'react-select';
import SelectTrip from 'react-select';
import SelectSortDate from 'react-select';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { IoMdClose } from "react-icons/io"
import { useParams, NavLink, useSearchParams, useNavigate, json } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineSetting } from 'react-icons/ai';
import formatQuery from "../utils/formatQueryStringParams"
import dateFormater from "../utils/DateFormater"
import axios from 'axios'
import { BiCategory } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MdOutlinePriceChange } from 'react-icons/md'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { useDispatch, useSelector } from 'react-redux';
// import {}
import Alert from '../components/Alert'

import { Button } from '../components'
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "swiper/css/a11y"
import "swiper/css/scrollbar"
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  AmountCount,
  BarChart,
  FormatTable,
  Heading
  , PanigationButton, PieChart,
  Scrollable, TicketCounts,
  Loadingbtn,
  BoxModel,
  DataDay
  , Form,
  NextButton,
  PlaceHolderLoader,
  PrevButton,
  PercentageBar
  , ToggleSwitch
} from '../components';
import { setUserData as setUserDataFunc } from '../actions/userData'

import { sortedDateOptions, sortTicketStatusOptions } from "../utils/sortedOptions"
const Details = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [toggle_, setToggle_] = useState(false)

  const { userData } = useSelector(state => state.userData);
  // console.log(userData)


  const setUserData = (data) => {
    dispatch(setUserDataFunc(data))
  }

  const [querySearch, setQuerySearch] = useSearchParams();
  const handleFilterChange = (key, value = null) => {
    setQuerySearch(preParams => {
      if (value == null) {
        preParams.delete(key)
      } else {
        preParams.set(key, value)
      }
      return preParams
    })

  }









  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const constraintsRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false)

  const style = {
    control: base => ({
      ...base,
      border: 0,
      boxShadow: "none",
      background: "transparent",
      color: "red"
    }
    )

  }


  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(dates)
  };
  useEffect(() => {
    if (!querySearch.get("limit")) {
      handleFilterChange("limit", 50)
    }
    handleFilterChange("view", "all")
    if (!querySearch.get("page")) {
      handleFilterChange("page", 1)

    }
    async function getUserInfo() {
      const url = process.env.REACT_APP_LOCAL_URL + "/auth/userinfo";
      try {
        const res = await axios.get(url, {
          headers: {
            'Authorization': "makingmoney " + token
          }
        })
        setUserInfo(res.data?.user)


      } catch (err) {
        navigate("/login?message=" + err.response.data)
      }
    }
    getUserInfo()
  }, [])
  const [_userData, _setUserData] = useState({
    labels: ["active tickets", "inactive tickets"],
    datasets: [
      {
        label: "ticket data",
        data: [12, 14],
        backgroundColor: ["green", "orange"]
      }
    ],
    datalabels: {
      backgroundColor: function (context) {
        return context.dataset.backgroundColor;
      },
      borderColor: 'white',
      borderRadius: 25,
      borderWidth: 3,
      color: 'white',
      font: {
        weight: 'bold'
      },
      padding: 6,


    }


  }
  )


  const handleChangeText = (e) => {
    handleFilterChange("search", e.target.value)
  }


  const handleBoardingRangeSearch = () => {
    if (querySearch.get("daterange")) {
      handleFilterChange("daterange", null)
    }
    handleFilterChange("boardingRange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
  }
  const handleFilterSearch = () => {
    if (querySearch.get("boardingRange")) {
      handleFilterChange("boardingRange", null)
    }
    handleFilterChange("daterange", `start=${startDate ? new Date(startDate).toLocaleDateString('en-ZA') : null},end=${endDate ? new Date(endDate).toLocaleDateString('en-ZA') : null}`)
  }
  const checkPages = (index) => {
    if (querySearch.get("page") == index) return
    handleFilterChange("page", index)
  }
  const handleSortTime = (evt) => {
    if (querySearch.get("sort") == evt.value) return
    handleFilterChange("sort", evt.value)
  }
  const handleChange = (evt) => {
    if (querySearch.get("ticketStatus") == evt.value) return
    handleFilterChange("ticketStatus", evt.value)
  }
  const token = localStorage.getItem("token");

  const { loading: isLoading } = useSelector(state => state.userData)

  const [userInfo, setUserInfo] = useState({});
  const config = {
    headers: {
      'Authorization': "makingmoney " + token
    },
    params: formatQuery(querySearch.toString())
  }
  async function getData() {
  
    const url = "/ticket"
    setIsActiveIndexLoading(true)

    try {
      const res = await axios.get(url, config)
      setUserData(res.data)

    } catch (err) {
      setToggle_(true)
      console.log(err)
      setMessage(err.response.data)
      console.log(err)
      // alert(err.response.data)
    }
    setIsActiveIndexLoading(false)

  }

  useEffect(() => {
    getData();
  }, [querySearch]);




  const [toggle, setToggle] = useState(false);

  const selectRef = useRef(null)
  const LoadingBox = ({ }) => {


    return (
      <div role="status" class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <div class="flex items-center justify-between pt-4">
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>

    )

  }
  return (
    <motion.div
      className='pt-4 px-2 max-w-full overflow-x-auto select-none lg:px-10 
      mx-auto
    max-h-[calc(100vh-4rem)] overflow-y-auto bg-color_light dark:bg-color_dark' ref={constraintsRef}>
     <Alert message={message}
        duration="30000"
        className={`
      ${toggle_ && "!top-1/2 -translate-y-1/2"}
      `}
        toggle={toggle_}
        // confirmFunc={() =>0}
        setToggle={()=>0}

      />
      <motion.div
        onClick={() => setToggle(true)}
        animate={{
          scale: [0.7, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }
        }
        className="bottom-1/2
                        -translate-y-1/2 fixed 
                        flex-none 
                        shadow-2xl button-add  top-auto bg-blue-400 
w-[2.5rem]
h-[2.5rem] 
-rounded-full 
overflow-hidden 
right-0
z-10  "
      >
        <div className="flex h-full w-full items-center -scale-animation justify-center ">
          <AiOutlineSetting size={20} color="#fff" className="" />
        </div>
      </motion.div>
      <nav class="flex mb-5 mt-5 px-5 lg:hidden" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NavLink to={"/booking"} href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              Booking
            </NavLink>
          </li>
          <li>
            <div class="flex items-center" >
              <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                <h1 className="text-slate-400  font-medium text-xl md:text-2xl ">Employee Details</h1>
              </a>
            </div>
          </li>

        </ol>
      </nav>
      <div className="lg:flex  items-start justify-start gap-4 ">
        <div
          className="flex-none w-[18rem] hidden lg:block
          "

        >

          <Heading text={"Recent Ticket(3)"} className={"!text-center !mb-2"} />

          {
            isLoading ? <>
            <LoadingBox />
            <LoadingBox />
            
            
            </> :
              userData?.tickets?.slice(0, 3).map(({ fullname, traveldate, from, to, _id, createdAt }, i) => {
                return (
                  <div
                    key={i}
                    class="max-w-sm mb-1 dark:text-white 
      bg-white  border  border-gray-200 rounded-lg shadow-xl dark:shadow-sm 
      dark:shadow-black shadow-slate-300 dark:bg-gray-800 dark:border-gray-700">
                    <div className="grid grid-cols-[1fr,auto] px-2 pt-3
  pb-2
  items-center justify-between border dark:border-slate-400 ">
                      <Heading text="Tickets Details"
                        className="!mb-0 !text-xs !text-start !mt-0 !pl-0 !ml-0 
  !font-semibold first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                      <h4 className='!text-xs text-slate-500 !mb-0 !pb-0'>
                        {createdAt && (dateFormater(createdAt).date)}
                      </h4>
                    </div>


                    <div class="p-2">
                      <Heading text="FullName" className="!mb-0 !text-center !text-lg !font-medium first-letter:text-xl first-letter:!font-semibold !font-montserrat" />
                      <Heading text={fullname} className="!mb-2 !text-sm !text-center" />
                      <div className='grid grid-cols-2'>
                        <div>
                          <Heading text="From" className="!mb-0 !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                          <Heading text={from} className="!mb-2 !text-sm" />
                        </div>

                        <div>
                          <Heading text="To" className="!mb-0 !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                          <Heading text={to} className="!mb-2 !text-sm" />
                        </div>

                      </div>
                      <Heading text="Travel Date" className="!mb-0 !text-center !text-lg !font-medium  first-letter:!font-semibold !font-montserrat" />
                      <Heading text={(new Date(traveldate).toLocaleDateString())} className="!mb-2 !text-sm !text-center" />
                      <div className='grid grid-cols-2 gap-x-1 place-items-center'>

                        <Button name="view"
                          className={"!w-full"}
                          href={`${_id}`}
                        />
                        <a
                          target='_blank'
                          className='
                        w-full
                        font-medium
            shadow
            md:shadow-md
            shadow-blue-200
            dark:shadow-slate-800
            bg-blue-400
            dark:bg-gray-700
            pt-1
            mr-1
            rounded-sm
            text-white
            dark:font-semibold
            px-3
            pb-1.5
            place-items-center  
            hover:bg-blue-700
            ease 
            transition-colors
            duration-700
            hover:underline
            flex
            justify-center 
            items-center
            text-[0.7rem] 
            md:text-sm
            font-montserrat
                        
                        '

                          href={`${process.env.REACT_APP_LOCAL_URL}/downloadticket/${_id}`}>download</a>

                      </div>
                    </div>
                  </div>
                )

              })
          }
        </div>
        <div className="flex-1   mb-6">
          <div className="flex items-start  flex-wrap gap-x-4 gap-y-6 justify-center ">
            <div className='md:hidden'>
              <Swiper className='md:hidden max-w-sm w-full'
                slidesPerView={1}
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false
                }}
              >
                <SwiperSlide>
                  <PercentageBar
                    className={`${true && "!min-w-[8rem]"}`}
                    percent={userData?.percentageActive}
                    n={userData?.totalActiveTickets}
                    price={userData?.totalActivePrice}
                    text="Active  Ratio" />

                </SwiperSlide>
                <SwiperSlide>
                  <PercentageBar
                    className={`${true && "!min-w-[8rem]"}`}
                    stroke="red"
                    n={userData?.totalInActiveTickets}
                    price={userData?.totalInActivePrice}
                    percent={userData?.percentageInActive}
                    text="InActive  Ratio" />

                </SwiperSlide>
              </Swiper>
            </div>

            <Scrollable className={`!mb-10 mx-auto hidden
            md:!grid
             !justify-center 
            md:!grid-cols-2 gap-y-5 !transition-all 
            !duration-[1s]`}>
              <PercentageBar
                className={`${true && "!min-w-[8rem]"}`}
                percent={userData?.percentageActive}
                n={userData?.totalActiveTickets}
                price={userData?.totalActivePrice}
                text="Active  Ratio" />
              <PercentageBar
                className={`${true && "!min-w-[8rem]"}`}
                stroke="red"
                n={userData?.totalInActiveTickets}
                price={userData?.totalInActivePrice}
                percent={userData?.percentageInActive}
                text="InActive  Ratio" />
            </Scrollable>
            {
              isLoading ?
                <PlaceHolderLoader />

                :
                <>

                  <Scrollable className={`!px-5 ${true && "!grid md:!grid-cols-2"} !transition-all !duration-[1s] `}>
                    <TicketCounts counts={userData?.totalTickets}
                      text={"Total Number Of Tickets"}
                      icon={<AiOutlineSave />} />
                    <TicketCounts counts={userData?.totalActiveTickets}
                      text={"Total Number Of active Tickets"}
                      icon={<VscFolderActive />} />
                    <TicketCounts
                      text={"Total Number Of Inactive Tickets"}
                      counts={userData?.totalInActiveTickets} icon={<BiCategory />} />
                  </Scrollable>
                  <Scrollable className={`!px-5 ${true && "!grid md:!grid-cols-2"}`}>
                    <AmountCount
                      className="!bg-blue-400"
                      text="Total cost of all tickets"
                      icon={<MdOutlinePriceChange />}
                      amount={userData?.totalPrice} />
                    <AmountCount
                      className="!bg-green-400"

                      text="Total cost of all active tickets"

                      icon={<BiCategory />} amount={userData?.totalActivePrice} />
                    <AmountCount
                      className="!bg-red-400 !text-black"

                      text="Total cost of all inactive tickets"

                      icon={<BiCategory />} amount={userData?.totalInActivePrice} />
                  </Scrollable>
                </>
            }


          </div>
        </div>
        <div className={`flex-none py-5
        sidebarr m lg:rounded-lg shadow rounded-lg  overflow-y-auto--
        ${toggle ? "right-0" : "!-right-full"}
        duration-500
        transition-[right] shadow
        lg:shadow-none lg:max-w-sm lg:w-[22rem] 
        text-center bg-white
        dark:bg-slate-800 rounded-sm right-0 top-12 h-fit
           w-[calc(100vw-3.5rem)] max-w-sm 
           z-20 fixed   lg:static px-4 `}>
          <span className="absolute w-[3.125rem] h-[3.125rem] top-0 
       text-red-700 hover:bg-orange-500 rounded-e-md transition-all lg:hidden duration-500 
       -left-[3.125rem] z-10 rounded-none flex items-center justify-center  font-black border-black"
            onClick={() => setToggle(false)}
          >
            <IoMdClose size={25} />
          </span>
          {
          
          isLoading?
          <div role="status" class="animate-pulse">
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
              <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
              <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
              <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
              <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
              <div class="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mb-3"></div>
              <div class="flex items-center justify-center mt-4">
                  <svg class="w-8 h-8 text-gray-200 dark:text-gray-700 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                  <div class="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
                  <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <span class="sr-only">Loading...</span>
          </div>
          
          :
          <div
            className=' overflow-y-auto max-h-[calc(100vh-5rem)] lg:max-h-fit overflow-x-hidden '
          >
            {querySearch.get("account_block") && "account restricted"}
            <Heading text={"Employee Details"} className="!font-semibold !mb-5 underline underline-offset-4  !text-lg first-letter:text-2xl" />
            <Heading text={"Full Name"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
            <h4 className='text-sm text-slate-500 font-medium '
            >{userInfo?.fullname || "n/a"}</h4>

            <Heading text={"Phone Number"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
            <h4 className='text-sm text-slate-500 font-medium '>{userInfo?.phone || "n/a"}</h4>
            <Heading text={"Created At"} className="!font-semibold !mb-0 !text-lg first-letter:text-2xl" />
            <h4 className='text-sm text-slate-500 font-medium '>{userInfo?.createdAt && (dateFormater().date) || "n/a"}</h4>

            <Swiper
              className='my-6
                            px-4 
                            w-full
                            lg:w-full 
                            !relative'
              slidesPerView={1}
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: ".arrow__left",
                nextEl: ".arrow__right",
              }}
            >
              <PrevButton className="!left-1.5" />
              <NextButton className="!right-1.5" />

              <SwiperSlide>
                <Heading text={"Query  Travel At"} className="!font-black !text-sm underline !underline-offset-4 !mb-2 !text-center" />

                <AnimatePresence className="mt-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, duration: 2 }}
                    className="flex flex-col items-center w-full justify-center">
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                    />
                    <button
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="inline-block  rounded bg-blue-500   px-2 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
  transition duration-150 ease-in-out hover:bg-blue-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                      onClick={handleBoardingRangeSearch}

                    >
                      {isLoading ? <Loadingbtn toggle /> : "Filter Tickets"}
                    </button>

                    {
                      querySearch.get("boardingRange") && <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="inline-block  rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                        onClick={() => {

                          handleFilterChange("boardingRange")
                        }}
                      >
                        Clear Travel
                      </button>
                    }
                  </motion.div>
                </AnimatePresence>

              </SwiperSlide>
              <SwiperSlide>
                <Heading text={"Query  Created At"}
                  className=" !text-sm !text-slate-500 !font-semibold !underline-offset-4 !mb-2 !text-center" />

                <AnimatePresence className="mt-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, duration: 2 }}
                    className="flex flex-col items-center w-full justify-center">
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                      maxDate={new Date()}
                    />
                    <button
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="inline-block  rounded bg-blue-500   px-2 py-1 text-xs font-montserrat font-medium 
  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] mb-3
  transition duration-150 ease-in-out hover:bg-blue-600
  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
  focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                      onClick={handleFilterSearch}

                    >
                      {isLoading ? <Loadingbtn toggle /> : "Filter Tickets"}
                    </button>

                    {
                      querySearch.get("daterange") && <button
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="inline-block  rounded bg-red-500   px-2 py-1 text-xs font-montserrat font-medium 
leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
transition duration-150 ease-in-out hover:bg-red-600
hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

                        onClick={() => {

                          handleFilterChange("daterange")

                        }}

                      >
                        Clear Filter Query
                      </button>
                    }
                  </motion.div>
                </AnimatePresence>

              </SwiperSlide>

            </Swiper>



            <div className="mt-10 mb-10 md:mb-5">

              <h2 className="text-start 
                                    text-color_dark  mt-2 ml-1
                                     tracking-tight 
                                    font-medium">Booking OverView </h2>
              <span className="mb-5 w-14 ml-2 h-1 bg-blue-700 block rounded-lg"></span>
              <Swiper

                className='my-6 px-4 max-w-sm lg:max-w-lg relative'
                slidesPerView={1}
                // onSlideChange={(e) => setctiveSlide(e.activeIndex)}
                modules={[Autoplay, Pagination, Navigation]}
                navigation={{

                  prevEl: ".arrow__left",
                  nextEl: ".arrow__right",


                }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
                }}
              >
                <NextButton className="!right-1.5 !h-8" />
                <PrevButton className="!h-8 !left-1.5" />
                <SwiperSlide>
                  <Heading text="Active ratio percentage" className="!text-sm !md-text-xl underline !underline-offset-4" ></Heading>
                  <PercentageBar
                    percent={userData?.percentageActive}

                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Heading text="Inactive ratio percentage" className="!text-sm !md-text-xl underline !underline-offset-4" ></Heading>
                  <PercentageBar
                    stroke="red"
                    percent={userData?.percentageInActive}

                  />
                </SwiperSlide>

              </Swiper>
              {
                querySearch.get("daterange") && endDate == null && (

                  <div><DataDay data={userData?.tickets} /> </div>
                )
              }


              {/* <BoxModel activeCount={userData?.totalActiveTickets}
                inActiveCount={userData?.totalInActiveTickets} /> */}

            </div>

          </div>
          }

        </div>
      </div>

      <div className="flex justify-between gap-4 ppl-4
      flex-wrap pr-5 items-start mb-10">
        <h1 className="text-2xl mt-4 
        text-gray-700 pl-6
        
        flex tracking-tight">All tickets <span className="text-xs ring-2 ring-gray-700  grid place-items-center
        ml-1 w-5 h-5 bg-gray-500 text-white
        mb-4 rounded-full border">{userData?.totalTickets || 0} </span> </h1>

        <div className='mt-0'>
          <div className="text-[0.8rem] text-slate-300 uppercase text-center font-semibold mb-1 font-montserrat"> ticket status</div>
          <Select
            styles={style}
            options={sortTicketStatusOptions}
            defaultValue={{
              label: "All tickets",
              value: "all"
            }}
            ref={selectRef}
            isSearchable={false}
            onChange={handleChange}
            className='!border-none !h-8 mt-0' />
        </div>

        <div className='mt-0'>
          <div className="text-[0.8rem]
          text-slate-300 uppercase
          text-center font-semibold mb-1 font-montserrat"> trip type </div>
          <SelectTrip
            onChange={
              evt => {
                if (querySearch.get("triptype") == evt.value) return
                // if (params.evt == evt.value) return
                handleFilterChange("triptype", evt.value)
                // setParams(pre => {
                //   return {
                //     ...pre,
                //     triptype: evt.value,
                //     page: 1
                //   }
                // })


              }
            }
            options={


              [
                {
                  label: "all trip",
                  value: "all"
                }, {
                  label: "singletrip",
                  value: "singletrip"
                }, {
                  label: "roundtrip",
                  value: "roundtrip"
                }


              ]}
            styles={style}
            defaultValue={{
              label: "all trip",
              value: "all"
            }}

            isSearchable={false}
            // onChange={handleSortTime}
            className='!border-none !h-8 mt-0' />
        </div>
        <div className='mt-0'>
          <div className="text-[0.8rem]
          text-slate-300 uppercase
          text-center font-semibold mb-1 font-montserrat"> sorted date </div>
          <SelectSortDate
            options={sortedDateOptions}
            styles={style}
            defaultValue={{
              label: "createdAt -",
              value: "newest"
            }}

            isSearchable={false}
            onChange={handleSortTime}
            className='!border-none !h-8 mt-0' />
        </div>


      </div>
      <AnimatePresence >

        {
          querySearch.get("daterange") && <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-xs
            tracking-tighter
        font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

            <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
              onClick={() => {
                handleFilterChange("daterange")
              }}

            >Clear Filter</span>
            Date filter is on and query is from <span> {new Date(startDate).toLocaleDateString()}</span>
            <span> {endDate !== null ? "to " + new Date(endDate).toLocaleDateString() : null}</span> </motion.div>
        }
        {
          querySearch.get("search") && <motion.div

            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}

            className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
        font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

            <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
              onClick={() => {
                handleFilterChange("search")
                // const temp = params;
                // if (temp.search) delete temp.search;
                // setParams({ ...temp })

              }}

            >Clear Filter</span>
            Text Filter is On  </motion.div>
        }
        {
          querySearch.get("sort") && querySearch.get("sort") !== "newest" && <motion.div

            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}

            className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
        font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>
            <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
              onClick={() => {
                handleFilterChange("sort")
              }}

            >Clear Filter</span>
            Text Filter is On  </motion.div>
        }
        {
          querySearch.get("ticketStatus") && querySearch.get("ticketStatus") !== "all" && <motion.div

            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}

            className='relative bg-red-300/25 mb-10 my-2 pt-1 pb-2 rounded-sm text-sm tracking-tighter
        font-montserrat text-center w-[min(calc(100vw-2.5rem),25rem)] min-h-[2rem] mx-auto  shadow-lg ring-1 ring-red-300'>

            <span className='absolute left-1/2 -translate-x-1/2 px-6 pt-1 pb-1.5 shadow font-montserrat top-10 rounded-lg text-xs lg:text-sm bg-green-400 '
              onClick={() => {
                handleFilterChange("ticketStatus")
              }}

            >Clear Filter</span>
            Ticket are set to <span className='px-2 bg-red-300 text-black text-xs rounded-lg mx-4 ring-1 ring-red-900'>{querySearch.get("ticketStatus")}</span> Filter is On  </motion.div>
        }
      </AnimatePresence>

      <Form
        handleChangeText={handleChangeText}
        params={querySearch} />
      {

        !isLoading && (<FormatTable
          tickets={userData?.tickets}
          skip={querySearch.get("limit")}
          currentPage={querySearch.get("page")} />)
      }

      {
        isLoading && (
          <PlaceHolderLoader />
        )
      }
      <div className='mt-10 ' />
      <Scrollable className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto">
        {Array.from({
          length: userData?.numberOfPages
        }, (_, index) => {
          return <PanigationButton
            text={index + 1}
            active={activeIndex}
            loading={isActiveIndexLoading}
            index={index} onClick={() => {
              setActiveIndex(index)
              checkPages(index + 1)
            }} />
        })}
      </Scrollable>

    </motion.div>
  )
}

export default Details