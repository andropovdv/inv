import React from 'react';
import AddEditTwo from '../Common/ModalWindows/AddEditTwo/AddEditTwo';
import VendorReduxForm from './VendorForm';
import VendorItem from './VendorItem';
import VendorModal from './VendorModal';
import s from './Vendors.module.css'

const Vendors = (props) => {

    let errorMessage;
    if (parseInt(props.errorCode, 10) === 10) {
        errorMessage = <AddEditTwo onClose={props.closeModal}
            isOpen={true} header={'Информация:'}>
            <div className={s.errorMessage}>Already have</div>
        </AddEditTwo>
    }
    return (
        <div className={s.vendorWrapper}>
            <div className={s.vendorLabel}>
                Производители:
            </div>
            <div className={s.vendorContent}>
                <div className={s.buttonArea}>
                    <button onClick={() => props.openModalNew()}>Добавить производителя</button>
                    <button onClick={() => props.prevPage()}
                        disabled={typeof props.pagination.prev !== 'undefined' ? false : true}>
                        Предыдущая</button>
                    {props.pagination.current + 1}из{props.pagination.numPages}
                    <button onClick={() => props.nextPage()}
                        disabled={typeof props.pagination.next !== 'undefined' ? false : true}>
                        Следующая</button>
                </div>
                <div>{errorMessage}</div>
                <div disabled={props.isLoading}>
                    <table className={s.table2}>
                        <tbody>
                            <tr><th>Наименование</th><th>Полное наименование</th><th></th><th></th></tr>
                            {props.vendors.map(v =>
                                <VendorItem
                                    key={v.id_vendor}
                                    {...props}
                                    id_vendor={v.id_vendor}
                                    name={v.name}
                                    full_name={v.full_name}
                                    url={v.url} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <VendorModal
                    isOpen={props.isVisable}
                    onClose={props.closeModal}>
                    <VendorReduxForm
                        {...props}
                        onSubmit={props.typeModal ? props.updateVendor : props.addVendor} />
                </VendorModal>
            </div>
        </div>
    )
}

export default Vendors;