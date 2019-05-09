import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import api from '~/services/Api';

import Header from '~/components/Header';

export default class Repositories extends Component {
  // essa função vai lidar com o fluxo que precisa fazer
  state = {
    repository: '',
    loading: false,
    error: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  checkRepositoryExists = async (repository) => {
    const data = await api.get(`/users/${repository}`);

    return data;
  }

  saveRepository = async (repository) => {
    await AsyncStorage.setItem('@Gihuner:repositories', repository);
  }

  handleSearchRepository = async () => {
    const { repository } = this.state;

    this.setState({ loading: true });

    try {
      await this.checkRepositoryExists(repository);
      await this.saveRepository(repository);

    } catch (err) {
      this.setState({ error: true });
      console.tron.log('Not found');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { repository, loading, error } = this.state;

    return (
      <View styles={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header title="Gitissues" isBack={false} />

        {error && <Text style={styles.error}>Usuário inexistente.</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            // nenhuma letra em caixa alta
            autoCapitalize="none"
            // não corrigir automaticamente
            autoCorrect={false}
            placeholder="Digite seu usuário"
            // no android todo input tem um linha por baixo do texto, assim ela não aparece
            underlineColorAndroid="transparent"
            value={repository}
            onChangeText={text => this.setState({ repository: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleSearchRepository}>
            {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Prosseguir</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
