import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import cartSlice from './cartSlice';
import accountSlice from './accountSlice';

const persistConfig = {
  key: 'accountPurchases',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, accountSlice);

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    account: persistedReducer,
  },
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
