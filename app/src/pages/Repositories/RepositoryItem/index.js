import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const RepositoryItem = ({ repository }) => {
  console.log(repository);
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: repository.owner.avatar_url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{repository.name}</Text>
        <Text style={styles.login}>{repository.owner.login}</Text>
      </View>
      <Icon style={styles.icon} name="angle-right" size={25} />
    </View>
  );
};

RepositoryItem.propTypes = {
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

export default RepositoryItem;
