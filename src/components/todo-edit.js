import React from 'react';


export default class TodoEdit extends React.Component {
    state = {
        value: this.props.title,
    }

    componentDidMount() {
        const { input } = this.refs;
        const { length } = input.value;
        input.focus();
        input.setSelectionRange(length, length);
    }


    render() {
        return (
            <div onBlur={e => this.props.handleEditSubmit(e, this.state.value, this.props.id)}>
                <form onSubmit={e => this.props.handleEditSubmit(e, this.state.value, this.props.id)}>
                    <input style={{ width: '85%' }} ref="input" value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                </form>
            </div>
        );
    }
}