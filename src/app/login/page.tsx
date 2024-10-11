'use client';

import { FormEvent, useState } from 'react';
import { login } from './action';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '@/lib/features/authSlice';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const { user, error } = await login(formData);

    if (error) {
      setError(error);
    } else {
      dispatch(addUser(user));
      router.push('/');
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h3 className="text-3xl font-bold text-center text-gray-800">Log In</h3>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full py-3 text-white bg-blue-600 font-semibold rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50">
          Log In
        </button>
        {/* 
            
            {error && (
              <div className="p-3 bg-red-100 border border-red-500 text-red-600 rounded-md text-center">
                {error}
              </div>
            )}
            {isLoading && <Loader />}
            */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-500 text-red-600 rounded-md text-center">
            {error}
          </div>
        )}
        <p className="text-gray-600 text-center text-sm mt-4">
          If you are new,{' '}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
