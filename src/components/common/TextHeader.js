import React from 'react';
import { FONT_HEADER } from '../../config';

const TextHeader = ({ style, children, fontWeight }) => {
    return (
        <span style={{ fontSize: FONT_HEADER, fontWeight, ...style }}>
            {children}
        </span>
    );
};

export { TextHeader };
