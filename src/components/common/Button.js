import React from 'react';
import { Center } from './Center';
import { TextContent } from './TextContent';

const Button = ({ onClick, children, style, color, backgroundColor}) => {
    return (
        <div
            onClick={onClick} 
            style={{ ...styles.container, backgroundColor, ...style }}
        >
            <Center>
                <TextContent style={{ color }}>{children}</TextContent>
            </Center>
        </div>
    );
};

const styles = {
    container: {
        marginHorizontal: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
    }
};

export { Button };
