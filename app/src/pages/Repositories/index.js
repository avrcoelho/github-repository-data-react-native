import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage, ActivityIndicator, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import styles from './styles';

import api from '~/services/Api';

import Header from '~/components/Header';
import RepositoryItem from './RepositoryItem';

export default class Repositories extends Component {
  // essa função vai lidar com o fluxo que precisa fazer
  state = {
    repositories: [],
    loading: false,
    loadingList: true,
    error: false,
    errorMsg: '',
    refreshing: false,
    repository: '',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    this.loadingRepositories();
  }

  checkRepositoryExists = async (repository) => {
    const { data } = await api.get(`/repos/${repository}`);

    let storage = await AsyncStorage.getItem('@Gihuner:repositories');

    if (storage) {
      storage = JSON.parse(storage);

      const select = storage.find(repo => repo.id === data.id);

      if (!select) return false;
    }

    return data;
  }

  saveRepository = async (data) => {

    let storage = await AsyncStorage.getItem('@Gihuner:repositories');

    if (storage) {
      storage = JSON.parse(storage);

      storage = [...storage, data];

      await AsyncStorage.setItem('@Gihuner:repositories', JSON.stringify(storage));
    } else {
      await AsyncStorage.setItem('@Gihuner:repositories', JSON.stringify([data]));
    }
  }

  handleSearchRepository = async () => {
    const { repository } = this.state;

    this.setState({ loading: true });

    try {
      const data = await this.checkRepositoryExists(repository);

      if (data) {
        await this.saveRepository(data);

        this.setState({ repositories: [...this.state.repositories, data], loading: false });
      } else {
        this.setState({ error: true, errorMsg: 'Repositório já existente.' });
      }

    } catch (err) {
      this.setState({ error: true, errorMsg: 'Usuário inexistente.' });
      console.tron.log('Not found');
    } finally {
      this.setState({ loading: false });
    }
  };

  loadingRepositories = async () => {
    this.setState({ refreshing: true });

    const storage = await AsyncStorage.getItem('@Gihuner:repositories');

    if (storage) {
      const data = JSON.parse(storage);

      this.setState({
        repositories: data, loading: false, refreshing: false, loadingList: false,
      });
    } else {
      this.setState({ loading: false, refreshing: false, loadingList: false });
    }
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />

  renderList = () => {
    const { repositories: data, refreshing } = this.state;

    return (
      <FlatList
      // data que vai montar a lista
        data={data}
        // recebe cada item da lista e reortna o valor que é unico
        // o react native pede para retornar isso como string, por isso o "String" por volta
        keyExtractor={item => String(item.id)}
        // como vai renderizar cada item da lista
        renderItem={this.renderListItem}
        // faz o refresh ao puxar a lista para baixo
        onRefresh={this.loadingRepositories}
        refreshing={refreshing}
       />
    );
  }

  render() {
    const {
      loadingList, loading, error, repository, errorMsg,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header title="Gitissues" isBack={false} />
        <View style={styles.Content}>

          {error && <Text style={styles.error}>{errorMsg}</Text>}

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              // nenhuma letra em caixa alta
              autoCapitalize="none"
              // não corrigir automaticamente
              autoCorrect={false}
              placeholder="Adicionar novo repositório"
              // no android todo input tem um linha por baixo do texto, assim ela não aparece
              underlineColorAndroid="transparent"
              value={repository}
              onChangeText={text => this.setState({ repository: text })}
            />

            <TouchableOpacity style={styles.button} onPress={this.handleSearchRepository}>
              {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Icon name="plus" size={30} style={styles.buttonIcon} />}
            </TouchableOpacity>
          </View>
          {loadingList ? <ActivityIndicator style={styles.loading} /> : this.renderList() }
        </View>
      </View>
    );
  }
}
