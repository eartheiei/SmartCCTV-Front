import React from 'react';
import { FONT_SIZE } from '../../config';

const TextContent = ({ children, style }) => {
    return (
        <span
            style={{ fontSize: FONT_SIZE, ...style }}
        >
            {children}
        </span>
    );
};

export { TextContent };