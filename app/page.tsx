import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import TaskItem from "@/components/taks-item";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Home = async () => {
  // chamar o banco
  const tasks = await db.task.findMany({});

  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-screen">
        <div className="p-5 w-full max-w-4xl flex flex-col items-center justify-center flex-1">
          {/* Saudações e data */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Olá, Gustavo</h2>
            <p className="text-sm sm:text-base text-gray-500">
              Segunda-feira, 29 de Novembro
            </p>
          </div>

          {/* Barra de busca */}
          <div className="flex items-center gap-2 mb-6 w-full max-w-md">
            <Input placeholder="Encontre suas tarefas..." className="flex-1" />
            <Button className="w-20">
              <SearchIcon />
            </Button>
          </div>

          {/* Título da seção de tarefas */}
          <div className="flex justify-between items-center w-full max-w-4xl mb-3">
            <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-400">
              Tarefas
            </h2>
            <Button className="gap-1 font-bold">
              <Link href="/create">
                <PlusIcon className="w-4 h-4" /> Create Task
              </Link>
            </Button>
          </div>

          {/* Grid responsivo para tarefas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>

          {/* Botão de login */}
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-1 font-bold">
              faça seu login
            </Button>
          </div>
        </div>

        <footer>
          <Card>
            <CardContent className="w-full px-5 py-6">
              <p className="text-sm text-gray-400">
                @ 2024 Copyrigth YOURtasks
              </p>
            </CardContent>
          </Card>
        </footer>
      </div>
    </>
  );
};

export default Home;
