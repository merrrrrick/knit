import React from 'react'
import '../../app/globals.css'
const RightSidebar = () => {
  return (
    <>
    <section className='custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-white bg-black px-10 pb-6 pt-28 max-xl:hidden'>
      <div className='flex flex-col flex-1 justify-start'>
        <h3 className='text-heading4-medium text-white'>Suggested Communities</h3>
      </div>
      <div className='flex flex-col flex-1 justify-start'>
        <h3 className='text-heading4-medium text-white'>Suggested Users</h3>
      </div>
    </section>
    </>
  )
}

export default RightSidebar