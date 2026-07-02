import React from 'react';
import styles from './styles.module.css';

export default function EditorIcon({children, name, color}) {
    const baseUrl = "https://raw.githubusercontent.com/godotengine/godot/master/editor/icons/";
    const src = `${baseUrl}${name}.svg`;

    // When a color is supplied, use the SVG as a mask and paint it with the
    // requested color (replaces the icon's own colors, similar to modulate).
    if (color) {
        const maskUrl = `url(${src})`;
        return (
            <div className={styles.editorIconContainer}>
                <span
                    className={styles.editorIconMasked}
                    style={{
                        backgroundColor: color,
                        maskImage: maskUrl,
                        WebkitMaskImage: maskUrl,
                    }}
                />
            </div>
        );
    }

    return ( <div className={styles.editorIconContainer}><img className={styles.editorIcon} src={src}></img></div> );
}