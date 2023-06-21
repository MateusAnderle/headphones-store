import { useState } from 'react';

import { Box, Button, HStack, Modal, Text, VStack } from 'native-base';
import { CaretRight } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export function PurchasesCard() {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  return (
    <TouchableOpacity onPress={handleOpenModal}>
      <Box
        bgColor="white"
        p={3}
        borderRadius={5}
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Text fontWeight="semibold" fontSize="md">
            21/06/2023 - 18:35
          </Text>
          <Text fontWeight="regular" fontSize="sm">
            Items: 12
          </Text>
          <Text fontWeight="regular" fontSize="sm">
            Delivery: U$ 10,00
          </Text>
          <Text fontWeight="regular" fontSize="sm">
            Total: U$ 1200,00
          </Text>
        </Box>

        <CaretRight size={25} color="#000" style={{ marginRight: 16 }} />
      </Box>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Order - 21/06/2023 - 18:35</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Headphone sony</Text>
                <Text color="muted.400">U$ 298.77</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Headphone Bose</Text>
                <Text color="muted.400">U$ 298.77</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Headphone Beats</Text>
                <Text color="muted.400">U$ 298.77</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Delivery</Text>
                <Text color="muted.600">U$ 38.84</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total Amount</Text>
                <Text color="green.500">U$ 337.61</Text>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </TouchableOpacity>
  );
}
