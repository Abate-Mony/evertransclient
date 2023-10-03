import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BsBusFront } from "react-icons/bs"
import { MdOutlineForwardToInbox } from "react-icons/md"
import Heading from './Headings'
export default function OurServices() {
  const slideUp = {
    initial: {
      y: 100, opacity: 0
    },
    animate: {
      y: 0, opacity: 100,
      transition: {
        duration: 0.5
      }

    }

  }
  const slideRight = {
    initial: {
      translateX: 100, opacity: 0
    },
    animate: {
      translateX: 0, opacity: 100,
      transition: {
        duration: 0.5
      }

    }

  }
  const Service = ({ index, text, title, icon: Icon }) => {
    return (
      <motion.div
        style={{
          transformOrigin: "bottom"
        }}
        whileHover={{
          scale: 0.9,
          transition: {
            duration: 0.3
          }
        }}
        initial={{
          y: index & 1 ? 100 : 50,
          opacity: 0
        }}
        whileInView={{ y: 0, opacity: 100 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: 1, mass: 20 + (index * 5), stiffness: "spring"
        }}

        className='p-2 rounded-md border cursor-pointer  ppt  bg-gradient-to-b from-[#a204f4]  to-[#221c7f]'>
        <div className='bg-slate-200 text-center p-4 py-10'>
          <div className='w-fit mx-auto mb-5'>{Icon}</div>
          <Heading
            className="!text-[#181e76] !text-3xl !font-semibold"
            text={title}
          />
          {text}
        </div>
      </motion.div>

    )
  }

  return (

    <div className=" lg:px-10 overflow-x-hidden px-6  text-black text-lg py-24 md:text-xl lg:text-xl bg-white" id="#ourservices">
      <Heading className="text-center !text-black"
        text="OUR SERVICES"
      />
      <motion.h1
        variants={slideUp}
        viewport={{ once: true, amount: 0.8 }}
        initial="initial"
        whileInView="animate"
        className='text-center text-4xl text-[#181e76] lg:text-5xl font-semibold'
      >We Provide Best Services For You</motion.h1>
      <motion.p

        variants={slideRight}
        viewport={{ once: true, amount: 0.6 }}

        initial="initial"
        whileInView="animate"
        className='text-center my-3 pt-3 leading-snug max-w-3xl mx-auto'
      >
        At  the heart of Arriva is an ambition to make passenger
        transport the best choice as we look to connect people with our
        local communities to all the things that are important
        to them -safety,reliably,and sustainably
      </motion.p>

      <div
        className='grid  py-10        grid-cols-[repeat(auto-fit,minmax(min(25rem,calc(100%-20px)),1fr))]
        gap-x-4
        gap-y-6'

      >
        <Service index={1}
          icon={<BsBusFront
            size={30}
          />}
          title="Bus Booking"
          text="Our bus bookjing service herlo ot "
        />
        <Service index={1}
          icon={<MdOutlineForwardToInbox
            size={30}
          />}
          title="Mailing Services"
          text="Our bus bookjing service herlo ot "
        />
        <Service index={1}

          title="Bus Booking"
          text="Our bus bookjing service herlo ot "
        />


      </div>
    </div>


  )
}

