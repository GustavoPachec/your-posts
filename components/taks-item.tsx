import { Task } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Edit, Trash2, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "PENDING":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "NOT_INITIALIZED":
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div>
      <Card className="max-w-sm w-full mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="space-y-2">
          <CardTitle className="text-lg font-bold text-gray-200">
            {task.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 p-4">
          {/* Descrição da tarefa */}
          <p className="text-sm text-gray-500">
            {task.description || "Sem descrição."}
          </p>

          {/* Status e Botões */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className="text-sm text-gray-600">
                {task.status === "COMPLETED"
                  ? "Concluída"
                  : task.status === "PENDING"
                  ? "Em progresso"
                  : "Não iniciada"}
              </span>
            </div>

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
                aria-label="Excluir tarefa"
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskItem;
