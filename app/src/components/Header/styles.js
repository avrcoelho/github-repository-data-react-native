import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';
// obtem a altura da statusbar
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    height: 54 + getStatusBarHeight(),
    // paddingTop: getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.white,
  },
  

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darker,
    flex: 1,
    textAlign:'center'
  },

  icon: {
    fontWeight: 'bold'
  }
});

export default styles;
