import type { ReactNode } from "react";
import { logOut } from "../lib/auth-client";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  IconApps,
  IconLogout,
  IconSettings,
  IconFolder,
  IconPencil,
  IconMusic,
  IconBrush,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DockLogo } from "./ui/branding/logo";
import { Link } from "./ui/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

function AppButton({
  icon,
  label,
  to,
}: {
  icon: ReactNode;
  label: string;
  to: string;
}) {
  return (
    <Link to={to}>
      <Button variant="ghost" className="flex flex-col px-2 py-3 h-fit w-22">
        <div className="bg-primary size-10 mb-1 rounded-md p-2 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm">{label}</span>
      </Button>
    </Link>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col size-full">
      <div className="w-full p-2 border-b gap-3 flex flex-row items-center">
        <Link to="/">
          <DockLogo className="mx-0.5 h-5" />
        </Link>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="secondary" size="icon" className="ml-auto">
                <IconApps />
              </Button>
            }
          />
          <PopoverContent>
            <div className="flex flex-wrap w-66">
              <AppButton
                icon={<IconFolder className="size-6" />}
                label="Files"
                to="/files"
              />
              <AppButton
                icon={<IconPencil className="size-6" />}
                label="Notes"
                to="/notes"
              />
              <AppButton
                icon={<IconMusic className="size-6" />}
                label="Music"
                to="/music"
              />
              <AppButton
                icon={<IconBrush className="size-6" />}
                label="Design"
                to="/design"
              />
            </div>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Avatar>
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            }
            nativeButton={false}
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconSettings /> Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                logOut();
              }}
            >
              <IconLogout /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
