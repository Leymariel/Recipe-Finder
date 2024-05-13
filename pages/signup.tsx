'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../utils/firebaseConfig';
import React from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error('Error signing up:', error);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setError('Email already in use');
        } else if (error.code === 'auth/invalid-email') {
          setError('Invalid email address');
        } else if (error.code === 'auth/weak-password') {
          setError('Password is too weak');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('An unknown error occurred.');
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}