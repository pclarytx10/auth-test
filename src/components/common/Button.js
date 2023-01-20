import * as React from 'react';

export default function BasicButtons({title, handleAction}) {
    return (
        <button 
            type="button"
            className='btn btn-primary'
            onClick={handleAction}>{title}</button>
    );
}