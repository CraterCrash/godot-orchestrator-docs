import React from 'react';
import styles from './styles.module.css';

export default function Figures({children}) {
    return (
        <div className={styles.figures}>{children}</div>
    );
}