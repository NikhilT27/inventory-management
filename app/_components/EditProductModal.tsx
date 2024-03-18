import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  Fragment,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  Product,
  selectEditModalData,
  selectInventoryData,
  selectIsEditModalOpen,
  setInventoryData,
  setIsEditProductModalOpen,
} from "../appSlice";
import { useAppSelector } from "../_hooks/reduxHooks";
import modalCloseIcon from "../../public/images/svg/modal-close-icon.svg";
import Image from "@/node_modules/next/image";

const EditUserProductForm = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch();

  const inventoryData = useAppSelector(selectInventoryData);
  const editModalData = useAppSelector(selectEditModalData);

  let initialValues = {
    name: editModalData?.name ?? "",
    category: editModalData?.category ?? "",
    price: editModalData?.price?.replace(/\$/g, "") ?? "",
    quantity: editModalData?.quantity ?? 0,
    value: editModalData?.value?.replace(/\$/g, "") ?? "",
  };

  let validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
    quantity: Yup.string().required("Required"),
    value: Yup.string().required("Required"),
  });

  let onSubmit = (values: {
    name: string;
    category: string;
    price: string;
    quantity: number;
    value: string;
  }) => {
    const updatedProducts = inventoryData.map((product: Product) => {
      if (product.name === values?.name) {
        return {
          ...values,
          price: `$${values.price}`,
          value: `$${parseInt(values.price) * values.quantity}`,
          is_enabled: product.is_enabled,
        };
      } else {
        return product;
      }
    });

    dispatch(setInventoryData(updatedProducts));
    closeModal();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <form
            className="complete-hidden-scroll-style flex grow flex-col gap-4 overflow-y-auto"
            onSubmit={formik.handleSubmit}
          >
            <div className="grid grid-cols-2 gap-[20px]">
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="category"
                  className="font-lato text-sm font-light text-white"
                >
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  className="text-[#9b9c9a] rounded-[14px] bg-[#3e413c] px-[16px] py-[14px] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
                  placeholder="Enter"
                />
                {formik.touched.category && formik.errors.category ? (
                  <div className="font-lato text-form-xs text-[#cc3300]">
                    {formik.errors.category}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="price"
                  className="font-lato text-sm font-light text-white"
                >
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.handleChange(e);
                    formik.setFieldValue(
                      "value",
                      Number(e.target.value) * Number(formik.values.quantity)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  className="text-[#9b9c9a] rounded-[14px] bg-[#3e413c] px-[16px] py-[14px] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
                  placeholder="Enter"
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="font-lato text-form-xs text-[#cc3300]">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="quantity"
                  className="font-lato text-sm font-light text-white"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.handleChange(e);
                    formik.setFieldValue(
                      "value",
                      Number(e.target.value) * Number(formik.values.price)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                  className="text-[#9b9c9a] rounded-[14px] bg-[#3e413c] px-[16px] py-[14px] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
                  placeholder="Enter"
                />
                {formik.touched.quantity && formik.errors.quantity ? (
                  <div className="font-lato text-form-xs text-[#cc3300]">
                    {formik.errors.quantity}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="value"
                  className="font-lato text-sm font-light text-white"
                >
                  Value
                </label>
                <input
                  id="value"
                  name="value"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.value}
                  className="text-[#9b9c9a] rounded-[14px] bg-[#3e413c] px-[16px] py-[14px] font-lato placeholder:text-[#9A9A9A] hover:outline-0 focus:outline-0"
                  placeholder="Enter"
                  disabled={true}
                />
                {formik.touched.value && formik.errors.value ? (
                  <div className="font-lato text-form-xs text-[#cc3300]">
                    {formik.errors.value}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end gap-[8px] font-lato text-[#696969]">
              <button
                type="button"
                onClick={closeModal}
                className="flex w-fit items-center justify-center rounded-[14px] bg-transparent px-[16px] py-[10px] font-lato font-light text-[#d9fa53] disabled:opacity-[0.38]"
              >
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="flex w-fit items-center justify-center rounded-[14px] bg-[#3e413c] px-[16px] py-[10px] font-lato font-light text-white disabled:opacity-[0.38]"
              >
                <span>Save</span>
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default function EditProductModal() {
  const isEditModalOpen = useAppSelector(selectIsEditModalOpen);

  const editModalData = useAppSelector(selectEditModalData);

  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setIsEditProductModalOpen({ isOpen: false, data: null }));
  }

  return (
    <>
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-[.67]" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex h-screen max-h-screen min-h-full grow items-center justify-center text-center">
                <Dialog.Panel className="relative flex h-fit w-full max-w-[498px] rounded-[14px] transform flex-col gap-[32px] overflow-hidden bg-[#292b26] p-[30px] m-[20px] text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end md:absolute md:top-0 md:right-0">
                    <button
                      type="button"
                      className="flex justify-end focus:outline-none md:absolute md:top-[16px] md:right-[16px] p-[16px] rounded-[14px] bg-[#3e413c]"
                      onClick={closeModal}
                    >
                      <Image
                        priority
                        src={modalCloseIcon}
                        alt="Close edit modal"
                        className="w-[16px] h-[16px] min-w-[16px] min-h-[16px]"
                      />
                    </button>
                  </div>
                  <Dialog.Title as="div" className="flex flex-col gap-2">
                    <div className="flex flex-col gap-[2px]">
                      <h4 className="text-3xl text-white font-light">
                        Edit Product
                      </h4>
                      <span className="text-white font-light min-h-[24px]">
                        {editModalData?.name}
                      </span>
                    </div>
                  </Dialog.Title>
                  <EditUserProductForm closeModal={closeModal} />
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
