import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Box, Input } from 'native-base';
import { XCircle, ShoppingCart, UserCircle } from 'phosphor-react-native';

export function Header({ querySearch, setQuerySearch }) {
  const { navigate } = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flexDir="row" justifyContent="space-between" mb={2}>
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
                <TouchableOpacity onPress={() => setQuerySearch()}>
                  <XCircle size={25} color="#ccc" />
                </TouchableOpacity>
              ) : undefined
            }
          />
          <TouchableOpacity onPress={() => navigate('Cart')}>
            <ShoppingCart size={28} style={{ marginRight: 16 }} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Login')}>
            <UserCircle size={28} />
          </TouchableOpacity>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
