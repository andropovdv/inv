import React from 'react';

const TypeOfRamItem = (props) => {
    return (
        <tr>
            <td>{props.typeOfRam}</td>
            <td><button>Редактировать</button></td>
            <td><button>Удалить</button></td>
        </tr>
    )
}

export default TypeOfRamItem; 