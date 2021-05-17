import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddTaskForm from './AddTaskForm';
import Task from './Task';

import editSvg from '../../assets/img/edit.svg';

import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, withoutEpmty, onEditTask, onCompleteTask }) => {
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            })
                .catch(() => {
                    alert('Не удалось обновить название списка');
                });
        }
    };

    return (
        <div className="tasks">
            <div className="tasks__title">
                {/* <h2 style={{ color: list.color.hex }}>
                    {list.name}
                    <img
                        src={editSvg}
                        alt="Edit icon"
                        onClick={editTitle}
                    />
                </h2> */}
                <Link to={`lists/${list.id}`}>
                    <h2 style={{ color: list.color.hex }}>
                        {list.name}
                        <img
                            src={editSvg}
                            alt="Edit icon"
                            onClick={editTitle}
                        />
                    </h2>
                </Link>
            </div>
            <div className="tasks__items">
                {!withoutEpmty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Task
                        key={task.id}
                        {...task}
                        list={list}
                        onRemove={onRemoveTask}
                        onEdit={onEditTask}
                        onComplete={onCompleteTask}
                    />
                ))}
            </div>
            <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
        </div>
    )
};

export default Tasks;