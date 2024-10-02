import { classNames } from "primereact/utils";

export const editorStyle = {
  root: {
    className: classNames(
      "font-sans text-gray-600 dark:text-white/80 bg-white dark:bg-[#1d2a39] transition-colors  duration-200 appearance-none   rounded-md",
      "dark:focus:border-primary focus:border-primary  border-1 border-gray-300 dark:border-form-strokedark"
    ),
  },
  toolbar: {
    className: classNames(
      "rounded-tr-md rounded-tl-md flex space-x-2",
      "border border-gray-300 dark:border-[#3d4d60] box-border font-sans px-2 py-1",
      "text-gray-600 dark:text-white/80 bg-white dark:bg-[#1d2a39] "
    ),
  },
  formats: {
    className: classNames("inline-block align-middle", "mr-4"),
  },
  header: {
    className: classNames(
      "text-gray-700 inline-block float-left text-base font-medium h-6 relative align-middle",
      "w-28",
      "border-0 text-gray-600"
    ),
  },
  content: {
    className: classNames(
      "ql-editor text-black dark:text-whiten text-lg font-medium border-none ",
      "border-0 text-gray-600"
    ),
  },
};
