import React from 'react';
import { database } from "../firebase/firebase";
import Button from "@material-ui/core/Button";

export default class TodoHeader extends React.Component {
    state = {
        title: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { title } = this.state;


        if (title.length === 0) {
            alert('enter a title');
            return;
        }


        const todo = {
            title,
            timestamp: Date.now(),
            checked: false,
            edit: false,

        };
        database.ref('/todos/').push(todo);
        this.setState({ title: '' });
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <form style={{ marginBottom: '20px' }}>
                                    <input id="name"
                                        type="text"
                                        value={this.state.title}
                                        className="validate" onChange={e => this.setState({ title: e.target.value })}
                                        placeholder="Enter todo here...[Press Enter]" />
                                    <Button id="Go"
                                        className="btn waves-effect waves-light yellow-text"
                                        type="submit">Go!</Button>
                                </form>


                            </div>



                        </div>
                    </form>
                </div>
            </div>
        );
    }
}