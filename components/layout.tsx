import Link from 'next/link';
import React from 'react';
import styles from './Layout.module.css';  // Ensure the path is correct if you're using CSS modules

const Layout = ({ children }) => {
  return (
    <div>
      <header className={`${styles.header} bg-white shadow`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className={`${styles.navLogo} text-2xl font-bold text-green-600`}>
              Recipe Finder
            </Link>
            <div className="flex space-x-4">
              <Link href="#search" className={`${styles.navLinks} text-gray-600 hover:text-green-600`}>
                Search
              </Link>
              <Link href="#favorites" className={`${styles.navLinks} text-gray-600 hover:text-green-600`}>
                Favorites
              </Link>
              <Link href="/login" className={`${styles.navLinks} text-gray-600 hover:text-green-600`}>
                Login
              </Link>
              <Link href="/signup" className={`${styles.navLinks} text-gray-600 hover:text-green-600`}>
                Signup
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      <footer className={`${styles.footer} bg-white shadow mt-8`}>
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
