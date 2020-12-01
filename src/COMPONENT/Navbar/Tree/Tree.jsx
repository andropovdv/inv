import React from 'react';
import TreeNode from './TreeNode';
import s from './TreeNode.module.css';

const Tree = ({ data = [] }) => {
    return (
        <div>
            <ul className={s.d_tree_container}>
                {data.map((tree) => (<TreeNode node={tree} />))}
            </ul>
        </div>
    )
}

export default Tree;