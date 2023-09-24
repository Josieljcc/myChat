import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export const UserAvatar = ({ src, alt, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} alt={alt} />
    </Avatar>
  );
};
