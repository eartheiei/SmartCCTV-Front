import React from 'react';

const Row = ({ children, style }) => {
    return (
        <div style={{ flexDirection: 'row', ...style }}>
            {children}
        </div>
    );
};

export { Row };
