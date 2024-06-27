import React from 'react'
import Link from 'next/link'
import styles from './Reward.module.css'

const Reward = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>TELL US ABOUT YOUR<br />LOCAL MASJID OR<br />A MASJID YOU VISITED</h1>
        <hr />
        <p>Gain reward by making life easier for others<br />by sharing valuable information about masjid accessibility</p>
        <div className={styles.buttonContainer}>
        <Link href='/search' className={styles.discoverButton}>Explore Masjids</Link>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src="/reward-image.jpg" alt="Masjid" className={styles.image} />
      </div>
    </div>
  )
}

export default Reward
