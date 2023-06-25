import { Box, Center, Spinner, Text, useTheme, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { House } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

type CheckoutProps = {};

export function Checkout({}: CheckoutProps) {
  const toast = useToast();
  const color = useTheme();
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();

  const loading = false;
  const successPayment = false;
  // useEffect(() => {
  //   if (error) {
  //     toast.show({
  //       render: () => {
  //         return (
  //           <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
  //             <Text color="muted.50" fontWeight="semibold">
  //               {error}
  //             </Text>
  //           </Box>
  //         );
  //       },
  //       placement: 'top',
  //     });
  //     const timerError = setTimeout(() => {
  //       dispatch(clearAddItemError());
  //     }, 500);

  //     return () => clearTimeout(timerError);
  //   }
  // }, [error]);

  return (
    <Box flex={1} bgColor="muted.100" safeArea px={4}>
      {loading ? (
        <Center flex="1">
          <Spinner
            color="muted.700"
            size="lg"
            accessibilityLabel="Loading content"
          />
        </Center>
      ) : (
        <Box flex={1}>
          {successPayment ? (
            <>
              <Center flex={1} pt={32}>
                <Text fontSize="2xl" fontWeight="semibold" mb={5}>
                  Congratulations! ✅
                </Text>
                <Text
                  fontSize="md"
                  textAlign="center"
                  fontWeight="semibold"
                  mb={5}
                >
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
            </>
          ) : (
            <>
              <Center flex={1} pt={24}>
                <Text fontSize="2xl" fontWeight="semibold" mb={5}>
                  Something went wrong! ❌
                </Text>
                <Text
                  fontSize="md"
                  textAlign="center"
                  fontWeight="semibold"
                  mb={5}
                >
                  Your payment has been declined
                </Text>
                <Text fontSize="md" textAlign="center" fontWeight="regular">
                  Please contact your credit card for more informations.
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
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
