import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Repositories from '~/pages/Repositories';
import Issues from '~/pages/issues';

// createAooContainer: não da funcionalidade de rota, mas da o container da rotas da aplicação
// sempre que for trabalhar com rota precisa do createAooContainer
const Routes = () => createAppContainer(
  createSwitchNavigator(
    {
      Repositories,
      Issues,
    },
    {
      // rota inciial do app
      // se userLogged for true chama Repositories senão chama welcome
      initialRouteName: 'Repositories',
      backBehavior: 'initialRoute'
    },
  ),
);

export default Routes;
