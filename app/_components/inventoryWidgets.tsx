"use client";

import { Product, selectInventoryData } from "../appSlice";
import { useAppSelector } from "../_hooks/reduxHooks";

interface EachInventoryWidget {
  icon: string;
  title: string;
  value: string | number;
}

const EachInventoryWidget = ({ icon, title, value }: EachInventoryWidget) => {
  return (
    <div className="flex p-4 items-start rounded-lg bg-secondary gap-4">
      <span>{icon}</span>
      <div className="flex flex-col gap-4">
        <span className="text-white text-sm">{title}</span>
        <span className="text-white text-4xl">{value}</span>
      </div>
    </div>
  );
};

export default function InventoryWidgets() {
  const inventoryData = useAppSelector(selectInventoryData);

  function getTotalProduct() {
    return inventoryData?.filter(
      (eachProduct: Product) => eachProduct?.is_enabled
    ).length;
  }

  function getTotalStoreValue() {
    return inventoryData
      .filter((eachProduct: Product) => eachProduct?.is_enabled)
      .reduce(
        (accumulator: any, currentValue: any) =>
          accumulator + parseInt(currentValue?.value?.replace(/\$/g, "")),
        0
      );
  }

  function getOutofStocks() {
    return inventoryData.filter(
      (eachProduct: Product) => !eachProduct?.is_enabled
    ).length;
  }

  function getNoOfCategory() {
    let categories: string[] = [];
    inventoryData.map((eachProduct: Product) => {
      if (categories?.indexOf(eachProduct?.category) <= -1) {
        categories.push(eachProduct?.category);
      }
    });
    return categories?.length;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      <EachInventoryWidget
        icon={""}
        title={"Total product"}
        value={getTotalProduct()}
      />
      <EachInventoryWidget
        icon={""}
        title={"Total store value"}
        value={getTotalStoreValue()}
      />
      <EachInventoryWidget
        icon={""}
        title={"Out of stocks"}
        value={getOutofStocks()}
      />
      <EachInventoryWidget
        icon={""}
        title={"No of Category"}
        value={getNoOfCategory()}
      />
    </section>
  );
}
