import { Box, Divider, Text } from 'native-base';
import { TouchableOpacity, FlatList } from 'react-native';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { CartItem } from '../../components/CartItem';
import { GET_ALL_PRODUCTS } from '../../config/apollo/queries/allProducts';
import { useQuery } from '@apollo/client';

export function Cart() {
  const { goBack } = useNavigation();
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

  return (
    <Box flex={1} bgColor="muted.100" safeArea px={3}>
      <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => goBack()}>
        <CaretLeft size={25} color="#000" style={{ margin: 5 }} />
      </TouchableOpacity>

      <FlatList
        data={data?.products?.data}
        renderItem={({ item }) => <CartItem data={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
      />

      <Box pb={3}>
        <Box px={5}>
          <Divider mb={5} mt={2} bgColor="muted.300" />
        </Box>

        <Box flexDir="row" justifyContent="space-between">
          <Text fontSize="sm" color="muted.500">
            Subtotal:
          </Text>
          <Text fontSize="sm" color="muted.500">
            U$ 300,00
          </Text>
        </Box>

        <Box flexDir="row" justifyContent="space-between">
          <Text fontSize="sm" color="muted.500">
            Delivery:
          </Text>
          <Text fontSize="sm" color="muted.500">
            U$ 10,00
          </Text>
        </Box>

        <Box flexDir="row" justifyContent="space-between">
          <Text fontWeight="semibold" fontSize="md">
            Total:
          </Text>
          <Text fontWeight="semibold" fontSize="md">
            U$ 310,00
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
