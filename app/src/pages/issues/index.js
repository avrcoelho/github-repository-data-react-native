import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StatusBar, ActivityIndicator, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import api from '~/services/Api';

import Header from '~/components/Header';
import IssueItem from './IssueItem';

export default class Issues extends Component {
  // essa função vai lidar com o fluxo que precisa fazer
  state = {
    issues: '',
    issuesFilter: '',
    loading: true,
    error: false,
    refreshing: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          repository: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  async componentDidMount() {
     this.loadingIssues();
  }

  loadingIssues = async () => {
    const { navigation } = this.props;
    const repository = navigation.getParam('repository');
    
    this.setState({ refreshing: true, loading: true });    
    
    try {
      const { data } = await api.get(`/repos/${repository}/issues`);

      this.setState({ issues: data, issuesFilter: data, refreshing: true, loading: true });

    } catch (err) {
      this.setState({ error: true, refreshing: true, loading: true });
      console.tron.log('Not found');
    }
  }

  issuesFilter = (condition) => {
    const { issues } = this.state;
    const filter = issues.filter(issue => issue.state !== condition)

    this.setState({ issuesFilter: filter })
  }

  renderListItem = ({ item }) => <IssueItem issue={item} />

  renderList = () => {
    const { issuesFilter: data, refreshing } = this.state;

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
        <Header title="Gitissues" isBack />
        <View style={styles.Content}>
          <View style={styles.form}>
            <TouchableOpacity style={styles.button} onPress={this.issuesFilter('all')}>
              <Text style={styles.buttonText}>Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.issuesFilter('close')}>
              <Text style={styles.buttonText}>Abertas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.issuesFilter('open')}>
              <Text style={styles.buttonText}>Fechadas</Text>
            </TouchableOpacity>
          </View>
          {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList() }
        </View>
      </View>
    );
  }
}
