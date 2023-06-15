import { Center, Image, Input, Text } from 'native-base';
import { baseUrl } from '../../utils/baseUrl';

export function Card({ data }: any) {
  const url = `${baseUrl}${data?.attributes?.images.data[0].attributes?.url}`;

  return (
    <Center bgColor="white" flex={0.5} p={3} borderRadius={4}>
      <Image
        source={{ uri: url }}
        alt={data?.attributes?.model}
        size="xl"
        resizeMode="contain"
      />
      <Text fontWeight="semibold">{data?.attributes?.model}</Text>
    </Center>
  );
}
