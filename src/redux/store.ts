// import { configureStore } from "@reduxjs/toolkit"

// export const store = configureStore({
//     reducer: {

//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: false,
//     })
// })

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppStore = typeof store;
// redux/store.ts
// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["refreshToken", "user"],
};

const persistedAuth = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: { auth: persistedAuth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore redux-persist actions
        ignoredActions: [
          "persist/PERSIST",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

