import { classNames } from "primereact/utils";

export const ratingStyle = {
  root: ({ props }) => ({
    className: classNames("relative flex items-center", "gap-2", {
      "opacity-60 select-none pointer-events-none cursor-default":
        props.disabled,
    }),
  }),
  cancelitem: ({ context }) => ({
    className: classNames(
      "inline-flex items-center cursor-pointer shadow-none!",
      {
        "outline-none outline-offset-0 shadow-none!": context.focused,
      }
    ),
  }),
  cancelicon: {
    className: classNames(
      "text-red-500",
      "w-5 h-5",
      "transition duration-200 ease-in"
    ),
  },
  item: ({ props, context }) => ({
    className: classNames(
      "inline-flex items-center shadow-none!",
      {
        "cursor-pointer": !props.readOnly,
        "cursor-default": props.readOnly,
      },
      {
        "outline-none outline-offset-0  shadow-none!": context.focused,
      }
    ),
  }),
  officon: {
    className: classNames(
      "text-gray-700 focus:text-blue-400",
      "w-5 h-5",
      "transition duration-200 ease-in"
    ),
  },
  onicon: {
    className: classNames(
      "text-blue-500",
      "w-5 h-5",
      "transition duration-200 ease-in"
    ),
  },
};
