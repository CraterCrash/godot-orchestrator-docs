import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css';

export default function Figure({children, image, caption}) {
    var fullUrl = useBaseUrl(`${image}`);
    return (
        <div className={styles.figure}>
            <a href={fullUrl} target='_blank' title={caption}>
            <figure>
                <img src={fullUrl} alt={caption} />
                <figcaption>{caption}{children}</figcaption>
            </figure>
            </a>
        </div>
    );
}