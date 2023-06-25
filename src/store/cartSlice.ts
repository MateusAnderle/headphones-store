import { createSlice } from '@reduxjs/toolkit';

interface CartStateProps {
  productsList: ProductProps[];
  deliveryFee: number;
  error: string;
  success: boolean;
}

export interface ProductProps {
  id: string;
  attributes: {
    title?: string;
    description?: string;
    quantity?: number | undefined;
    price?: number;
    images:
      | {
          data:
            | {
                id: string | undefined;
                attributes:
                  | {
                      url: string | undefined;
                    }
                  | undefined;
              }[]
            | undefined;
        }
      | undefined;
    brand?: string;
    model?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  cartQuantity: number;
}

const initialState: CartStateProps = {
  productsList: [],
  deliveryFee: 30,
  error: '',
  success: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const item = action.payload;
      const checkProductExists = state.productsList.find(
        (product) => product.id === item.id
      );
      if (checkProductExists) {
        state.error = 'Product already added to cart';
      } else {
        state.productsList.push({ ...item, cartQuantity: 1 });
        state.success = true;
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.productsList.find((product) => product.id === id);
      const quantity = item?.attributes.quantity || 0;
      if (item && item.cartQuantity < quantity) {
        item.cartQuantity += 1;
      } else {
        state.error = 'Maximum available quantity of the product';
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.productsList.find((product) => product.id === id);
      if (item && item.cartQuantity > 1) {
        item.cartQuantity -= 1;
      } else {
        state.error = 'Minimum available quantity of the product';
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      state.productsList = state.productsList.filter(
        (product) => product.id !== id
      );
      state.error = 'Product removed from cart';
    },
    clearAddItemSuccess: (state) => {
      state.success = false;
    },
    clearAddItemError: (state) => {
      state.error = '';
    },
    clearCart: (state) => {
      state.productsList = [];
    },
  },
});

export const {
  addCartItem,
  clearAddItemSuccess,
  clearAddItemError,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
