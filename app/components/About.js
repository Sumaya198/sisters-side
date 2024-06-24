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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
      }}
    >
      <div className={styles.imageSection}>
        <img
          src="https://images.pexels.com/photos/1287083/pexels-photo-1287083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="About Image"
          className={styles.aboutImage}
        />
      </div>
      <div className={styles.textSection}>
        <h2 className={styles.aboutHeader}>ABOUT</h2>
        <h1 className={styles.mainHeader}>Highest Quality Exterior Design</h1>
        <p className={styles.subHeader}>
          Sky was of a deep dark blue spectacle before us was indeed sublime.
        </p>
        <p className={styles.description}>
          It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
          Even the all-powerful Pointing has no control about.
        </p>
        <button className={styles.aboutButton}>About Us</button>
      </div>
    </motion.div>
  );
};

export default About;
