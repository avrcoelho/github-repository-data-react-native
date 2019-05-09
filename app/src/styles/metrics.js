// padrões da aplicação, como margin, padding, border e etc
import { Dimensions } from 'react-native';

// retorna a largura e a altura do celular
const { width, height } = Dimensions.get('window');

export default {
  baseMargin: 10,
  basePadding: 20,
  baseRadius: 3,
  // da a possibilidade de trabalhar como portract e e landscape
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};
