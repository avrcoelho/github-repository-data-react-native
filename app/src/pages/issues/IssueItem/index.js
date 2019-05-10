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
    <Image style={styles.avatar} source={{ uri: issue.owner.avatar_url }} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{issue.name}</Text>
      <Text style={styles.login}>{issue.owner.login}</Text>
    </View>
    <Icon style={styles.icon} name="angle-right" size={25} />
  </View>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
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

export default IssueItem;
