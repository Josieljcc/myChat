import { Hash } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { UserAvatar } from "../user-avatar";

interface chatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: chatHeaderProps) => {
  return (
    <div className="text-md w-full font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 ml-2 mr-1 text-neutral-500 dark:text-neutral-400" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="w-8 h-8 md:h-8 md:w-8 mr-2" />
      )}
      <p>{name}</p>
    </div>
  );
};
