import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Repositories from '~/pages/Repositories';

// createAooContainer: não da funcionalidade de rota, mas da o container da rotas da aplicação
// sempre que for trabalhar com rota precisa do createAooContainer
const Routes = () => createAppContainer(
  createSwitchNavigator({
    Repositories,
  }),
);

export default Routes;