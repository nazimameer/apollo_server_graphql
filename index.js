import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// types
import { typeDefs } from './schema.js';
import db from './_db.js'
const resolvers = {
    Query: {
        games(){
            return db.games
        },
        author(){
            return db.authors
        },
        reviews(){
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id);
        }
    }
}

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = startStandaloneServer(server, {
    listen: { port : 4000 }
});  

console.log("Server ready at port 4000");