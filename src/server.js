import axios from 'axios';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

class Server {

    static getQuestions(category) {
        return client
            .query({
                query: gql`
                query getQuestions {
                    getQuestions(category: "${category}") {
                      text
                      choice {
                        text
                        isCorrect
                      }
                    }
                }
                `
            });
    }
}

export default Server;