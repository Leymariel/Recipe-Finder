import Link from 'next/link';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-green-600">Recipe Finder</Link>
            <div className="flex space-x-4">
              <Link href="#search" className="text-gray-600 hover:text-green-600">Search</Link>
              <Link href="#favorites" className="text-gray-600 hover:text-green-600">Favorites</Link>
              <Link href="/login" className="text-gray-600 hover:text-green-600">Login</Link>
              <Link href="/signup" className="text-gray-600 hover:text-green-600">Signup</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      <footer className="bg-white shadow mt-8">
        <div className="container mx-auto px-6 py-4">
          <div className="text-center text-gray-600">
            &copy; 2023 Recipe Finder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
