export const Button = ({
  variant = "primary",
  type = "button",
  style = null,
  onClick,
  children,
}) => {
  return (
    <button
      className={`button button-${variant}`}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
