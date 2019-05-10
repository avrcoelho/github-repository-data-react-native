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

  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },

  text: {
    textAlign: 'center',
    color: colors.light,
    marginTop: metrics.baseMargin,
    fontSize: 15,
    lineHeight: 21,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin * 2,
  },

  form: {
    marginTop: metrics.baseMargin * 2,
    flexDirection: 'row',
    paddingBottom: metrics.basePadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.regular,
  },

  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    marginRight: metrics.baseMargin * 2,
    height: 44,
    flex: 1,
    paddingHorizontal: metrics.basePadding,
  },

  button: {
    backgroundColor: colors.transparent,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  buttonIcon: {
    color: colors.dark,
    fontWeight: 'bold',
  },
});

export default styles;
