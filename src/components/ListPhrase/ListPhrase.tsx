import React, { useCallback, useState, ChangeEvent } from "react";
import { addPhrase, selectList } from "../../app/counterSlice/slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Phrase } from "./Phrase/Phrase";
import { cn } from "../../utils/cn";
import "./ListPhrase.css";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

const cls = cn("listPhrase");

export const ListPhrase = () => {
  const dispatch = useAppDispatch();
  const phraseList = useAppSelector(selectList);

  const [value, setValue] = useState("");
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );

  return (
    <div className={cls()}>
      <Input className={cls("input")} value={value} onChange={onChange} />
      <Button
        className={cls("button")}
        onClick={() => dispatch(addPhrase(value))}
      >
        Add phrase
      </Button>
      <div className={cls("list")}>
        {phraseList.map((name) => (
          <Phrase name={name} />
        ))}
      </div>
    </div>
  );
};
