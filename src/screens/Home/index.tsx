import { useNavigation } from '@react-navigation/native';
import { Box, Center, Spinner, Text, useToast } from 'native-base';

import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../config/apollo/queries/allProducts';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';

export function Home() {
  const [querySearch, setQuerySearch] = useState();
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS, {
    variables: { filter: { contains: querySearch } },
  });
  const { navigate } = useNavigation();
  const toast = useToast();

  function handleProductPress(id) {
    navigate('ProductDetail', { id });
  }

  const EmptyList = () => (
    <Center flex={1}>
      <Text fontWeight="semibold">No products found</Text>
    </Center>
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

  return (
    <Box flex="1" bgColor="muted.100" safeArea p={'10px'}>
      <Header querySearch={querySearch} setQuerySearch={setQuerySearch} />
      {loading ? (
        <Center flex="1">
          <Spinner
            color="muted.700"
            size="lg"
            accessibilityLabel="Loading content"
          />
        </Center>
      ) : (
        <FlatList
          data={data?.products?.data}
          renderItem={({ item }) => (
            <Card data={item} onPress={() => handleProductPress(item.id)} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyList}
        />
      )}
    </Box>
  );
}
