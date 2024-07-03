import React from 'react'
import styles from "./NotFoundBlock.module.css"

 const NotFoundBlock = () => {
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

export default NotFoundBlock