import React, { FC, MouseEvent, ReactNode } from "react";
import { cn } from "../../utils/cn";
import "./Button.css";

const cls = cn("button");

interface ButtonProps {
  className?: string;
  onClick: (e: MouseEvent) => void;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
  return (
    <div className={cls("", [className])} onClick={onClick}>
      {children}
    </div>
  );
};
