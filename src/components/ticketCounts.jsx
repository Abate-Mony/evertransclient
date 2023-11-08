
const ticketCounts = ({ counts, icon, text, className }) => {
    return (
        <div
            className={`
            ${className}
            placeholder:shadow-lg 
            
            dark:shadow-sm
            dark:bg-slate-900
            dark:text-white
            dark:shadow-black
            shadow-slate-300 flex-none  
    flex relative
    gold:bg-[var(--color-primary)]
    group
    bg-white 
    py-6 mb-4   
    overflow-hidden 
    px-8 rounded-none`}>
            <div className="absolute top-0 h-1 w-0 left-0 transition-[width] bg-green-400 duration-700 group-hover:w-full"></div>
            <div className="w-10 h-10 rounded-full
   grid place-content-center
   bg-blue-300 hover:bg-blue-200  overflow-hidden">
                {icon}
            </div>
            <div className="ml-2">
                <h1 className="font-semibold  text-lg 
                
            dark:text-white
                
                leading-none mb-1">{counts}</h1>

                <p className='text-sm font-montserrat
            dark:text-white
                    
                    text-gray-500 font-medium '>{text || "no information was passed!!"}</p>
            </div>
        </div>
    )
}

export default ticketCounts