import Reactotron from 'reactotron-react-native';

// variavel global do react native
if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
