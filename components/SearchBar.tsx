import React from 'react';
import styles from '@/styles/styles.module.css';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBars}>
      <img src='assets/search.png' alt="Search" className={styles.searchIcons} />
      <input type="text" className={styles.searchInputs} />
    </div>
  );
};

export default SearchBar;