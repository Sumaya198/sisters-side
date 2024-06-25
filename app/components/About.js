import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  const controls = useAnimation();
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          controls.start('visible');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, [controls]);

  return (
    <motion.div
      className={styles.aboutContainer}
      ref={aboutRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 35 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.8 } }
      }}
    >
      <div className={styles.imageSection}>
        <img
          src="/about-page.jpg"
          alt="About Image"
          className={styles.aboutImage}
        />
      </div>
      <div className={styles.textSection}>
        <h2 className={styles.aboutHeader}>ABOUT</h2>
        <h1 className={styles.mainHeader}>Text About Sisters Side</h1>
        <p className={styles.subHeader}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
