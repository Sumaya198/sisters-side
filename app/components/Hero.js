import React from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css'; // Import the CSS module
import Link from 'next/link';

const Hero = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.hero}>
      <motion.div 
        className={styles.heroContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        {session ? (
          <h1>Welcome to Sister's Side, {session.user.name}!</h1>
        ) : (
          <h1>Welcome to Sister's Side</h1>
        )}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        >
          <Link href="/search" className={styles.button}>Get Started</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
