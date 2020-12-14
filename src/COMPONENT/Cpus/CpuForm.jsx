import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputArea } from '../Common/FormsControls/FormsControls';
import { connect } from 'react-redux';
import VendorScrollContainer from '../Common/Scroll/VendorScroll/VendorScrollContainer';

const CpuForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Производитель'} name={'vendor'}
                        component={VendorScrollContainer}/>
                </div>
                {/* <div>
                    <Field placeholder={'Производитель'} name={'vendor'}
                        component={InputArea} />
                </div> */}
                <div>
                    <Field placeholder={'Модель'} name={'model'}
                        component={InputArea} />
                </div>
                <div>
                    <button>Записать</button>
                </div>
            </form>
        </div>
    )
}

let CpuReduxForm = reduxForm({ form: 'cpu' })(CpuForm);

CpuReduxForm = connect(state => ({ initialValues: state.cpu.currentCpu }), null)(CpuReduxForm)

export default CpuReduxForm;