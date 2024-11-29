import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import TaskItem from "@/components/taks-item";
import { getServerSession } from "next-auth";
import { CreateTaskButton } from "@/components/create-task-button";
import { createTask } from "./_actions/create-task";

const Home = async () => {
  // chamar o banco
  const tasks = await db.task.findMany({});
  const session = await getServerSession();

  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-screen">
        <div className="p-5 w-full max-w-4xl flex flex-col items-center justify-center flex-1">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">
              Olá, {session?.user ? session.user.name : "Bem vindo"}
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Segunda-feira, 29 de Novembro
            </p>
          </div>

          <div className="flex items-center gap-2 mb-6 w-full max-w-md">
            <Input placeholder="Encontre suas tarefas..." className="flex-1" />
            <Button className="w-20">
              <SearchIcon />
            </Button>
          </div>

          <div className="flex justify-between items-center w-full max-w-4xl mb-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase text-gray-400">
              Tarefas
            </h2>

            <CreateTaskButton onCreate={createTask} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
            {/* Verificar se há tarefas */}
            {tasks.length > 0 ? (
              tasks.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Nenhuma Tarefa
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
