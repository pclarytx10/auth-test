import * as React from 'react';
// import Button from '@mui/material/Button';

export default function BasicButtons({title, handleAction}) {
    return (
        <button 
            type="button"
            className='btn btn-primary'
            onClick={handleAction}>{title}</button>
    );
}