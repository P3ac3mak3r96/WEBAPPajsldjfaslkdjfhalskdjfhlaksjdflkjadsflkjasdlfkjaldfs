import { configureStore } from '@reduxjs/toolkit';
import bluetoothReducer from './slices/bluetoothSlice';
import modesReducer from './slices/modesSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    bluetooth: bluetoothReducer,
    modes: modesReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
