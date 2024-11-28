import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-4 py-3">
        <Image alt="YOURtasks" src="/logo.png" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage src="https://th.bing.com/th?id=OIP.YLrClEMg_iKFa3y-RQ1s5wHaJo&w=219&h=285&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" />
              </Avatar>

              <div>
                <p className="font-bold">Gustavo Pacheco</p>
                <p className="text-xs">gugu@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-bs border-solid py-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" variant="ghost" asChild>
                  <Link href="/">
                    <HomeIcon size="18" />
                    Inicio
                  </Link>
                </Button>
              </SheetClose>
            </div>

            <div className="flex flex-col gap-2 py-5">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da Conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
