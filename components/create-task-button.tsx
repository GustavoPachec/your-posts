/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast"; // Hook de toast

// Validação usando Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .required("O título é obrigatório")
    .min(3, "O título deve ter pelo menos 3 caracteres"),
  description: Yup.string().min(
    3,
    "A descrição deve ter pelo menos 3 caracteres"
  ),
  status: Yup.string(),
});

export const CreateTaskButton = ({
  onCreate,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate: (data: any) => void;
}) => {
  const { toast } = useToast(); // Usando o hook de toast
  const handleSubmit = async (values: {
    title: string;
    description: string;
    status: "NOT_INITIALIZED" | "PENDING" | "COMPLETED";
  }) => {
    try {
      onCreate({
        ...values,
      });

      // Exibindo o toast de sucesso
      toast({
        title: "Tarefa criada com sucesso!",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Erro ao criar tarefa",
        description: "Houve um problema ao criar a tarefa. Tente novamente.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1 font-bold">
          <PlusIcon className="w-4 h-4" /> Criar Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-lg lg:max-w-xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            title: "",
            description: "",
            status: "NOT_INITIALIZED",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              {/* Campo de título */}
              <div>
                <Field
                  name="title"
                  placeholder="Task Title"
                  as={Input}
                  className="w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Campo de descrição */}
              <div>
                <Field
                  name="description"
                  placeholder="Task Description"
                  as={Textarea}
                  className="w-full"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Campo de Status */}
              <div>
                <Field name="status">
                  {({ field }: { field: any }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value: string) =>
                        setFieldValue("status", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NOT_INITIALIZED">
                          Não Iniciada
                        </SelectItem>
                        <SelectItem value="PENDING">Em Progresso</SelectItem>
                        <SelectItem value="COMPLETED">Finalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
