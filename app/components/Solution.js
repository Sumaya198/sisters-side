import React from 'react';

import { AiOutlineWoman } from "react-icons/ai";
import { MdSwitchAccessShortcut } from "react-icons/md";
import { GiElevator } from "react-icons/gi";
import { FaWheelchair } from "react-icons/fa";

import styles from './Solution.module.css';

const Solution = () => {
  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h1 className={styles.accessbilityTitle}>Share what sisters' want to know</h1>
      </div>
      <div className={styles.tiles}>
        <div className={styles.tile}>
          <div className={styles.number}>01</div>
          <div className={styles.icon}><AiOutlineWoman /></div>
          <div className={styles.text}>availability of a sister's side</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.number}>02</div>
          <div className={styles.icon}><MdSwitchAccessShortcut /></div>
          <div className={styles.text}>wudu area with handrails</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.number}>03</div>
          <div className={styles.icon}><GiElevator /></div>
          <div className={styles.text}>Cleanliness </div>
        </div>
        <div className={styles.tile}>
          <div className={styles.number}>04</div>
          <div className={styles.icon}><FaWheelchair /></div>
          <div className={styles.text}>wheel-chair accessibility</div>
        </div>
      </div>
    </div>
  )
}

export default Solution
