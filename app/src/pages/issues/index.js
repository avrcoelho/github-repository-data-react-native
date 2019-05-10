import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StatusBar, AsyncStorage, ActivityIndicator, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import styles from './styles';

import api from '~/services/Api';

import Header from '~/components/Header';
import IssueItem from './IssueItem';

export default class Issues extends Component {
  // essa função vai lidar com o fluxo que precisa fazer
  state = {
    issues: '',
    loading: false,
    error: false,
    refreshing: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      repository: PropTypes.string.isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    this.loadingIssues();
  }

  getIssues = async () => {
    this.setState({ refreshing: true, loading: true });

    console.log(this.props);

    const { repository } = this.props;

    try {
      const { data } = await api.get(`/repos/${repository}/issues`);

      this.setState({ issues: data, refreshing: true, loading: true });

    } catch (err) {
      this.setState({ error: true, refreshing: true, loading: true });
      console.tron.log('Not found');
    }
  }

  renderListItem = ({ item }) => <IssueItem issue={item} />

  renderList = () => {
    const { issues: data, refreshing } = this.state;

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
        onRefresh={this.loadingIssues}
        refreshing={refreshing}
       />
    );
  }

  render() {
    const {
      loading,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header title="Gitissues" isBack={false} />
        <View style={styles.Content}>
          <View style={styles.form}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Todas</Text>
            </TouchableOpacity>
          </View>
          {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList() }
        </View>
      </View>
    );
  }
}
