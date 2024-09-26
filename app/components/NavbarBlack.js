'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from './NavbarBlack.module.css'; // Import the CSS module

const NavbarBlack = () => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.logo}>
                <Link href="/">SS</Link>
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
                {menuOpen ? '✕' : '☰'}
            </div>
            <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
                <li className={styles.homeLink}><Link href="/" onClick={closeMenu}>Home</Link></li>
                <li className={styles.homeLink}><Link href="/search" onClick={closeMenu}>Search</Link></li>
                {session?.user.isAdmin && (
                    <li><Link href="/admin/dashboard" onClick={closeMenu}>Admin Dashboard</Link></li>
                )}
                {!session ? (
                    <>
                        <li><Link className={styles.login} href="/auth/login" onClick={closeMenu}>Login</Link></li>
                        <li><Link className={styles.register} href="/auth/register" onClick={closeMenu}>Register</Link></li>
                    </>
                ) : (
                    <li><Link className={styles.login} href="" onClick={() => { signOut(); closeMenu(); }}>Sign Out</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default NavbarBlack;
