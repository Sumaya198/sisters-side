'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/search">Search</Link>
                </li>
                {session?.user?.isAdmin && (
                    <li>
                        <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                )}
                {status === 'loading' ? (
                    <li>Loading...</li>
                ) : session ? (
                    <>
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </li>
                        <li>Welcome, {session.user.name}</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/auth/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
