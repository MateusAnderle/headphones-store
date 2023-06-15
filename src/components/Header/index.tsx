import { Box, Input } from 'native-base';
import { UserCircle, SlidersHorizontal } from 'phosphor-react-native';

export function Header() {
  return (
    <Box flexDir="row" justifyContent="space-between">
      <Input
        flex={1}
        mr={3}
        placeholder="Filter by model"
        borderWidth={0}
        fontSize={14}
        alignItems="center"
      />
      <SlidersHorizontal size={30} style={{ marginRight: 16 }} />
      <UserCircle size={30} />
    </Box>
  );
}
