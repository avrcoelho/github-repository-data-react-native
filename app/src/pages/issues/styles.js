import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
    justifyContent: 'flex-start',
    // todo os elementos vão ocupar a largura total da pagina
    alignItems: 'stretch',
  },

  Content: {
    marginHorizontal: metrics.basePadding,
    flex: 1,
  },

  menu: {
    marginTop: metrics.baseMargin * 2,
    flexDirection: 'row',
    paddingBottom: metrics.basePadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.regular,
  },

  button: {
    backgroundColor: colors.regular,
    height: 44,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: colors.dark,
    fontWeight: 'bold',
  },
});

export default styles;
