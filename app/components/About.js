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
          src="/about-section-new.png"
          alt="About Image"
          className={styles.aboutImage}
        />
      </div>
      <div className={styles.textSection}>
        <h2 className={styles.aboutHeader}>ABOUT</h2>
        <h1 className={styles.mainHeader}>What is Sisters' Side?</h1>
        <p className={styles.subHeader}>
        Sisters' Side is a resource guide for Muslim women to find a comfortable, accessible and suitable space to pray. As an avid traveler, it was difficult to know beforehand if a masjid had a women's side or if it was even accessible. The difficulties of finding an adequate space to pray sparked the idea for Sister's Side. The goal of this platform is to help Muslim women find a space to worship without hindrance and build an empowered community of reviewers.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
