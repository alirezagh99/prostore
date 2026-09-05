import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className={"flex justify-end gap-3"}>
      <nav className={"hidden md:flex w-full max-w-xs gap-1"}>
        <ModeToggle />
        <Button variant="ghost">
          <Link href="/cart" className="flex items-center gap-2">
            <ShoppingCart /> Cart
          </Link>
        </Button>

        <Button>
          <Link href="/sign-in" className="flex items-center gap-2">
            <UserIcon /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className={"md:hidden"}>
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className={"flex flex-col items-start p-4x"}>
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button variant="ghost">
              <Link href="/cart" className="flex items-center gap-2">
                <ShoppingCart /> Cart
              </Link>
            </Button>{" "}
            <Button>
              <Link href="/sign-in" className="flex items-center gap-2">
                <UserIcon /> Sign In
              </Link>
            </Button>
            <SheetDescription>
              This is a simple sheet description.
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
