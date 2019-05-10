import React, { Component } from 'react';
//  quando um componente precisa usar a parte de navegação, mas ele não pe um pagina
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import {
  View, Text, Image, TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class RepositoryItem extends Component {
  static propTypes = {
    repository: PropTypes.shape({
      // data: PropTypes.shape({
      full_name: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
        // }),
      }),
    }).isRequired,
  };

  handleIssues = () => {
    const { repository, navigation } = this.props;

    navigation.navigate('Issues', { repository: repository.full_name });
  }

  render() {
    const { repository } = this.props;

    return (
      <TouchableHighlight onPress={this.handleIssues}>
        <View style={styles.container} onPress={this.handleIssues}>
          <Image style={styles.avatar} source={{ uri: repository.owner.avatar_url }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{repository.name}</Text>
            <Text style={styles.login}>{repository.owner.login}</Text>
          </View>
          <Icon style={styles.icon} name="angle-right" size={25} />
        </View>
      </TouchableHighlight>
    );
  }
}

export default withNavigation(RepositoryItem);
