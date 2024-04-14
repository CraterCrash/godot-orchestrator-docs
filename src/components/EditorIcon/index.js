import React from 'react';
import styles from './styles.module.css';

export default function EditorIcon({children, name}) {
    const baseUrl = "https://raw.githubusercontent.com/godotengine/godot/master/editor/icons/";
    return ( <div className={styles.editorIconContainer}><img className={styles.editorIcon} src={`${baseUrl}${name}.svg`}></img></div> );
}