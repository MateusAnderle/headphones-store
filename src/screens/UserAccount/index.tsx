import { Box, Text, Image, Center, Spinner } from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native';
import { House } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import LogoImage from '../../assets/logo.png';
import { PurchasesCard } from '../../components/PurchasesCard';

export function UserAccount() {
  const { navigate } = useNavigation();

  const EmptyList = () => (
    <Center flex={1}>
      <Text fontWeight="semibold">No purchases found</Text>
    </Center>
  );

  const loading = false;
  const data = ['1', '2', '3', '4', '5'];

  return (
    <Box flex={1} bgColor="muted.100" safeArea px={4}>
      <Box flexDir="row" justifyContent="flex-end">
        <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() => navigate('Home')}
        >
          <House size={28} color="#000" style={{ margin: 5 }} />
        </TouchableOpacity>
      </Box>

      {loading ? (
        <Center flex="1">
          <Spinner
            color="muted.700"
            size="lg"
            accessibilityLabel="Loading content"
          />
        </Center>
      ) : (
        <>
          <Box>
            <Box flexDir="row" alignItems="center">
              <Image
                source={LogoImage}
                alt="Company logo"
                size="md"
                resizeMode="contain"
                borderRadius="full"
              />

              <Box ml={3}>
                <Text fontSize="md" fontWeight="semibold">
                  John Doe
                </Text>
                <Text fontSize="md" fontWeight="semibold">
                  email@email.com
                </Text>
              </Box>
            </Box>
          </Box>

          <FlatList
            data={data}
            renderItem={({ item }) => <PurchasesCard />}
            keyExtractor={(item) => item}
            contentContainerStyle={{ gap: 10 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyList}
            style={{ marginTop: 24 }}
          />
        </>
      )}
    </Box>
  );
}
