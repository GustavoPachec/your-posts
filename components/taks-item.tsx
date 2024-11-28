import { Task } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div>
      <Card className="max-w-sm w-full mx-auto shadow-lg hover:shadow:-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center p-4">
          <p className="text-sm text-gray-600">
            {task.description || "Sem descrição."}
          </p>
          <div className="flex space-x-2">
            <button
              aria-label="Editar tarefa"
              className="p-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              <Link href={`/tasks/${task.id}`}>
                <Edit className="w-5 h-5 text-gray-700" />
              </Link>
            </button>
            <button
              aria-label="Exluir tarefa"
              className="p-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskItem;
