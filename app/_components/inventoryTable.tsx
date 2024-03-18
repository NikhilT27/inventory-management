"use client";

import Image from "@/node_modules/next/image";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import deleteIcon from "../../public/images/svg/delete-icon.svg";
import editIcon from "../../public/images/svg/edit-icon.svg";
import visibleOffIcon from "../../public/images/svg/visible-off-icon.svg";
import visibleOnIcon from "../../public/images/svg/visible-on-icon.svg";
import {
  deleteProduct,
  selectInventoryData,
  selectIsAdmin,
  setIsEditProductModalOpen,
  toggleEnableProduct,
} from "../appSlice";
import { useAppDispatch, useAppSelector } from "../_hooks/reduxHooks";

export default function InventoryTable() {
  const inventoryData = useAppSelector(selectInventoryData);
  const isAdmin = useAppSelector(selectIsAdmin);
  const dispatch = useAppDispatch();

  function handleEdit(data: any) {
    dispatch(
      setIsEditProductModalOpen({
        isOpen: true,
        data: data,
      })
    );
  }

  function handleEnableToggle(data: any) {
    dispatch(toggleEnableProduct(data));
  }

  function handleDelete(data: any) {
    dispatch(deleteProduct(data));
  }

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row: any) => row?.name, {
      id: "name",
      header: () => (
        <div className="flex h-full min-w-max items-start border-b border-[#3e3e41] justify-start p-[16px] text-start">
          <span className="font-lato text-xs leading-[16px] tracking-[0.6px] text-[#cce067] px-4 py-3 bg-primary rounded-[16px] font-light">
            Name
          </span>
        </div>
      ),
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      }) => {
        return (
          <div className="flex h-full flex-col gap-[8px] border-b border-[#3e3e41] p-4">
            <span className="min-w-max text-start font-lato text-[14px] text-white font-normal leading-[20px] tracking-[0.2px]">
              {info.getValue()}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor((row: any) => row?.category, {
      id: "category",
      header: () => (
        <div className="flex h-full min-w-max items-start border-b border-[#3e3e41] justify-start p-[16px] text-start">
          <span className="font-lato text-xs leading-[16px] tracking-[0.6px] text-[#cce067] px-4 py-3 bg-primary rounded-[16px] font-light">
            Category
          </span>
        </div>
      ),
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      }) => {
        return (
          <div className="flex h-full flex-col gap-[8px] border-b border-[#3e3e41] p-4">
            <span className="min-w-max text-start font-lato text-[14px] text-white font-normal leading-[20px] tracking-[0.2px]">
              {info.getValue()}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor((row: any) => row?.price, {
      id: "price",
      header: () => (
        <div className="flex h-full min-w-max items-start border-b border-[#3e3e41] justify-start p-[16px] text-start">
          <span className="font-lato text-xs leading-[16px] tracking-[0.6px] text-[#cce067] px-4 py-3 bg-primary rounded-[16px] font-light">
            Price
          </span>
        </div>
      ),
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      }) => {
        return (
          <div className="flex h-full flex-col gap-[8px] border-b border-[#3e3e41] p-4">
            <span className="min-w-max text-start font-lato text-[14px] text-white font-normal leading-[20px] tracking-[0.2px]">
              {info.getValue()}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor((row: any) => row?.quantity, {
      id: "quantity",
      header: () => (
        <div className="flex h-full min-w-max items-start border-b border-[#3e3e41] justify-start p-[16px] text-start">
          <span className="font-lato text-xs leading-[16px] tracking-[0.6px] text-[#cce067] px-4 py-3 bg-primary rounded-[16px] font-light">
            Quantity
          </span>
        </div>
      ),
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      }) => {
        return (
          <div className="flex h-full flex-col gap-[8px] border-b border-[#3e3e41] p-4">
            <span className="min-w-max text-start font-lato text-[14px] text-white font-normal leading-[20px] tracking-[0.2px]">
              {info.getValue()}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor((row: any) => row?.value, {
      id: "value",
      header: () => (
        <div className="flex h-full min-w-max items-start border-b border-[#3e3e41] justify-start p-[16px] text-start">
          <span className="font-lato text-xs leading-[16px] tracking-[0.6px] text-[#cce067] px-4 py-3 bg-primary rounded-[16px] font-light">
            Value
          </span>
        </div>
      ),
      cell: (info: {
        getValue: () =>
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | React.ReactPortal
          | null
          | undefined;
      }) => {
        return (
          <div className="flex h-full flex-col gap-[8px] border-b border-[#3e3e41] p-4">
            <span className="min-w-max text-start font-lato text-[14px] text-white font-normal leading-[20px] tracking-[0.2px]">
              {info.getValue()}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor((row: any) => "action", {
      id: "action",
      header: () => (
        <div className="flex h-full min-w-max items-start border-b border-[#3e3e41] justify-start p-[16px] text-start">
          <span className="font-lato text-xs leading-[16px] tracking-[0.6px] text-[#cce067] px-4 py-3 bg-primary rounded-[16px] font-light">
            ACTION
          </span>
        </div>
      ),
      cell: (info: any) => {
        return (
          <div className="flex gap-2 border-b border-[#3e3e41] p-4">
            <button
              type="button"
              onClick={() => handleEdit(info.row.original)}
              disabled={!isAdmin || !info.row.original?.is_enabled}
              className="disabled:grayscale"
            >
              <Image
                priority
                src={editIcon}
                alt="Edit product"
                className="w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[#c597d4]"
              />
            </button>
            <button
              type="button"
              onClick={() => handleEnableToggle(info.row.original)}
              disabled={!isAdmin}
              className="disabled:grayscale"
            >
              {info.row.original?.is_enabled ? (
                <Image
                  priority
                  src={visibleOnIcon}
                  alt="Edit product"
                  className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-[#c597d4]"
                />
              ) : (
                <Image
                  priority
                  src={visibleOffIcon}
                  alt="Edit product"
                  className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-[#c597d4]"
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleDelete(info.row.original)}
              disabled={!isAdmin}
              className="disabled:grayscale"
            >
              <Image
                priority
                src={deleteIcon}
                alt="Edit product"
                className="w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-[#c597d4]"
              />
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: inventoryData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col overflow-auto bg-table border border-[#3e3e41] border-b-0 rounded-lg">
      <div className="relative flex grow overflow-x-auto overflow-y-auto">
        <table className="h-fit w-full border-collapse">
          <thead className="sticky top-0 z-[2] bg-transparent">
            {table
              .getHeaderGroups()
              .map(
                (headerGroup: {
                  id: React.Key | null | undefined;
                  headers: any[];
                }) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header: {
                        id: React.Key | null | undefined;
                        isPlaceholder: any;
                        column: { columnDef: { header: any } };
                        getContext: () => any;
                      }) => (
                        <th key={header.id} className="p-0 align-top">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      )
                    )}
                  </tr>
                )
              )}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <tr key={row.id} className="group relative">
                  {row.getVisibleCells().map((cell: any) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr key={"empty-table"} className="">
                <td
                  colSpan={6}
                  className="text-center font-lato text-[14px] text-white font-normal leading-[20px] tracking-[0.2px] border-b border-[#3e3e41] p-8"
                >
                  No data
                </td>
              </tr>
            )}
            {}
          </tbody>
        </table>
      </div>
    </div>
  );
}
