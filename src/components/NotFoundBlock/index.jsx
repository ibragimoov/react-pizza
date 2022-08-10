import React from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span>
        <br />
        Ничего не найдено :(
      </h1>
      <p className={styles.desc}>Данная страница отсутствует в приложении</p>
    </div>
  );
};

export default NotFoundBlock;
