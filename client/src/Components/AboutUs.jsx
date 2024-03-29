import React from 'react'

export default function AboutUs() {
  return (
    <div className="pt-20 md:pt-0 w-full h-[78vh] flex flex-col justify-center items-center text-light-4 shadow-light-1">
      <h1 className='mb-14 font-extrabold text-2xl leading-relaxed'>
        Welcome to our Expense Tracker
      </h1>
      <p className='w-[75%] shadow-xl p-8 font-extrabold text-sm leading-relaxed bg-[#eee] sm:text-base md:text-lg xl:text-xl'>
         A web tool designed to make managing your finances easy and efficient. In a world where online shopping has become a predominant habit, especially after the impact of COVID-19, we recognize the need for a resource that helps individuals effortlessly track their expenses and gain insights into their financial positions. Our platform is dedicated to everyone, providing a user-friendly experience to monitor spending patterns and align them with personal income. Receive weekly email summaries to keep a close eye on your financial transactions and benefit from our monthly bar charts that offer a visual representation of your budgeting journey. Empower yourself with financial awareness and take control of your expenses with our intuitive Expense Tracker.</p>
    </div>
  )
}
