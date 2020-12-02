import React from 'react';

export const VendorItem = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.full_name}</td>
            <td><button>Click</button></td>
            <td><button>Click</button></td>
        </tr>
    );
};
