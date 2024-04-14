import React from 'react';
import OriginalMDXComponents from '@docusaurus/theme-classic/lib/theme/MDXComponents';
import ConnectionColor from '@site/src/components/ConnectionColor';
import Figure from '@site/src/components/Figure';
import Figures from '@site/src/components/Figures';
import EditorIcon from '@site/src/components/EditorIcon';
import ExternalLink from '@site/src/components/ExternalLink';

export default function MDXComponents(components) {
    return {
        ...OriginalMDXComponents,
        // Add custom components here
        ConnectionColor,
        Figure,
        Figures,
        EditorIcon,
        ExternalLink,
    };
};