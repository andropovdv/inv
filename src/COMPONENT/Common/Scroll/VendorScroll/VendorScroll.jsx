import React from 'react';

const VendorScroll = (props) => {
    return (
        <option key={props.index} value={props.vendor}>
            {props.vendor}
        </option>
    )
}

export default VendorScroll;