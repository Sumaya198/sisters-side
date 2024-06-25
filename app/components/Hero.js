import React from 'react';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import About from './About';
import HowTo from './HowTo';
import Footer from './Footer';
import Solution from './Solution';

import styles from './Hero.module.css'; // Import the CSS module

const Hero = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
      <>
    <motion.div 
      className={styles.hero}
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 5, ease: 'easeInOut' }}
    >
      <motion.div 
        className={styles.heroContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        {session ? (
          <h1 className={styles.heroTitle}>Welcome to Sister's Side, {session.user.name}!</h1>
        ) : (
          <h1 className={styles.heroTitle}>Welcome to Sister's Side</h1>
        )}
        <h3 className={styles.heroSubTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</h3>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        >
          <Link href="/search" className={styles.button}>Explore Masjids</Link>
        </motion.div>
      </motion.div>
    </motion.div>
    <About />
    <Solution />
    <HowTo />
    <Footer />
    </>
  );
};

export default Hero;
