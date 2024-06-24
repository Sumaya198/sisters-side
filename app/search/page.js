// app/page.js
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import SearchForm from '../components/SearchForm';
import Link from 'next/link';

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SearchForm />
    </div>
  );
};

export default Home;
