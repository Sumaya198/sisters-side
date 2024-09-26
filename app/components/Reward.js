import React from 'react'
import Link from 'next/link'
import styles from './Reward.module.css'

const Reward = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>Tell us about the sisters' side of your local masjid or a masjid you have visited</h1>
        <hr className={styles.underline}/>
        <div className={styles.buttonContainer}>
        <Link href='/search' className={styles.discoverButton}>Leave a review</Link>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src="/tell-us-section.png" alt="Masjid" className={styles.image} />
      </div>
    </div>
  )
}

export default Reward
