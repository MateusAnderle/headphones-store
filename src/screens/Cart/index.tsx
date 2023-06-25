import { Box, Divider, Text, useTheme, useToast } from 'native-base';
import { TouchableOpacity, FlatList } from 'react-native';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { CartItem } from '../../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  ProductProps,
  clearAddItemError,
  clearCart,
} from '../../store/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';
import { addPurchase } from '../../store/accountSlice';

type CartDetailProps = {
  cart: {
    deliveryFee: number;
    error: string | undefined;
    productsList: ProductProps[];
    success: boolean;
  };
};

export function Cart() {
  const toast = useToast();
  const color = useTheme();
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const { error, productsList, deliveryFee } = useSelector(
    (state: CartDetailProps) => state.cart
  );

  const subTotal = productsList.reduce((acc, obj) => {
    if (obj.attributes && typeof obj.attributes.price === 'number') {
      return acc + obj.attributes.price * obj.cartQuantity;
    }
    return acc;
  }, 0);

  function handleCheckout() {
    dispatch(
      addPurchase({
        date: new Date(),
        items: productsList,
        deliveryFee: deliveryFee,
      })
    );
    dispatch(clearCart());
    navigate('Checkout');
  }

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
      {productsList.length > 0 && (
        <Box pb={3}>
          <Box px={5}>
            <Divider mb={5} mt={2} bgColor="muted.300" />
          </Box>

          <Box flexDir="row" justifyContent="space-between">
            <Text fontSize="sm" color="muted.500">
              Subtotal:
            </Text>
            <Text fontSize="sm" color="muted.500">
              {formatCurrency(subTotal)}
            </Text>
          </Box>

          <Box flexDir="row" justifyContent="space-between">
            <Text fontSize="sm" color="muted.500">
              Delivery:
            </Text>
            <Text fontSize="sm" color="muted.500">
              {formatCurrency(deliveryFee)}
            </Text>
          </Box>

          <Box flexDir="row" justifyContent="space-between">
            <Text fontWeight="semibold" fontSize="md">
              Total:
            </Text>
            <Text fontWeight="semibold" fontSize="md">
              {formatCurrency(subTotal + deliveryFee)}
            </Text>
          </Box>
          <TouchableOpacity
            style={{
              backgroundColor: color.colors.green[500],
              marginTop: 15,
              borderRadius: 100,
              marginHorizontal: 15,
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleCheckout}
          >
            <Text fontWeight="semibold" color="white" fontSize="lg">
              Go to payment
            </Text>
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
}
