"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as z from "zod";
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
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "O nome do servidor é obrigatório",
  }),
  imageUrl: z.string().min(1, {
    message: "A imagem do servidor é obrigatório",
  }),
});

export const InitialModal = () => {
  const [isMounted, setIsMonted] = useState<boolean>(false);
  useEffect(() => {
    setIsMonted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Crie seu Servidor
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Dê personalidade ao seu servidor com um nome e imagem, você poderá
            mudar depois.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="px-6 space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                TODO: upload da imagem
              </div>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-xs font-bold text-zinc-500">
                  <FormLabel>Nome do servidor</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                      placeholder="Digite o nome do servidor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
