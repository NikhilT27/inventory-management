"use client";
import { Switch } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../_hooks/reduxHooks";
import { selectIsAdmin, toggleAdmin } from "../appSlice";

export default function UserToggle() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const dispatch = useAppDispatch();

  function handleToggle() {
    dispatch(toggleAdmin());
  }

  return (
    <div className="flex items-center">
      <span className="font-lato text-primary-text text-xs">admin</span>
      <Switch
        checked={!isAdmin}
        onChange={handleToggle}
        className={`${!isAdmin ? "bg-[#7d8844]" : "bg-[#5d5d5e]"}
          mx-[16px] relative inline-flex h-[16px] w-[30px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">User role setting</span>
        <span
          aria-hidden="true"
          className={`${
            !isAdmin
              ? "translate-x-[16px] translate-y-[-4px] bg-[#e6fd73]"
              : "translate-x-[-10px] translate-y-[-4px] bg-[#e0e0e0]"
          }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <span className="font-lato text-primary-text text-xs">user</span>
    </div>
  );
}
