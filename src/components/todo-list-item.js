import { Col } from 'react-materialize';
import React from 'react';
import TodoEdit from './todo-edit';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';




const TodoListItem = (props) => {
    const {
        checked, handleCheck, handleDelete, edit, handleDoubleClick, id,
    } = props;

    const checkedClass = checked ? 'todo-line-through' : '';

    if (!edit) {
        return (
            <Col>
                <div className={`${checkedClass}`} >
                    <Checkbox
                        checked={checked}
                        className="right todo-checkbox" type="checkbox" onClick={() => handleCheck(id, checked)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span onDoubleClick={() => handleDoubleClick(id)}>
                        {props.title}
                    </span>
                    <Tooltip title="Delete current todo">
                        <button id="del_button" onClick={() => handleDelete(id)}
                            className="btn btn-sm btn-danger"
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                right: '1.25rem',
                                margin: 'auto 0',
                                height: '25px',
                                paddingTop: 0,
                                paddingBottom: 0,
                            }}>&times;
                        </button>
                    </Tooltip>

                </div>
            </Col>
        );
    }

    if (edit) {
        return (
            <Col>
                <div className={`${'card-panel teal lighten-2 yellow-text '}${checkedClass}`}>
                    <TodoEdit title={props.title} handleEditSubmit={props.handleEditSubmit} id={id} />
                </div>
            </Col>
        );
    }

    return false;
};

export default TodoListItem;