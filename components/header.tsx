import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image alt="YOURtasks" src="/logo.png" height={18} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
