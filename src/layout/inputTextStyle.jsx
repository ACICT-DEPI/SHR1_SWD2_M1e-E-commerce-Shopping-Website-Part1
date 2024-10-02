import { classNames } from "primereact/utils";

export const inputTextStyle = {
  root: ({ props, context }) => ({
    className: classNames(
      "m-0",
      "font-sans text-gray-600 dark:text-white/80 bg-white dark:focus:border-primary focus:border-primary  border-1 border-gray-300 dark:border-form-strokedark transition-colors duration-200 appearance-none focus:shadow-none dark:focus:shadow-none font-normal	rounded-md dark:bg-[#1d2a39]",
      {
        "hover:border-blue-500  focus:outline-none focus:outline-offset-0 ":
          !context.disabled,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },
      {
        "text-lg px-4 py-4": props.size === "large",
        "text-xs px-2 py-2": props.size === "small",
        "p-3 text-base": props.size == null,
      }
    ),
  }),
};
