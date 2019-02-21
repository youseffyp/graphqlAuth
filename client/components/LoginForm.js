import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo'; 
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class LoginForm extends Component {

        constructor(props) {

            super(props);          
            this.state = { errors: [] };
        }

        componentWillUpdate(nextProps){

            // this.props is the old, current set of props
            // nextProps is the next set of props that will be in place
            // when the component rerenders
            if (!this.props.data.user && nextProps.data.user) {
                
                // user exists now, but did not exist before
                // ie: user was not signed in,
                // but now is
                // redirect to dashboard
                hashHistory.push('/dashboard');
            }
        }

        onSubmit({ email, password }){

            // call the mutate function to call the mutation that was imported
            // by graphql to the component when it was rendered
            this.props.mutate({
                // variables to be used as query variables
                variables: { email, password }, // object destructuring used here
                refetchQueries: [{ query }]

                // mutations are all promises so we can catch any error
            }).catch( res => { 

                // save array of errors into local array
                const errors = res.graphQLErrors.map( error => {
                   return error.message;
                })

                this.setState({ errors });
             });
        }

        render() {
            return(
                <div>
                    <h3>Log in</h3>
                    <AuthForm
                     errors = { this.state.errors }
                     onSubmit = { this.onSubmit.bind(this) }/>
                </div>
            );
        }
}

export default graphql(query)(
graphql(mutation)(LoginForm)
);