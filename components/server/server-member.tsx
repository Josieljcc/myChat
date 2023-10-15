"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 w-4 h-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="ml-2 w-4 h-4 text-rose-500" />,
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();
  const icon = roleIconMap[member.role];

  const handleClick = () => {
    router.push(`/servers/${server.id}/conversations/${member.id}`);
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        "group px-2 py-2 flex rounded-md items-center gap-x-2 w-full transition mb-1 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50",
        member.id === params.memberId && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar
        className="h-8 w-8 md:h-8 md:w-8"
        src={member.profile.imageUrl}
      />
      <p
        className={cn(
          "ml-2 font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition",
          member.id === params.memberId &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.name}
      </p>
      {icon}
    </button>
  );
};
