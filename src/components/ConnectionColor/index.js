import React from 'react';
import styles from './styles.module.css';

export default function ConnectionColor({children, color}) {
    return (
        <div className={styles.dot} style={{backgroundColor: color}}>
            <span className={styles.tooltip}>{color}</span>
        </div>
    );
}