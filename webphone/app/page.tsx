"use client"

import Main from "./components/layout/Main";
import { PhoneSettingsProvider } from "./contexts/PhoneSettings";

export default function Home() {
  return (
    <PhoneSettingsProvider>
      <Main />
    </PhoneSettingsProvider>
  );
}
