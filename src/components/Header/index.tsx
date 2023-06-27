import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Box, Input, Text } from 'native-base';
import { XCircle, ShoppingCart, UserCircle } from 'phosphor-react-native';

import { useAppSelector } from '../../store';

type HeaderProps = {
  querySearch: string;
  setQuerySearch: (value: string) => void;
};

export function Header({ querySearch, setQuerySearch }: HeaderProps) {
  const { navigate } = useNavigation();
  const cartLength = useAppSelector((state) => state.cart.productsList.length);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flexDir="row" justifyContent="space-between" my={2}>
          <Input
            flex={1}
            mr={3}
            placeholder="Filter by model"
            borderWidth={0}
            fontSize={16}
            alignItems="center"
            variant="unstyled"
            value={querySearch}
            onChangeText={setQuerySearch}
            InputRightElement={
              querySearch ? (
                <TouchableOpacity onPress={() => setQuerySearch('')}>
                  <XCircle size={25} color="#ccc" />
                </TouchableOpacity>
              ) : undefined
            }
          />
          <TouchableOpacity
            style={{ position: 'relative' }}
            onPress={() => navigate('Cart')}
          >
            {cartLength > 0 && (
              <Box
                position="absolute"
                zIndex={10}
                top={-9}
                right={2}
                bgColor="green.500"
                py={0.2}
                px={1.5}
                borderRadius="full"
              >
                <Text fontSize="sm" color="white" fontWeight="semibold">
                  {cartLength}
                </Text>
              </Box>
            )}
            <ShoppingCart size={28} style={{ marginRight: 16 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('UserAccount')}>
            <UserCircle size={28} />
          </TouchableOpacity>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
