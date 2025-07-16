import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { sidebarLinks } from '../../constants/index'
import '../../app/globals.css'
const LeftSidebar = () => {
  return (
    <section className='custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden'>
      <div className='flex w-full flex=1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => (
          <Link
            key={link.label}
            href={link.route}
            className='relative flex justify-start gap-4 rounded-lg p-4'>
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                />
                <span className=' text-white max-lg:hidden'>{link.label}</span>
            </Link>
        ))}
      </div>
    </section>
  )
}

export default LeftSidebar