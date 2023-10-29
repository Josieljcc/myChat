"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import qs from "query-string";
import axios from "axios";
import { RefreshCw } from "lucide-react";

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteMessage";

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.delete(url);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Deletar Mensagem
          </DialogTitle>
          <DialogDescription className="text-sm text-center mt-1">
            Você tem certeza que deseja deletar essa mensagem?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex justify-between w-full">
            <Button
              disabled={isLoading}
              className="w-20"
              variant="ghost"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              disabled={isLoading}
              className="w-20"
              variant="destructive"
              onClick={onClick}
            >
              {isLoading ? (
                <RefreshCw className="animate-spin h-5 w-5" />
              ) : (
                "Deletar"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
