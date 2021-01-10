import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

type AppState = {};

type AppProps = {};

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <div >
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    )
  };
}

export default App;
