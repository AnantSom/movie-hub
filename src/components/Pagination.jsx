import React from "react";

function Pagination({ handlePrev, handleNext, pageNo }) {
  return (
    <div className='bg-gray-100 p-4 mt-8 flex justify-center items-center rounded-md shadow-md space-x-4'>
      <button
        aria-label='Previous page'
        onClick={handlePrev}
        disabled={pageNo <= 1}
        className='bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-50 px-4 py-2 rounded-md hover:bg-blue-600 transform hover:scale-105 duration-300 flex items-center space-x-2'
      >
        <i className='fa-solid fa-arrow-left-long'></i>
        Prev
      </button>

      <span className='font-semibold text-lg'>{pageNo}</span>

      <button
        aria-label='Next page'
        onClick={handleNext}
        className='bg-blue-500 text-gray-50 px-4 py-2 rounded-md hover:bg-blue-600 transform hover:scale-105 duration-300 flex items-center space-x-2'
      >
        Next
        <i className='fa-solid fa-arrow-right-long'></i>
      </button>
    </div>
  );
}

export default Pagination;
