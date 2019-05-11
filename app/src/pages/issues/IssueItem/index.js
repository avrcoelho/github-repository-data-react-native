import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const redirectUrl = (url) => {
  Linking.openURL(url).catch(err => console.tron.log('An error occurred', err));
};

const IssueItem = ({ issue }) => (
  <View style={styles.container} onPress={redirectUrl}>
    <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{issue.title}</Text>
      <Text style={styles.login}>{issue.user.login}</Text>
    </View>
    <Icon style={styles.icon} name="angle-right" size={25} />
  </View>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default IssueItem;
