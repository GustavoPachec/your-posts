import SignInDialog from "@/components/sign-in-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const loginPage = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg border border-gray-200 rounded-lg bg-white p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Bem-vindo!
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Faça login para acessar suas anotações.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <SignInDialog />
        </CardContent>
      </Card>
    </div>
  );
};

export default loginPage;
