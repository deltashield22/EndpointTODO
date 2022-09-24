import React, { FC, useState } from "react";
import styled, { css } from "styled-components";
import { Task } from "../types";

type RowStyleProps = {
  isOverdue: boolean;
  isComplete: boolean;
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 0 10px;

  ${(props: RowStyleProps) =>
    props.isOverdue
      ? css`
          background: pink;
        `
      : ""}

  ${(props: RowStyleProps) =>
    props.isComplete
      ? css`
          background: lightgreen;
        `
      : ""}
`;

const DescriptionText = styled.span`
  padding-left: 5px;

  ${(props: RowStyleProps) =>
    props.isComplete
      ? css`
          background: lightgreen;
          text-decoration: line-through;
        `
      : ""}
`;

export const ToDoRow = ({
  task,
  handleCheckboxClick,
  isOverdue
}: {
  task: Task;
  handleCheckboxClick: (task: Task, isComplete: boolean) => void;
  isOverdue?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(task.isComplete);
  // todo: format date as mm/dd/yyyy
  const dueDate = task.dueDate ? new Date(task.dueDate).toDateString() : null;

  return (
    <Row isComplete={task.isComplete} isOverdue={isOverdue}>
      <p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            handleCheckboxClick(task, !isChecked);
          }}
        />
        <DescriptionText isComplete={task.isComplete}>
          {task.description}
        </DescriptionText>
      </p>
      <span>{dueDate}</span>
    </Row>
  );
};
