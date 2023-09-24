import React from 'react'
import { Navbar } from '../Navbar'
import { Cards } from '../Cards'

export const TrainerPage = () => {
  // EJEMPLO DE ARRAY
  let cardsData =[{1:1}, {1:1}, {1:1}] 
  return (
    <div className='h-screen bg-zinc-950'>
      {/* <Navbar user={user}/> */}
      <div className="mx-auto p-2 grid max-2xl gap-x-8 gap-y-8 md:grid-cols-2 sm:mx-0 lg:max-w-none lg:grid-cols-3">
        {/* CARDS */}
        {cardsData.map((card) => (
          <Cards/>
      ))}
      </div>
    </div>
  )
}
