import React from 'react';
import styles from './LoadingComponent.module.css';
import { FourSquare } from "react-loading-indicators";

const LoadingComponent = () => {
    return (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingWrapper}>
            <FourSquare color="#D62828" size="medium" text="Loading" textColor="" />
          </div>
        </div>
      );
};

export default LoadingComponent;