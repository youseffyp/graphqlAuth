import React, { Component } from 'react';
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {

    constructor(props){

        super(props);

        this.state = {
            errors: []
        }
    }

    componentWillUpdate(nextProps) {

        // user just signed in
        if (nextProps.data.user && !this.props.data.user) {

            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {

        // email and password that the user entered
        // both email and state were properties taken from
        // the state object on the AuthForm
        this.props.mutate({
            variables: {    // object destructuring used here for email and password
                email,
                password
            },
            refetchQueries: [{ query }]
        }).catch(res => {

            const errors = res.graphQLErrors.map(error => error.message);

            this.setState({ errors })
        });
    }

    render() {

        return (
            <div>
                <h3>sign up</h3>
                <AuthForm 
                errors = { this.state.errors }
                onSubmit = { this.onSubmit.bind(this) }/>
            </div>
        )
    }
}


export default graphql(query)(
    graphql(mutation)(SignupForm)
);