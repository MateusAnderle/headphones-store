import { Box, Center, Text, useTheme, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AccountStateProps } from '../../store/accountSlice';

type CheckoutProps = {
  account: AccountStateProps;
};

export function Checkout() {
  const color = useTheme();
  const toast = useToast();
  const { navigate } = useNavigation();
  const { success } = useSelector((state: CheckoutProps) => state.account);

  useEffect(() => {
    if (success) {
      toast.show({
        render: () => {
          return (
            <Box bg="green.500" px="2" py="1" rounded="sm" mb={5}>
              <Text color="muted.50" fontWeight="semibold">
                {success}
              </Text>
            </Box>
          );
        },
        placement: 'top',
      });
    }
  }, [success]);

  return (
    <Box flex={1} bgColor="muted.100" safeArea px={4}>
      <Box flex={1}>
        <Center flex={1} pt={32}>
          <Text fontSize="2xl" fontWeight="semibold" mb={5}>
            Congratulations! ✅
          </Text>
          <Text fontSize="md" textAlign="center" fontWeight="semibold" mb={5}>
            Your payment has been completed successfully!
          </Text>
          <Text fontSize="md" textAlign="center" fontWeight="regular">
            To view your purchase history, simply login to your account.
          </Text>
        </Center>
        <Box>
          <TouchableOpacity
            style={{
              backgroundColor: color.colors.black,
              marginTop: 15,
              borderRadius: 100,
              marginHorizontal: 15,
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigate('Home')}
          >
            <Text fontWeight="semibold" color="white" fontSize="lg">
              Back to Home
            </Text>
          </TouchableOpacity>
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
            onPress={() => navigate('UserAccount')}
          >
            <Text fontWeight="semibold" color="white" fontSize="lg">
              Go to my account
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
