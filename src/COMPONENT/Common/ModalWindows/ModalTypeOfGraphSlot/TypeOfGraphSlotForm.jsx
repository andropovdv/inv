import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { InputArea } from '../../FormsControls/FormsControls';

const TypeOfGraphSlotForm = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name={'typeOfGraphSlot'} placeholder={'Наименование'}
                        component={InputArea} autoFocus={true} />
                </div>
                <div>
                    <button>Записать</button>
                </div>
            </form>
        </>
    )
}

let TypeOfGraphReduxForm = reduxForm({ form: 'typeOfGraphSlot' })(TypeOfGraphSlotForm);

TypeOfGraphReduxForm = connect(state => ({
    initialValues: state.typeOfGraphSlot.currentType
}))(TypeOfGraphReduxForm);

export default TypeOfGraphReduxForm;
