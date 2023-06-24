import { Image, Text } from 'native-base';
import { baseUrl } from '../../utils/baseUrl';
import { Dimensions, TouchableOpacity } from 'react-native';

type CardProps = {
  data: {
    id: string;
    attributes: {
      images: {
        data: {
          id: string;
          attributes: {
            url: string;
          };
        }[];
      };
      model: string;
    };
  };
  onPress: () => void;
};

export function Card({ data, onPress }: CardProps) {
  const url = `${baseUrl}${data?.attributes?.images.data[0].attributes?.url}`;
  const { width } = Dimensions.get('screen');
  const cardWidth = width / 2 - 15;

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: cardWidth,
        padding: 10,
        borderRadius: 5,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: url }}
        alt={data?.attributes?.model}
        size="xl"
        resizeMode="contain"
      />
      <Text fontWeight="semibold">{data?.attributes?.model}</Text>
    </TouchableOpacity>
  );
}
