"use client";

import { useState, ReactNode } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Validação usando Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .required("O título é obrigatório")
    .min(3, "O título deve ter pelo menos 3 caracteres"),
  description: Yup.string()
    .required("A descrição é obrigatória")
    .min(5, "A descrição deve ter pelo menos 5 caracteres"),
  status: Yup.string().required("O status é obrigatório"),
});

interface EditTaskButtonProps {
  taskId: string;
  initialData: { title: string; description: string; status: string };
  children: ReactNode;
}

export const EditTaskButton = ({
  taskId,
  initialData,
}: EditTaskButtonProps) => {
  const { toast } = useToast();

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (values: {
    title: string;
    description: string;
    status: string;
  }) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      toast({
        description: "Tarefa Atualizada com sucesso!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar a tarefa.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="w-5 h-5 text-gray-700 hover:gray-100 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-lg lg:max-w-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field name="title" placeholder="Título" as={Input} />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  name="description"
                  placeholder="Descrição"
                  as={Textarea}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting || isUpdating}>
                  {isSubmitting || isUpdating ? "Atualizando..." : "Atualizar"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
