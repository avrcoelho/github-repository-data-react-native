import React, { Component } from 'react';
//  quando um componente precisa usar a parte de navegação, mas ele não pe um pagina
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  View, Text, TouchableOpacity, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Header extends Component {
    static propTypes = {
      title: PropTypes.string.isRequired,
      isBack: PropTypes.bool.isRequired,
      navigation: PropTypes.shape({
        navigate: PropTypes.func,
      }).isRequired,
    };

    backNavigation = async () => {
      const { navigation } = this.props;

      navigation.navigate('Repositories');
    }

    render() {
      const { title, isBack } = this.props;

      return (
        <View style={styles.container}>
          {/* barStyle: cor da font */}
          <StatusBar barStyle="dark-content" />
          <View style={styles.left} />
          <Text style={styles.title}>{title}</Text>
          {isBack && (
            <TouchableOpacity onPress={this.backNavigation}>
              <Icon name="exchange" size={16} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      );
    }
}

export default withNavigation(Header);
