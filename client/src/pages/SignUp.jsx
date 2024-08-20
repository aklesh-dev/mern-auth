import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <section className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-2xl text-center my-5">Sign Up</h1>
      <form className='flex flex-col gap-4' >
        <input type="text" placeholder='Username' id='username' className='p-2 bg-slate-200 rounded-lg' />
        <input type="email" placeholder='Email' id='email' className='p-2 bg-slate-200 rounded-lg' />
        <input type="password" placeholder='Password' id='password' className='p-2 bg-slate-200 rounded-lg' />
        <button className="bg-slate-800 text-white p-3 rounded-xl uppercase hover:opacity-90 disabled:opacity-80" >sign up</button>
      </form>
      <div className=" flex gap-3 mt-5">
        <p>Already have an account ?</p>
        <Link to='/sign-in'>
        <span className="text-blue-600 hover:opacity-90">Sign in</span>
        </Link>
      </div>
    </section>
  )
}

export default SignUp