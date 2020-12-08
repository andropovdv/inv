import React from 'react';
import s from './Vendors.module.css';

const VendorItem = (props) => {

    return (
        <tr onClick={() => { props.setCurrentVendor(props.id_vendor, props.name, props.full_name) }}
            className={props.currentVendorId === props.id_vendor && s.selectedVendor}>
            <td>{props.name}</td>
            <td>{props.full_name}</td>
            <td><button disabled={props.currentVendorId === props.id_vendor ? false : true}
                onClick={() => {props.openModal()} }>Редактировать</button></td>
            <td><button disabled={props.currentVendorId === props.id_vendor ? false : true}
                onClick={() => {props.deleteVendor(props.currentVendorId)} }>Удалить</button></td>
        </tr>
    );
};

export default VendorItem;
