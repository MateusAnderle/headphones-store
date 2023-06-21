import { Box, Image, Text } from 'native-base';
import { PlusCircle, MinusCircle } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { baseUrl } from '../../utils/baseUrl';

export function CartItem({ data }) {
  const url = `${baseUrl}${data?.attributes?.images.data[0].attributes?.url}`;
  return (
    <Box flexDir="row">
      <Box p={2} bgColor="white" borderRadius={5}>
        <Image
          source={{
            uri: url,
          }}
          alt="{productData?.title}"
          resizeMode="contain"
          size="md"
        />
      </Box>

      <Box flex={1} justifyContent="space-between" p={2}>
        <Box>
          <Text fontSize="md" fontWeight="semibold">
            {data?.attributes?.model}
          </Text>
          <Text fontSize="sm" fontWeight="regular" color="muted.500">
            Marca
          </Text>
        </Box>

        <Box flexDir="row" justifyContent="space-between">
          <Box
            flexDir="row"
            fontSize="sm"
            fontWeight="regular"
            justifyContent="space-between"
            alignItems="center"
            w="20"
          >
            <TouchableOpacity>
              <MinusCircle size={24} color="#000" />
            </TouchableOpacity>

            <Text>123</Text>

            <TouchableOpacity>
              <PlusCircle size={24} color="#000" />
            </TouchableOpacity>
          </Box>

          <Text fontSize="md" fontWeight="semibold">
            R$ 100,00
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
