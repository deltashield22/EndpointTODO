import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Task } from "../types";

import { ToDoRow } from "./ToDoRow";
import { LoadingRow } from "./ToDoRowSkeleton";

const Container = styled.div`
  border: 1px solid grey;
  border-bottom: none;
  border-radius: 2px;
  box-sizing: border-box;
`;

const sampleData = [
  {
    id: "1",
    description: "File 2020 Taxes",
    isComplete: true,
    dueDate: "2020-03-10T17:50:44.673Z"
  },
  {
    id: "2",
    description: "Fold laundry",
    isComplete: true,
    dueDate: null
  },
  {
    id: "3",
    description: "Call Mom",
    isComplete: false,
    dueDate: "2020-06-26T19:00:00.000Z"
  },
  {
    id: "4",
    description: "Walk the dog",
    isComplete: false,
    dueDate: null
  },
  {
    id: "5",
    description: "Feed the cat",
    isComplete: false,
    dueDate: "2020-06-24T15:45:00.000Z"
  },
  {
    id: "6",
    description: "Run LA marathon",
    isComplete: false,
    dueDate: "2021-03-21T13:30:00.000Z"
  },
  {
    id: "7",
    description: "Coding Challenge",
    isComplete: false,
    dueDate: "2022-10-26T19:00:00.000Z"
  },
  {
    id: "8",
    description: "Bathe dog",
    isComplete: false,
    dueDate: null
  }
];

export const ToDoList: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toDoTasks, setToDoTasks] = useState<Task[]>([]);
  const currentDate = new Date();
  const overDueTasks: Task[] = [];
  const completedTasks: Task[] = [];
  const theRest: Task[] = [];

  useEffect(() => {
    // fetch tasks, on complete set state and set loading to false
    const tasks = sampleData.map((task) => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null
    }));
    setToDoTasks(tasks);

    // if fetch fails, display error message
  }, []);

  toDoTasks.forEach((task) => {
    const { dueDate, isComplete } = task;
    if (dueDate && dueDate < currentDate && !isComplete) {
      overDueTasks.push(task);
    } else if (isComplete) {
      completedTasks.push(task);
    } else {
      theRest.push(task);
    }
  });

  const handleTaskCheck = (task: Task, isComplete: boolean) => {
    // trigger call to api to update item
    const taskIndex = toDoTasks.indexOf(task);
    const upadatedTasks = [...toDoTasks];
    upadatedTasks.splice(taskIndex, 1, { ...task, isComplete });
    setToDoTasks(upadatedTasks);

    // if there is an error response, refresh tasks by refetching and show error
  };

  return (
    <Container>
      {isLoading ? (
        [...Array(6)].map((task) => <LoadingRow />)
      ) : (
        <>
          {overDueTasks.map((task) => (
            <ToDoRow
              task={task}
              isOverdue
              handleCheckboxClick={handleTaskCheck}
            />
          ))}
          {theRest.map((task) => (
            <ToDoRow task={task} handleCheckboxClick={handleTaskCheck} />
          ))}
          {completedTasks.map((task) => (
            <ToDoRow task={task} handleCheckboxClick={handleTaskCheck} />
          ))}
        </>
      )}
    </Container>
  );
};
