import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, Linking, TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const redirectUrl = (url) => {
  console.log(url);
  Linking.openURL(url).catch(err => console.tron.log('An error occurred', err));
};

const IssueItem = ({ issue }) => (
  <TouchableHighlight onPress={() => redirectUrl(issue.html_url)}>
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{issue.title}</Text>
        <Text style={styles.login}>{issue.user.login}</Text>
      </View>
      <Icon style={styles.icon} name="angle-right" size={25} />
    </View>
  </TouchableHighlight>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default IssueItem;
