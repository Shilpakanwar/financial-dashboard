'use client';

import { FormEvent, useState } from 'react';
import { signup } from '../login/action';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addUser } from '@/lib/features/authSlice';

const Signup = () => {
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);

    const { user, error } = await signup(formData);

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
        <h3 className="text-3xl font-semibold text-center text-gray-800">
          Signup
        </h3>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          Signup
        </button>
        {error && (
          <div className="p-3 bg-red-100 border border-red-500 text-red-600 rounded-md text-center">
            {error}
          </div>
        )}
        <p className="text-gray-600 text-center text-sm mt-4">
          If already signed up,{' '}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login here
          </Link>
        </p>

        {/* 
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-500 text-red-600 rounded-md text-center">
              {error}
            </div>
          )}
          {isLoading && <Loader />}
          */}
      </form>
    </div>
  );
};

export default Signup;
