import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


export default (WrappedComponent) => {

    class RequireAuth extends Component {

        componentDidMount() {
            
            // check to see if user is currently signed in
            // check to see if query user info is 
            // still loading 
            // run currentUser query
            if (!this.props.data.user && !this.props.data.loading){

                hashHistory.push('/login')
            }
        }

        render(){

            return <WrappedComponent {...this.props} />
        }
    }

    graphql(currentUserQuery)(RequireAuth);
};