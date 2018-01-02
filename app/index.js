import React from 'react';
import {
  AppRegistry
} from 'react-native';

import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

// add your own project ID here (more info: https://github.com/react-native-training/apollo-subscriptions-book-club)
const projectId = 'cj9g99ju403ce0155sxn71k9a'

const wsClient = new SubscriptionClient(`wss://subscriptions.ap-northeast-1.graph.cool/v1/${projectId}`, {
  reconnect: true
});

const networkInterface = createNetworkInterface({
  uri: `https://api.graph.cool/simple/v1/${projectId}`
}); 

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

import App from './app';

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent('RNGraphCool', () => ApolloApp);
