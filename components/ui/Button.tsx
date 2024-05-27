import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  children,
}) => {
  const baseClassName =
    "text-center text-white border-none rounded-md px-3 py-2  bg-primary hover:bg-primary-dark duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed";

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClassName}>
      {children}
    </button>
  );
};

export default Button;