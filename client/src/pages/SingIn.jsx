import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page from refresh, while submitting the form
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      setLoading(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  }

  return (
    <section className="p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-2xl text-center my-5">Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input onChange={handleChange} type="email" placeholder='Email' id='email' className='p-2 bg-slate-200 rounded-lg' />
        <input onChange={handleChange} type="password" placeholder='Password' id='password' className='p-2 bg-slate-200 rounded-lg' />
        <button disabled={loading} className="bg-slate-800 text-white p-3 rounded-xl uppercase hover:opacity-90 disabled:opacity-80" >{loading ? 'logging...' : 'sign in'}</button>
      </form>
      <div className=" flex gap-3 mt-5">
        <p>Don't have an account ?</p>
        <Link to='/sign-up'>
          <span className="text-blue-600 hover:opacity-90">Sign up</span>
        </Link>
      </div>
      <p className="text-red-500">{error && 'Something went wrong!!'}</p>
    </section>
  )
}

export default SignIn