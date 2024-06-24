// app/components/Navbar.js
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import styles from './Navbar.module.css'; // Import the CSS module

const Navbar = () => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">Logo</Link>
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
                {menuOpen ? '✕' : '☰'}
            </div>
            <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
                <li><Link href="/" onClick={closeMenu}>Home</Link></li>
                <li><Link href="/search" onClick={closeMenu}>Search</Link></li>
                {session?.user.isAdmin && (
                    <li><Link href="/admin/dashboard" onClick={closeMenu}>Admin Dashboard</Link></li>
                )}
                {!session ? (
                    <>
                        <li><Link href="/auth/login" onClick={closeMenu}>Login</Link></li>
                        <li><Link href="/auth/register" onClick={closeMenu}>Register</Link></li>
                    </>
                ) : (
                    <li><button onClick={() => { signOut(); closeMenu(); }}>Sign Out</button></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
