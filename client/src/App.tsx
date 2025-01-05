// * `App.tsx`: Create an Apollo Provider to make every request work with the Apollo Server.

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { Outlet } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

import Navbar from "./components/Navbar";

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
