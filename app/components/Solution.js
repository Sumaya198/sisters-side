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
        <h1 className={styles.accessbilityTitle}>TALK ABOUT ACCESSIBILITY RELATING TO SISTER'S SIDE...</h1>
      </div>
      <div className={styles.tiles}>
        <div className={styles.tile}>
          <div className={styles.number}>01</div>
          <div className={styles.icon}><AiOutlineWoman /></div>
          <div className={styles.text}>Includes A Female Area</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.number}>02</div>
          <div className={styles.icon}><MdSwitchAccessShortcut /></div>
          <div className={styles.text}>Wudu Area With Handrails</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.number}>03</div>
          <div className={styles.icon}><GiElevator /></div>
          <div className={styles.text}>Includes A Lift</div>
        </div>
        <div className={styles.tile}>
          <div className={styles.number}>04</div>
          <div className={styles.icon}><FaWheelchair /></div>
          <div className={styles.text}>Wheelchair Accessbility</div>
        </div>
      </div>
    </div>
  )
}

export default Solution
