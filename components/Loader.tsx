import React from "react";
import styles from "@/styles/Loader.module.css";
import { LoadingIndicatorProps } from "@/types";

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loadingText }) => (
  <div className={`flex flex-col ${styles["loader-container"]}`}>
    <div className={styles.spinner}></div>
    <p className="mt-3">{loadingText}</p>
  </div>
);

export default LoadingIndicator;
