import { useNavigation } from '@react-navigation/native';
import { Button, Center } from 'native-base';

export function ProductDetail() {
  const { navigate } = useNavigation();
  return (
    <Center flex="1" bgColor={'#fff'}>
      ProductDetail
      <Button onPress={() => navigate('Home')}>Voltar</Button>
    </Center>
  );
}
