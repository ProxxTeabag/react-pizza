import React from 'react'
import styles from "./NotFoundBlock.module.css"

 export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
        <h1>
        <span>AAAAA</span>
        <br />
        Ничего не найдено
        </h1>
        <p className={styles.description}>К сожалению данная стринца отсутствует в нашем магазине</p>
    </div>
  )
}
