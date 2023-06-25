import { Box, Text, Image, Center, Spinner } from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native';
import { House } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import LogoImage from '../../assets/logo.png';
import { PurchasesCard } from '../../components/PurchasesCard';
import { useSelector } from 'react-redux';
import { AccountStateProps } from '../../store/accountSlice';

type UserAccountProps = {
  account: AccountStateProps;
};

export function UserAccount() {
  const { navigate } = useNavigation();
  const { purchased } = useSelector((state: UserAccountProps) => state.account);

  const EmptyList = () => (
    <Center flex={1}>
      <Text fontWeight="semibold">No purchases found</Text>
    </Center>
  );

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
        data={purchased}
        renderItem={({ item }) => <PurchasesCard data={item} />}
        keyExtractor={(item) => item.date.toString()}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyList}
        style={{ marginTop: 24 }}
      />
    </Box>
  );
}
