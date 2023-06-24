import { Box, Divider, Text, useToast } from 'native-base';
import { TouchableOpacity, FlatList } from 'react-native';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { CartItem } from '../../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ProductProps, clearAddItemError } from '../../store/cartSlice';

type CartDetailProps = {
  cart: {
    deliveryFee: number;
    error: string | undefined;
    productsList: ProductProps[];
    success: boolean;
  };
};

export function Cart() {
  const dispatch = useDispatch();
  const { error, productsList } = useSelector(
    (state: CartDetailProps) => state.cart
  );
  const { goBack } = useNavigation();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
              <Text color="muted.50" fontWeight="semibold">
                {error}
              </Text>
            </Box>
          );
        },
        placement: 'top',
      });
      const timerError = setTimeout(() => {
        dispatch(clearAddItemError());
      }, 500);

      return () => clearTimeout(timerError);
    }
  }, [error]);

  return (
    <Box flex={1} bgColor="muted.100" safeArea px={3}>
      <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => goBack()}>
        <CaretLeft size={25} color="#000" style={{ margin: 5 }} />
      </TouchableOpacity>

      <FlatList
        data={productsList}
        renderItem={({ item }) => <CartItem data={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 15 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Box
            bgColor="muted.50"
            borderRadius={5}
            borderWidth={1}
            borderColor="muted.300"
            justifyContent="center"
            alignItems="center"
            h="12"
          >
            <Text>The cart is empty</Text>
          </Box>
        }
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
