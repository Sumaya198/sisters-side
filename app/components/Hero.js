import React from 'react';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import About from './About';
import HowTo from './HowTo';
import Footer from './Footer';
import Solution from './Solution';

import styles from './Hero.module.css'; // Import the CSS module
import Navbar from './Navbar';
import Reward from './Reward';

const Hero = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
      <>
      <Navbar />
    <div 
      className={styles.hero}
    >
      <motion.div 
        className={styles.heroContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        {session ? (
          <>

         
          <h1 className={styles.heroTitle}>Looking for the Sisters' Side?</h1>
          </>
        ) : (
          <h1 className={styles.heroTitle}>Looking for the Sisters' Side? </h1>
         
        )}
        <h3 className={styles.heroSubTitle}>The essential guide to finding a space to worship without hindrance -- no matter where you are.</h3>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        >
          <Link href="/search" className={styles.button}>Explore Masjids</Link>
        </motion.div>
      </motion.div>
    </div>
    <About />
    <Solution />
    <Reward />
    <HowTo />
    <Footer />
    </>
  );
};

export default Hero;
