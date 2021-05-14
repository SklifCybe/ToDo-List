import React from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {
    const [visibleForm, setFormVisible] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const togleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    };

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false,
        };
        setIsLoading(true);
        axios
            .post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                onAddTask(list.id, data);
                togleFormVisible();
            })
            .catch(() => {
                alert('Ошибка при добавлении задачи!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="tasks__form">
            {!visibleForm ? (
                <div className="tasks__form-new" onClick={togleFormVisible}>
                    <img src={addSvg} alt="Add icon" />
                    <span>Новая задача</span>
                </div>
            ) : (
                <div className="tasks__form-block">
                    <input
                        className="field"
                        type="text"
                        placeholder="Текст задачи"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button disabled={isLoading} className="button" onClick={addTask}>
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                    <button className="button button--grey" onClick={togleFormVisible}>Отмена</button>
                </div>
            )}
        </div>
    );
};

export default AddTaskForm;