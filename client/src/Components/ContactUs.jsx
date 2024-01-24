import React, { useState } from "react";

export default function ContactUs() {
  const [email , setEmail] = useState('')
  const [name , setName] = useState('')
  const [body , setBody] = useState('')
  return (
    <div className="w-full h-[87vh] flex flex-col justify-start items-center">
      <h1
        className="text-5xl font-bold text-gray-900
      sm:text-4xl md:text-4xl lg:text-6xl
      "
      >
        Contact Us
      </h1>
      <p
        className="mt-4 max-w-2xl text-lg text-light-4 
      dark:text-white sm:text-lg md:text-xl lg
      :text-4xl font-medium leading-normal"
      >
        We are always open to new opportunities. Feel free to reach out!
      </p>
      <form
        action="#"
        method="post"
        className="flex flex-wrap mt-1
        bg-light-4 dark:bg-dark-3 rounded-md shadow-md overflow-hidden w-full sm:w-
        9/12 md:w-1/2 lg:w-1/3
        "
      >
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          className="py-2 px-4 text-sm text-gray-500 m-2
          border focus:outline-none focus:ring-light-1
          focus:bg-light-3 dark:focus:bg-dark-1
          focus:border-light-3 dark:focus:ring-dark-1
          focus:text-light-1 dark:focus:text-dark-4
          dark:focus:border-dark-3 dark:bg-transparent block w-full
          sm:text-base md:text-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          className="py-2 px-4 mt-2 text-sm text-gray m-2
          500 border focus:outline-none focus:ring-light-1
          focus:bg-light-3 dark:focus:bg-dark-1
          focus:text-light-1 dark:focus:text-dark-4
          focus:border-light-3 dark:focus:ring-dark-1
          dark:focus:border-dark-3 dark:bg-transparent  block w-full"
        />
        <textarea
          rows={4}
          name="message"
          id="message"
          placeholder="Message"
          className="py-2 px-4 text-sm text-gray-500 m-2
          resize-vertical border mt-2
          focus:outline-none  focus:ring-light-1
          focus:border-light-3 dark:focus:ring-dark-1
          focus:bg-light-3 dark:focus:bg-dark-1
          focus:text-light-1 dark:focus:text-dark-4
          dark:focus:border-dark-3  dark:bg-transparent block w-full"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          />
        <button
          type="submit"
          className="py-2 mt-6 text-white text-bolder m-auto my-2 p-2
          bg-dark-4 hover:bg-dark-1 rounded-md
          focus:outline-none focus:ring-dark-4 hover:text-dark-4
          "
        >
          <a href={`mailto:${email}?subject=${name || ""}&body=${body || ""}`} >

          Send Message
          </a>
        </button>
      </form>
    </div>
  );
}
