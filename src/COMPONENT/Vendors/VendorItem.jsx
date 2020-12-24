import React from 'react';
import s from './Vendors.module.css';

const VendorItem = (props) => {

    const selectVendor = () => {
        let currenVendor = {
            id_vendor: props.id_vendor,
            name: props.name,
            full_name: props.full_name,
            url: props.url
        };
        props.setCurrentVendor(currenVendor);
    }
    return (
        <tr key={props.id_vendor} onClick={selectVendor}
            className={props.currentVendor.id_vendor === props.id_vendor && s.selectedVendor}>
            <td>{props.name}</td>
            <td>{props.full_name}</td>
            <td><button disabled={props.currentVendor.id_vendor === props.id_vendor ? false : true}
                onClick={() => {props.openModalEdit()} }>Редактировать</button></td>
            <td><button disabled={props.currentVendor.id_vendor === props.id_vendor ? false : true}
                onClick={() => {props.deleteVendor(props.currentVendor.id_vendor)} }>Удалить</button></td>
        </tr>
    );
};

export default VendorItem;
