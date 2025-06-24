import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { enableMapSet } from 'immer';
import tableReducer from './tableSlice';

// Enable Immer MapSet plugin to handle Set objects
enableMapSet();

// Transform to handle Set serialization
const setTransform = createTransform(
  // Transform state on its way to being serialized and persisted
  (inboundState: any) => {
    return {
      ...inboundState,
      editingRows: inboundState.editingRows ? Array.from(inboundState.editingRows) : [],
    };
  },
  // Transform state being rehydrated
  (outboundState: any) => {
    return {
      ...outboundState,
      editingRows: new Set(outboundState.editingRows || []),
    };
  },
  // Define which reducers this transform gets called for
  { whitelist: ['table'] }
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['columns', 'theme'], // Only persist columns and theme
  transforms: [setTransform],
};

const persistedReducer = persistReducer(persistConfig, tableReducer);

export const store = configureStore({
  reducer: {
    table: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['table.editingRows'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;