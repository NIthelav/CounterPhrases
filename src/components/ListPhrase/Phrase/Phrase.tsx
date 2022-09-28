import React, {
  FC,
  useState,
  useCallback,
  ChangeEvent,
  MouseEvent,
} from "react";
import {
  increment,
  decrement,
  setValue,
  selectCount,
  changeName,
} from "../../../app/counterSlice/slice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";
import { cn } from "../../../utils/cn";
import "./Phrase.css";

const cls = cn("phrase");

interface PhraseProps {
  name: string;
}

export const Phrase: FC<PhraseProps> = ({ name }) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount(name));

  const onClickIncrement = useCallback(
    (e: MouseEvent) => {
      dispatch(increment(name));
    },
    [dispatch, name]
  );
  const onClickDecrement = useCallback(
    (e: MouseEvent) => {
      if (count >= 1) dispatch(decrement(name));
    },
    [dispatch, count, name]
  );

  const onChangeCount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(parseInt(e.target.value)) && parseInt(e.target.value) >= 0)
        dispatch(setValue({ name, value: parseInt(e.target.value) }));
    },
    [dispatch, name]
  );

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeName({ curName: name, newName: e.target.value }));
    },
    [dispatch, name]
  );

  return (
    <div className={cls()}>
      <Button onClick={onClickDecrement}>-</Button>
      <Input
        className={cls("countInput")}
        value={`${count}`}
        onChange={onChangeCount}
      />
      <Button onClick={onClickIncrement}>+</Button>

      <Input
        className={cls("nameInput")}
        value={name}
        onChange={onChangeValue}
      />
    </div>
  );
};
