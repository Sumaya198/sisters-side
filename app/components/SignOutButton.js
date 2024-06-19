// components/SignOutButton.js
'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const SignOutButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return null; // Don't show the sign-out button if the user is not logged in
  }

  return (
    <button onClick={() => signOut({ callbackUrl: '/' })}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
