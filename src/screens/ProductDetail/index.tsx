import { TouchableOpacity, FlatList, Image } from 'react-native';
import {
  Box,
  Text,
  Button,
  Center,
  Spinner,
  ScrollView,
  useToast,
} from 'native-base';
import { CaretLeft } from 'phosphor-react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { PRODUCT_DETAIL } from '../../config/apollo/queries/productDetail';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { baseUrl } from '../../utils/baseUrl';
import { useWindowDimensions } from 'react-native';

export function ProductDetail() {
  const toast = useToast();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { data, loading, error } = useQuery(PRODUCT_DETAIL, {
    variables: { id: params?.id },
  });
  const productData = data?.product?.data?.attributes;
  const { width } = useWindowDimensions();

  const imagesArray = productData?.images?.data?.map(
    (item) => `${baseUrl}${item.attributes?.url}`
  );

  useEffect(() => {
    if (error) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
              <Text color="muted.50" fontWeight="semibold">
                Error: Failed to fetch data
              </Text>
            </Box>
          );
        },
        placement: 'top',
      });
    }
  }, [error]);

  if (loading) {
    return (
      <Center flex="1">
        <Spinner
          color="muted.700"
          size="lg"
          accessibilityLabel="Loading content"
        />
      </Center>
    );
  }

  return (
    <Box flex="1" bgColor="white" safeArea position="relative">
      <TouchableOpacity
        style={{
          justifyContent: 'flex-start',
          top: 60,
          left: 10,
          zIndex: 99,
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: 3,
          borderRadius: 100,
        }}
        onPress={() => goBack()}
      >
        <CaretLeft size={25} color="#fff" style={{ margin: 5 }} />
      </TouchableOpacity>

      <ScrollView flex="1" bgColor="muted.100">
        <FlatList
          data={imagesArray}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              alt={productData?.title}
              resizeMode="contain"
              style={{ aspectRatio: 1, backgroundColor: 'white', width }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <Box p={3}>
          <Text fontSize="2xl" fontWeight="semibold">
            {productData?.title}
          </Text>

          <Box flexDirection="row" justifyContent="space-between" mt={5}>
            <Text fontSize="md" fontWeight="semibold">
              Price: U$ {productData.price}
            </Text>

            <Text fontSize="md" fontWeight="semibold">
              Quantity: {productData.quantity}
            </Text>
          </Box>

          <Box mt={5}>
            <Text fontSize="md" fontWeight="semibold" mb={1}>
              Description:
            </Text>
            <Text textAlign="justify">{productData.description}</Text>
          </Box>
        </Box>
      </ScrollView>
      <Box bgColor="white" pt={2}>
        <Button bgColor="black" borderRadius="full" marginX={3}>
          Buy {productData.price}
        </Button>
      </Box>
    </Box>
  );
}
