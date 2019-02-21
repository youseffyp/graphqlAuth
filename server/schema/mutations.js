const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {

                // use return here because graphql expects a promise
                return AuthService.signup({ email, password, req })
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {

                // create a reference to the user property on the request object
                const { user } = req;
                // call logout method from PassportJs
                req.logout();
                return user;

            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                
                // return here because graphql expects a promise
                return AuthService.login({ email, password, req });
            }
        }

    }
});

module.exports = mutation;