import { cn } from "@lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";

export function AccountAvatar({
  profileImage,
  profileName,
  className,
  button,
}: {
  profileImage?: string;
  profileName?: string;
  className?: string;
  button?: boolean;
}) {
  return (
    <Avatar
      className={className}
      render={
        button ? (
          <Button
            variant="secondary"
            className={cn("rounded-full p-0", className)}
          />
        ) : undefined
      }
    >
      <AvatarImage alt={profileName || "Profile"} src={profileImage} />
      <AvatarFallback className={className}>{profileName?.[0]}</AvatarFallback>
    </Avatar>
  );
}
