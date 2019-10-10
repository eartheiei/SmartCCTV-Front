import React from 'react';

const Center = ({ children, style, notHorizontal, notVertical, }) => {
    return (
        <div
            style={{ 
                justifyContent: notVertical ? 'flex-start' : 'center', 
                alignItems: notHorizontal ? 'flex-start' : 'center', 
                ...style 
            }}
        >
            {children}
        </div>
    );
};

export { Center };