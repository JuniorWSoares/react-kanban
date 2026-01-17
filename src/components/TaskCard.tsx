import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import type React from "react";
import type { Task, TaskPriority, TaskStatus } from "../entities/Task";
import { useTasks } from "../hooks/useTasks";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask, updateTask } = useTasks()

  const getActionText = (status: TaskStatus) => {
    const actionsTexts = {
        "todo": "Iniciar",
        "doing": "Concluir",
        "done": "Arquivar"
    }
    return actionsTexts[status]
  }

  const getActionColor = (status: TaskStatus) => {
    const actionColors: { [key: string]: "indigo" | "green" | "bronze"} = {
        "todo": "indigo",
        "doing": "green",
        "done": "bronze"
    }
    return actionColors[status]
  }

  const getPriorityColor = (priority: TaskPriority) => {
    const priorityColors: { [key: string]: "sky" | "amber" | "tomato" } = {
      "low": "sky",
      "medium": "amber",
      "high": "tomato",
    };

    return priorityColors[priority];
  };
  
  const handleDelete = (id: string) => {
    if(confirm("Tem certeza que deseja excluir essa tarefa?")) {
      deleteTask(id)
    }
  } 

  const handleUpdate = (id: string, status: TaskStatus) => {
    if(status === "todo") {
      updateTask(id, {status: "doing"})
    } else if(status === "doing") {
      updateTask(id, {status: "done"})
    }
  }

  return (
    <Card>
      <Flex align={"center"} gap={"4"}>
        <Heading size={"3"} as="h3" weight={"bold"}>
          {task.title}
        </Heading>
        <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
      </Flex>

      <Text as="p" my={"4"}>{task.description}</Text>

      <Flex gap={"2"} justify={"end"}>
        {task.status !== "done" && (
          <Button color={getActionColor(task.status)} onClick={() => handleUpdate(task.id, task.status)}>
            {getActionText(task.status)}
          </Button>
        )}
        <Button color="red" onClick={() => handleDelete(task.id)}>Excluir</Button>
      </Flex>
    </Card>
  );
};
