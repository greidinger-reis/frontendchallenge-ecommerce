export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ className, children, ...rest }) => {
  return (
    <button
      className={
        "flex items-center justify-center rounded px-4 py-2 text-white transition-all " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};
