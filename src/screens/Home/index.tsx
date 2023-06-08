import { useNavigation } from '@react-navigation/native';
import { Button, Center } from 'native-base';

export function Home() {
  const { navigate } = useNavigation();
  return (
    <Center flex="1" bgColor={'#fff'}>
      Home
      <Button onPress={() => navigate('ProductDetail')}>Ir para detalhe</Button>
    </Center>
  );
}
