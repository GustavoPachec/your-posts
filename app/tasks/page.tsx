import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

import TaskItem from "@/components/task-item";
import { getServerSession } from "next-auth";
import { CreateTaskButton } from "@/components/create-task-button";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createTask } from "../actions/create-task";

const Home = async () => {
  const tasks = await db.task.findMany({});
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-screen">
        <div className="p-5 w-full max-w-4xl flex flex-col items-center justify-center flex-1">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">
              Olá, {session?.user ? session.user.name + "." : "Bem vindo."}
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              <span className="capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              <span>&nbsp;de&nbsp;</span>
              <span className="capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
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
