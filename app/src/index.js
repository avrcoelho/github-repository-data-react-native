import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import '~/config/ReactotronConfig';

import createNavigator from './routes';

export default class App extends Component {
  state = {
    repositories: [],
  };

  async componentDidMount() {
    // const repositories = AsyncStorage.getItem('@Gihuner:repositories');
    // // !! troca o valor para booleano
    // this.setState({ repositories });
  }

  render() {
    // const { userChecked, userLogged } = this.state;

    // para não retornar nada
    // if (!userChecked) return null;

    const Routes = createNavigator();

    return <Routes />;
  }
}
