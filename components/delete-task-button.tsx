"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeleteTaskButtonProps {
  taskId: string;
}

export const DeleteTaskButton = ({ taskId }: DeleteTaskButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      toast({
        description: "Tarefa excluída com sucesso!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir a tarefa.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Excluir tarefa"
          className="p-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-lg lg:max-w-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Excluir Tarefa</DialogTitle>
        </DialogHeader>
        <p>
          Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser
          desfeita.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
