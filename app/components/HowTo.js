// app/components/HowToSection.js
import React from 'react';

import { CiLogin } from "react-icons/ci";
import styles from './HowToSection.module.css';
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import Link from 'next/link';

const HowTo = () => {
  return (
    <section className={styles.howToSection}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>How It works</h2>
          <Link href='/search' className={styles.discoverButton}>Explore</Link>
        </div>
        <div className={styles.services}>
          <div className={styles.serviceCard}>
            <div className={styles.icon}><CiLogin /></div>
            <h3>Log in</h3>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.icon}><MdOutlineExplore /></div>
            <h3>Explore Masjid</h3>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.icon}><MdOutlineRateReview /></div>
            <h3>Leave a review</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTo;
