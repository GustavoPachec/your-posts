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
import { PlusIcon, Clock } from "lucide-react";
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
  description: Yup.string()
    .required("A descrição é obrigatória")
    .min(5, "A descrição deve ter pelo menos 5 caracteres"),
  status: Yup.string().required("O status é obrigatório"),
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
    status: string;
  }) => {
    try {
      await onCreate({
        ...values,
        status: values.status || "NOT_INITIALIZED",
      });

      // Exibindo o toast de sucesso
      toast({
        title: "Tarefa criada com sucesso!",
        description: "Tarefa criada com sucesso.",
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

  // Função para renderizar ícones de status
  const getStatusIcon = (status: string) => {
    if (status === "IN_PROGRESS") {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }
    return null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1 font-bold">
          <PlusIcon className="w-4 h-4" /> Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-4">
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
          {({ isSubmitting, values, setFieldValue }) => (
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
                        <SelectItem value="IN_PROGRESS">
                          Em Progresso
                        </SelectItem>
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

              {/* Ícone de status */}
              <div className="flex items-center space-x-2 mt-2">
                {getStatusIcon(values.status)}
                <span className="text-sm text-gray-600">
                  {values.status === "IN_PROGRESS"
                    ? "Em Progresso"
                    : "Não Iniciada"}
                </span>
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
