import { createSlice } from '@reduxjs/toolkit';

export interface PurchasedItem {
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

export interface Purchased {
  date: string;
  items: PurchasedItem[];
  deliveryFee: number;
}

export interface AccountStateProps {
  purchased: Purchased[];
  success: string;
  loading: boolean;
}

const initialState: AccountStateProps = {
  purchased: [],
  success: '',
  loading: false,
};

export const accountSlice = createSlice({
  name: 'accountPurchases',
  initialState,
  reducers: {
    addPurchase: (state, action) => {
      const item = action.payload;
      state.purchased.push(item);
      state.success = 'Products added to your purchases';
    },
    clearPurchaseSuccess: (state) => {
      state.success = '';
    },
  },
});

export const { addPurchase, clearPurchaseSuccess } = accountSlice.actions;

export default accountSlice.reducer;
