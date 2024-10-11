'use client';

import { removeUser } from '@/lib/features/authSlice';
import { RootState } from '@/lib/store';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  //   const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const user = {
    name: 'rohan',
    emai: 'rohan@gmail.com',
  };
  const username = 'Rohan';
  const router = useRouter();
  const supabase = createClient();
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log('failed to logout');
      } else {
        dispatch(removeUser());
        router.push('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 md:px-8 flex flex-col md:flex-row justify-between md:items-center shadow-lg gap-4">
      <div className="flex items-center">
        <img
          src="https://png.pngtree.com/png-vector/20200121/ourmid/pngtree-financial-consulting-logo-vector-template-png-image_2132677.jpg"
          alt="Logo"
          className="h-10 w-10 mr-3 rounded-full"
        />
        <span className="text-white text-xl font-semibold">
          Financial Dashboard
        </span>
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <span className="text-white text-base mr-4 font-medium">
              Hello, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href={'/login'}>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
