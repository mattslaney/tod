"use client"

import Main from "./components/layout/Main";
import { Provider } from "react-redux";
import { store } from "./store";
import { PhoneProvider } from "./contexts/Phones";

export default function Home() {
  return (
    <PhoneProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </PhoneProvider>
  );
}
