import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from './../Badge'

import removeSvg from '../../assets/img/remove.svg';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    };

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => ( 
                <li 
                    key={index} 
                    className={classNames(item.className, {
                        active: item.active 
                        ? item.active 
                        : activeItem && activeItem.id === item.id }
                    )}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
                    <span>{item.name}</span>
                    <span>{item.tasks && `(${item.tasks.length})`}</span>
                    {isRemovable && 
                        <img 
                            src={removeSvg}  
                            className="list__remove-icon" 
                            alt="Remove icon" 
                            onClick={() => removeList(item)}
                        />}
                </li>
            ))}
        </ul>
    );
};

export default List;