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

// Validação usando Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .required("O título é obrigatório")
    .min(3, "O título deve ter pelo menos 3 caracteres"),
  description: Yup.string()
    .required("A descrição é obrigatória")
    .min(5, "A descrição deve ter pelo menos 5 caracteres"),
});

export const CreateTaskButton = ({
  onCreate,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate: (data: any) => void;
}) => {
  const handleSubmit = (values: { title: string; description: string }) => {
    onCreate({
      ...values,
      status: "NOT_INITIALIZED", // Status inicial
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1 font-bold">
          <PlusIcon className="w-4 h-4" /> Create Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
