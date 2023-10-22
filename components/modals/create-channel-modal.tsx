"use client";

import qs from "query-string";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "O nome do canal é obrigatório",
    })
    .refine((name) => name.toLowerCase() != "geral".toLowerCase(), {
      message: "O nome do canal não pode ser 'geral'",
    }),
  type: z.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { channelType } = data;
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "createChannel";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelType || ChannelType.TEXT,
    },
  });

  useEffect(() => {
    if (channelType) {
      form.setValue("type", channelType);
    } else {
      form.setValue("type", ChannelType.TEXT);
    }
  }, [channelType, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.serverId,
        },
      });
      await axios.post(url, values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      form.reset();
      router.refresh();
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Criar um Canal
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="px-6 space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="text-xs font-bold text-zinc-500">
                    <FormLabel>Nome do canal</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/60 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                        placeholder="Digite o nome do canal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo do canal</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 outline-none">
                          <SelectValue placeholder="Selecione o tipo do canal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLocaleLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant={"primary"} disabled={isLoading}>
                Criar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
