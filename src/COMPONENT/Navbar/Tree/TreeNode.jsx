import { faAngleDoubleDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Tree from './Tree';
import s from './TreeNode.module.css';

const TreeNode = (props) => {

    const [childVisible, setChildVisible] = useState(false);

    const hasChild = props.node.children
        ? true
        : false;

    return (
        <li className={`${s.d_tree_node}`}>
            <div onClick={(e) => setChildVisible((v) => !v)} key={props.node.key}>
                {hasChild && (
                    <div className={s.d_tree_toggler}>
                        {childVisible
                            ? <FontAwesomeIcon icon={faAngleDoubleDown} />
                            : <FontAwesomeIcon icon={faAngleDoubleRight} />
                        }
                    </div>
                )}
                {props.node.to
                    ? <NavLink to={props.node.to} activeClassName={s.activeLink}>{props.node.label}</NavLink>
                    : props.node.label
                }
            </div>
            {hasChild && childVisible && (
                <div>
                    <Tree data={props.node.children}/>
                </div>
            )}
        </li>
    )
}

export default TreeNode;
