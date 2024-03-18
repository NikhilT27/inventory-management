"use client";
import { useEffect, useState } from "react";
import { Product, setInventoryData } from "../appSlice";
import EditProductModal from "../_components/EditProductModal";
import InventoryTable from "../_components/inventoryTable";
import InventoryWidgets from "../_components/inventoryWidgets";
import Navbar from "../_components/navbar";
import { useAppDispatch } from "../_hooks/reduxHooks";

export default function InventoryDashboard() {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setLoading(false);
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        let newInventoryData = responseJson?.map((eachProduct: Product) => {
          return { ...eachProduct, is_enabled: true };
        });
        dispatch(setInventoryData(newInventoryData));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col bg-primary ">
        <Navbar />
        <section className="flex flex-col flex-grow gap-4 p-4">
          <h3 className="flex items-center gap-[16px] text-white text-4xl font-extralight">
            Inventory stats
          </h3>
          <InventoryWidgets />
          <InventoryTable />
        </section>
      </main>
      <EditProductModal />
    </>
  );
}
