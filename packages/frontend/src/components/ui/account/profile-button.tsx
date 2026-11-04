import { IconLogout, IconSettings } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { AccountAvatar } from "./avatar";

export default function AccountProfileButton({
  profileImage,
  profileName,
}: {
  profileImage?: string;
  profileName?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <AccountAvatar
            profileImage={profileImage}
            profileName={profileName}
            button
          />
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconSettings /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
