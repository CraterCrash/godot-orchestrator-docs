import React from 'react';
import styles from './styles.module.css';

export default function ExternalLink({children, href}) {
    // Style links differently if they're to Godot's documentation
    var classNames = styles.external;
    if (href.includes("godotengine")) {
        classNames = styles.godot;
    }
    else if (href.includes("github")) {
        classNames = styles.github;
    }
    return (
        <a href={href} className={classNames} target='_blank'>{children}</a>
    );
}