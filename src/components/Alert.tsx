import React from 'react'

interface AlertProps {
    type: string;
    text: string;
    show: boolean;
    }
const Alert = ({type, text, show}: AlertProps) => {
  return (
    <div className="absolute top-10 left-0 right-0 flex justify-center items-center">
        <div 
            className={`${type === 'danger' ? 'bg-red-800' : 'bg-blue-800'} p-2 text-indigo-100 leading-none z-10 rounded-full flex lg:inline-flex items-center space-x-2`} 
            role="alert"
        >
            <p
                className={`${type === 'danger' ? 'bg-red-500' : 'bg-blue-800'} uppercase font-semibold text-xs sm:text-sm px-2 py-1 rounded-full text-center`}
            >
                {type === 'danger' ? 'Failed' : 'Success'}
            </p>
            <p className="mr-2 text-left">{text}</p>
        </div>
    </div>
  )
}

export default Alert