import { auth } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import { cn } from "cn";
import { UserIcon } from "lucide-react";
import Link from "next/link";

export const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Link
        href={"/sign-in"}
        className={buttonVariants({ variant: "default" })}
      >
        <UserIcon /> Sign In
      </Link>
    );
  }

  const firstInitial = session?.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex gap-2 item-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <div
              className={cn(
                "relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200",
                buttonVariants({ variant: "ghost" }),
              )}
            >
              {firstInitial}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"w-56"} align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className={"font-normal"}>
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-medium leading-none">
                  {session.user?.name}
                </div>
                <div className="text-sm text-muted-foreground leading-none">
                  {session.user?.email}
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem>
              <Link href={"/user/profile"} className="w-full">
                User Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href={"/user/orders"} className="w-full">
                Order History
              </Link>
            </DropdownMenuItem>

            {session?.user?.role === "admin" && (
              <DropdownMenuItem>
                <Link href="/admin/overview" className="w-full">
                  Admin
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem className={"p-0 mb-1"}>
              <form action={signOutUser} className="w-full">
                <Button
                  type="submit"
                  className={"w-full py-4 px-2 h-4 justify-start"}
                  variant={"ghost"}
                >
                  Sign Out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
