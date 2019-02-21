import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';



class Header extends Component {

    // define onLogoutClick function
    // define the define the mutation to log a user out
    onLogoutClick() {
        // calling mutation that was brought in with graphql helper function
        this.props.mutate({
            // graphql to refetch the user query to check login status of user
            refetchQueries: [{ query }]
        });
    }

    renderButtons() {

        // destructure the loading and user properties of the data object 
        // from the query
        const { loading, user } = this.props.data;

        // check loading flag to see if query is still in progress
        if (loading) { return ( <div /> ) }

        // if user exists return a div to prepare for log out
        if (user) {
             return ( 
                <li>
                    <a onClick = { this.onLogoutClick.bind(this) }>Logout</a>
                </li>
            ) 
        }
        else { 
            return ( 
            <div> 
                <li>
                    <Link to = "/signup">Signup</Link>
                </li>
                <li>
                    <Link to = "/login">Login</Link>
                </li>
            </div> 
            ); 
        }
    }

    render() {

        
        return (
            <nav>
                <div className = "nav-wrapper">
                    <Link to = "/" className = "brand-logo left">
                        Home 
                    </Link>
                    <ul className = "right">
                        { this.renderButtons() }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default graphql(mutation)(
graphql(query)(Header)
);