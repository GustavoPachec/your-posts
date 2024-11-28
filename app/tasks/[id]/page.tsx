import { db } from "@/app/_lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, MenuIcon } from "lucide-react";
import Link from "next/link";

interface TaskPageProps {
  params: {
    id: string;
  };
}

const TaskPage = async ({ params }: TaskPageProps) => {
  // Chamar o banco de dados
  const task = await db.task.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6 max-w-md">
          <CardHeader>
            <CardTitle>Erro</CardTitle>
            <CardDescription>Tarefa não encontrada.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Voltar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <Card className="w-full max-w-2xl">
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Descrição</h2>
            <p className="text-gray-600">
              {task.description || "Nenhuma descrição disponível."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Status:</h2>
            <h1>em progresso...</h1>
          </div>
          <div className="flex justify-end">
            <Button variant="default">Editar Tarefa</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskPage;
