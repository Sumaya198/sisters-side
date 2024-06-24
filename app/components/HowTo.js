// app/components/HowToSection.js
import React from 'react';
import styles from './HowToSection.module.css';

const HowTo = () => {
  return (
    <section className={styles.howToSection}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>Service We Provide</h2>
          <button className={styles.discoverButton}>Discover</button>
        </div>
        <div className={styles.services}>
          <div className={styles.serviceCard}>
            <div className={styles.icon}><img src="/path/to/icon1.png" alt="Conceptual Design" /></div>
            <h3>Conceptual Design</h3>
            <p>Paradisematic country, in which roasted parts of sentences fly.</p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.icon}><img src="/path/to/icon2.png" alt="Design Development" /></div>
            <h3>Design Development</h3>
            <p>Even the all-powerful Pointing has no control about the blind texts.</p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.icon}><img src="/path/to/icon3.png" alt="Contract Documents" /></div>
            <h3>Contract Documents</h3>
            <p>One day however a small line of blind text by the name of Lorem.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTo;
