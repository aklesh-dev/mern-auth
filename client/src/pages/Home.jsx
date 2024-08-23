import React from 'react'
import videoFile from '../assets/DataProtection.mp4';

const Home = () => {
  return (
    <section className="max-w-6xl mx-auto py-6 px-4">
      <h1 className="font-bold font-serif text-center  text-2xl underline uppercase">Welcome this is an authentication app</h1>
      <div className=" flex max-lg:flex-col mx-auto mt-5 gap-4">
        <div className="px-4 mx-5">
          <p className="mb-4 text-slate-700">
            This is a full-stack web application built with the MERN-stack. It includes authentication features that allow users to sign-up, sign-in and sign-out and provides access to protected routes only for authenticated users.
          </p>
          <p className="mb-4 text-slate-700">
            The frontend of the application is built with React and uses React-router for client-side routing. The backend is built with Nodejs and Expressjs and MongoDB as the database. Authentication is implemented using JSON Web Tokens (JWT).
          </p>
          <p className="text-slate-700 mb-4">
            MERN-Auth project demonstrates a robust and scalable authentication system that incorporates Google Sign-in, Firebase Storage, and Redux Toolkit, making it an ideal solution for building modern web applications.
          </p>
        </div>
        <video
          src={videoFile}
          typeof="video/mp4"
          autoPlay
          loop          
          className="w-2/3 h-2/3 mx-auto"
        />
      </div>

    </section>
  )
}

export default Home;