"use client";
import { Provider } from "react-redux";
import InventoryDashboard from "./_components/InventoryDashboard";
import { store } from "./_store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <InventoryDashboard />
    </Provider>
  );
}
