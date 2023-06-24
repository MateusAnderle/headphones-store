import { Box, Image, Text, useToast } from 'native-base';
import { PlusCircle, MinusCircle, Trash } from 'phosphor-react-native';
import { Alert, TouchableOpacity } from 'react-native';
import { baseUrl } from '../../utils/baseUrl';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
} from '../../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export function CartItem({ data }) {
  const dispatch = useDispatch();
  const url = `${baseUrl}${data?.attributes?.images.data[0].attributes?.url}`;

  function handleRemoveItemFromCart() {
    Alert.alert(
      'Attention!',
      'Do you really want to remove this item from cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => dispatch(deleteProduct(data.id)) },
      ]
    );
  }

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
        <Box flexDir="row" justifyContent="space-between">
          <Box>
            <Text fontSize="md" fontWeight="semibold">
              {data?.attributes?.model}
            </Text>
            <Text fontSize="sm" fontWeight="regular" color="muted.500">
              Marca
            </Text>
          </Box>

          <Box mt={1}>
            <TouchableOpacity onPress={handleRemoveItemFromCart}>
              <Trash size={22} color="#000" />
            </TouchableOpacity>
          </Box>
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
            <TouchableOpacity
              onPress={() => dispatch(decreaseQuantity(data.id))}
            >
              <MinusCircle size={24} color="#000" />
            </TouchableOpacity>

            <Text>{data?.cartQuantity}</Text>

            <TouchableOpacity
              onPress={() => dispatch(increaseQuantity(data.id))}
            >
              <PlusCircle size={24} color="#000" />
            </TouchableOpacity>
          </Box>

          <Text fontSize="md" fontWeight="semibold">
            {data?.attributes?.price}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
