"use client";

import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { serverWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Trash,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

export const MembersModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string>("");
  const { server } = data as { server: serverWithMembersWithProfiles };
  const roleIconMap = {
    GEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
  };

  const isModalOpen = isOpen && type === "members";

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      const response = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (role: MemberRole, memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      });
      const response = await axios.patch(url, { role });
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Gerenciar Membros
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            {server?.members?.length} membros
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] px-8">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar
                src={member.profile.imageUrl}
                alt={`${member.name} image`}
              />
              <div className="flex flex-col gap-y-1">
                <div className="flex text-xs gap-x-1 font-semibold items-center">
                  {member.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="bg-zinc-950 rounded-md text-zinc-200 px-2"
                        side="left"
                      >
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="p-2">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-full h-full p-1 rounded-md">
                              <DropdownMenuItem
                                className="p-1 rounded-md flex items-center cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                                onClick={() => onRoleChange("GEST", member.id)}
                              >
                                <Shield className="h-4 w-4 mr-2" />
                                Convidado
                                {member.role === "GEST" && (
                                  <Check className="h-4 w-4 ml-2" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="p-1 rounded-md flex items-center cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                                onClick={() =>
                                  onRoleChange("MODERATOR", member.id)
                                }
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Moderador
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKick(member.id)}
                          className="p-2 text-xs text-rose-500 rounded-md flex items-center cursor-pointer hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                        >
                          <Gavel className="h-4 w-4 mr-2" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto h-4 w-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
