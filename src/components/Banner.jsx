import React from 'react'

function Banner() {
  return (
    <div className='h-[10vh] md:h-[105vh] bg-cover bg-center flex items-end' style={{backgroundImage : `url(https://assets-in.bmscdn.com/discovery-catalog/events/et00078940-zfnjmksnuw-landscape.jpg)`}}>
        <div className='text-white text-2xl text-center w-full bg-gray-900/60 p-4'>LUKA CHUPPI</div>
    </div>
  )
}

export default Banner