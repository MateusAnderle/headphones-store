import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

import { Box, HStack, Modal, Text, VStack } from 'native-base';

import { CaretRight } from 'phosphor-react-native';
import { formatCurrency } from '../../utils/formatCurrency';
import { Purchased, PurchasedItem } from '../../store/accountSlice';

interface PurchasesCardProps {
  data: Purchased;
}

export function PurchasesCard({ data }: PurchasesCardProps) {
  const [showModal, setShowModal] = useState(false);
  const purchaseDate = dayjs(data?.date);
  const purchaseDateFormatted = purchaseDate.format('DD/MM/YYYY - HH:mm');

  const totalAmount = data?.items.reduce((acc, obj) => {
    if (obj.attributes && typeof obj.attributes.price === 'number') {
      return acc + obj.attributes.price * obj.cartQuantity;
    }
    return acc;
  }, 0);

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
            {purchaseDateFormatted}
          </Text>
          <Text fontWeight="regular" fontSize="sm">
            Items: {data?.items?.length}
          </Text>
          <Text fontWeight="regular" fontSize="sm">
            Delivery: {formatCurrency(data?.deliveryFee)}
          </Text>
          <Text fontWeight="regular" fontSize="sm">
            Total: {formatCurrency(totalAmount)}
          </Text>
        </Box>

        <CaretRight size={25} color="#000" style={{ marginRight: 16 }} />
      </Box>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Order: {purchaseDateFormatted}</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              {data?.items.map((item: PurchasedItem) => {
                return (
                  <HStack
                    key={item.attributes.createdAt}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="medium">{item.attributes.model}</Text>
                    <Text color="muted.400">
                      {item?.attributes?.price &&
                        formatCurrency(
                          item.attributes.price * item?.cartQuantity
                        )}
                    </Text>
                  </HStack>
                );
              })}

              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Delivery</Text>
                <Text color="red.500">{formatCurrency(data?.deliveryFee)}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total Amount</Text>
                <Text color="green.500">{formatCurrency(totalAmount)}</Text>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </TouchableOpacity>
  );
}
