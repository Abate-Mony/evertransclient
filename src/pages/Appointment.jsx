import { useState, useEffect } from 'react'
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'

import DatePicker from 'react-datepicker';
import { AnimatePresence, motion } from 'framer-motion'
import SelectSort from 'react-select';
import SkipSelect from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { setTickets } from '../actions/adminData';
import {
    AmountCount, FormatTable,
    Loader, Scrollable,
    TicketCounts,
    PanigationButton,
    Loadingbtn
} from '../components';
import { AiOutlineSave } from 'react-icons/ai';
import { VscFolderActive } from 'react-icons/vsc';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePriceChange } from 'react-icons/md';

const Appointment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isActiveIndexLoading, setIsActiveIndexLoading] = useState(false)
    const [totalTickets, setTotalTickets] = useState()
    const [activeTicketCount, setActiveTicketCount] = useState(0);
    const [params, setParams] = useState({
        page: 1,
        limit: 2
    })

    const tickets_ = useSelector(state => state.setAdminData.tickets);
    const isLoading = useSelector(state => state.setAdminData.loading.tickets)
    const handleSkipChange = (evt) => {
        const temp = params;
        if (temp.limit === evt.value) return;
        temp.page = 1
        setActiveIndex(0)
        temp.limit = evt.value
        setParams({
            ...temp
        })
        navigator.vibrate([100])
    }
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(dates)
    };

    const dispatch = useDispatch();
    const setTickets_ = (payload) => {
        return dispatch(setTickets(payload))
    }

    const skipOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 15, value: 15 },
        { label: 25, value: 25 },

    ]
    const token = localStorage.getItem("admin_token");

    const url = `${process.env.REACT_APP_LOCAL_URL}/admin/alltickets`
    const sortOpions = [
        { label: "all", value: "null" },
        { label: "today", value: 1 },
        { label: "yesterday", value: 2 },
        { label: "last week", value: 7 },
        { label: "last month", value: 31 },

    ]
    useEffect(() => {
        fetchData()
    }, [params])
    const [numberOfPages, setNumberOfPages] = useState()
    const checkPages = (index) => {
        const temp = params;
        if (temp.page === index) {
            return
        }
        temp.page = index
        setParams({
            ...temp
        })

    }

    async function fetchData() {
        setIsActiveIndexLoading(true);
        // alert("enter here")
        try {

            const response = await axios.get(url, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
                params
            })
            setTickets_([...response?.data?.tickets])
            setActiveTicketCount(response?.data?.totalActiveTickets);
            setTotalTickets(response?.data?.totalTickets);
            setNumberOfPages(response?.data?.numberOfPages)
        } catch (err) {
            console.log(err);
        }
        setIsActiveIndexLoading(false)

    }
    // useEffect(() => {
    //     fetchData()

    // }, [])


    return (
        <div className="max-w-full h-[calc(100vh-3rem)] overflow-auto" >

            {isLoading && (<Loader toggle dark />)}

            <div className=" md:flex  justify-between items-start">
                <h1 className='text-2xl text-center mt-6'>Book tickets</h1>
                <div className="flex flex-col mx-auto justify-center  items-center">
                    <h2 className='uppercase text-lg md:text-lg mb-4'>Filter Data By</h2>
                  
                    <AnimatePresence>
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
                            <span className='max-w-[min(calc(100%-2.5rem),400px)]
            flex items-center
            justify-center
            mb-10 pb-2 px-8
            text-medium
            pt-1.5 font-medium rounded-sm
            text-gray-200
            shadow-2xl
             mx-auto bg-blue-600 mt-4  rounded-4'

                            >  {isLoading ? <Loadingbtn toggle /> : "Filter Tickets"}</span>
                        </motion.div>
                    </AnimatePresence>
                </div>


            </div>

            <Scrollable className={"!px-5"}>
                <TicketCounts counts={totalTickets}
                    text={"Total Number Of Tickets"}
                    icon={<AiOutlineSave />} />
                <TicketCounts counts={activeTicketCount}
                    text={"Total Number Of active Tickets"}

                    icon={<VscFolderActive />} />
                <TicketCounts
                    text={"Total Number Of Inactive Tickets"}
                    counts={totalTickets - activeTicketCount} icon={<BiCategory />} />
            </Scrollable>
            <Scrollable className={"!px-5"}>
                <AmountCount
                    className="!bg-blue-400"
                    text="Total coset of all tickets"
                    icon={<MdOutlinePriceChange />}
                    amount={totalTickets * 6500} />
                <AmountCount
                    className="!bg-green-400"

                    text="Total coset of all active tickets"

                    icon={<BiCategory />} amount={activeTicketCount * 6500} />
                <AmountCount
                    className="!bg-red-400 !text-black"

                    text="Total coset of all inactive tickets"

                    icon={<BiCategory />} amount={(totalTickets - activeTicketCount) * 6500} />
            </Scrollable>
            <div className="my-10" />
            {/* 
            <form className="px-4 md:px-3 my-5 " onSubmit={handleSubmit}>
                <div className="flex relative min-h-[40px]">
                    <Select options={options} onChange={e => setOption(e.value)} required />
                    <div className="relative w-full">
                        <input type="search" ref={text} id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Email address ,phone number,names etc " required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form> */}
            <div className='w-[min(calc(100%-2.5rem),20rem)] ml-auto'>

                <SkipSelect options={skipOptions}
                    onChange={handleSkipChange} />

            </div>



            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Index
                            </th>
                            <th scope="col" className="px-3 py-3">
                                full name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-3 py-3">
                                price
                            </th>
                            <th scope="col" className="px-3 py-3">
                                from
                            </th>
                            <th scope="col" className="px-3 py-3">
                                to
                            </th>
                            <th scope="col" className="px-3 py-3">
                                date
                            </th>
                            <th scope="col" className="px-3 py-3">
                                time
                            </th>
                            <th scope="col" className="px-3 py-3">
                                status
                            </th>
                            <th scope="col" className="px-3 py-3">
                                age
                            </th>
                            <th scope="col" className="px-3 py-3">
                                sex
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <FormatTable tickets={tickets_}
                        skip={params.limit}
                        currentPage={params.page} />
                </table>
            </div>
            <div className='mt-10 ' />
            <Scrollable className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto">
                {Array.from({
                    length: numberOfPages
                }, (text, index) => {
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
        </div>
    )

}

export default Appointment