import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import "./Input.css";

const cls = cn("input");

interface InputProps {
  className: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({
  className,
  value,
  onChange: originalOnChange,
}) => {
  const [valueInput, setValueInput] = useState(value);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  }, []);

  useEffect(() => {
    setValueInput(value);
  }, [value]);

  return (
    <input
      className={cls("", [className])}
      value={valueInput}
      onChange={onChangeHandler}
      onBlur={originalOnChange}
    />
  );
};
