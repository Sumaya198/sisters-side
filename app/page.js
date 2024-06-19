// app/page.js
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import SearchForm from './components/SearchForm';
import Link from 'next/link';

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <header>
        <h1>Mosque Reviews</h1>
        <div>
          {session ? (
            <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
          ) : (
            <>
              <button onClick={() => signIn('credentials', { callbackUrl: '/' })}>Log In</button>
              <Link href="/auth/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </header>
      {session ? (
        <p>Welcome, {session.user.name}!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
      <SearchForm />
    </div>
  );
};

export default Home;
