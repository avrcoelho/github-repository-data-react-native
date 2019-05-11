import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoContainer: {
    flexDirection: 'row',
    marginLeft: metrics.baseMargin,
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.dark,
  },
  login: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.regular,
  },

  avatar: {
    width: 50,
    height: 50,
  },

  icon: {
    paddingLeft: metrics.basePadding
  }
});

export default styles;
