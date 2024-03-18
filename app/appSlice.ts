import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./_store/store";

export interface Product {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  is_enabled: boolean;
}

interface AppState {
  isAdmin: boolean;
  inventoryData: Product[];
  isEditModalOpen: boolean;
  editModalData: Product | null;
}

const initialState: AppState = {
  isAdmin: true,
  inventoryData: [],
  isEditModalOpen: false,
  editModalData: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleAdmin: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    setInventoryData: (state, action: PayloadAction<Product[]>) => {
      state.inventoryData = action.payload;
    },
    setIsEditProductModalOpen: (
      state,
      action: PayloadAction<{ isOpen: boolean; data: Product | null }>
    ) => {
      state.isEditModalOpen = action.payload.isOpen;
      state.editModalData = action.payload.data;
    },
    toggleEnableProduct: (state, action: PayloadAction<Product>) => {
      const updatedProducts = state.inventoryData?.map((product: Product) => {
        if (product.name === action.payload?.name) {
          return {
            ...action.payload,
            is_enabled: !product.is_enabled,
          };
        } else {
          return product;
        }
      });

      state.inventoryData = updatedProducts;
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      const updatedProducts = state.inventoryData?.filter(
        (product: Product) => product.name !== action.payload?.name
      );

      state.inventoryData = updatedProducts;
    },
  },
});

export const {
  toggleAdmin,
  toggleEnableProduct,
  setInventoryData,
  setIsEditProductModalOpen,
  deleteProduct,
} = appSlice.actions;

export const selectIsAdmin = (state: RootState) => state.app.isAdmin;
export const selectInventoryData = (state: RootState) =>
  state.app.inventoryData;
export const selectIsEditModalOpen = (state: RootState) =>
  state.app.isEditModalOpen;
export const selectEditModalData = (state: RootState) =>
  state.app.editModalData;

export default appSlice.reducer;
