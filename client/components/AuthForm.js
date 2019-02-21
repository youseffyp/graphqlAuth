import React, { Component } from 'react';

class AuthForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit(event) {

        // call preventDefault on event object so the form
        //  does not automatically submit itself
        event.preventDefault();

        // pass the email and password from the state object
        // to the onSubmit props method
        const { email, password } = this.state;

        // calls the function passed in as the 
        // onSubmit prop with the parameters
        // of email and password from the 
        // state object
        // that function calls the mutate function 
        // that is actually the login mutation
        // from '../mutations/Login.js'
        this.props.onSubmit({ email, password });
    }

    render() {

        return (
            <div className = "row">
                <form onSubmit = { this.onSubmit.bind(this) } className = "col s4">
                    <div className = "input-field">
                        <input 
                            placeholder = "email"
                            value = { this.state.email }
                            onChange = { e => this.setState({ email: e.target.value }) }
                        />
                    </div>
                    <div className = "input-field">
                        <input 
                            placeholder = "password"
                            type = "password"
                            value = { this.state.password }
                            onChange = { e => this.setState({ password: e.target.value }) }
                        />
                    </div>
                    <div className = "errors">
                        { this.props.errors.map(error => <div key = {error}>{error}</div>) }
                    </div>
                    <button className = "btn">submit</button>
                </form>
            </div>
        );
    }
}

export default AuthForm;