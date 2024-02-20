"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { socket } from "../lib/socket";
// import { socket } from '@/lib/socket'
// import { joinRoomSchema } from '../lib/validations/joinRoom'
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { joinRoomSchema } from "../lib/validations";
import { useAppDispatch } from "../store/hooks";
import { setRoomId, setUsername } from "../store/userSlice";

type JoinRoomForm = z.infer<typeof joinRoomSchema>;

export default function JoinRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<JoinRoomForm>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof joinRoomSchema>) {
    dispatch(setUsername({ username: values.username }));
    dispatch(setRoomId({ roomId: "20" }));
    socket.emit("join-room", { name: values.username, gameId: "20" });
    navigate(`/game?name=${values.username}&id=${"20"}`, {
      replace: true,
    });
  }

  // useEffect(() => {
  //   // socket.on("room-not-found", ( ) => {
  //   //   setIsLoading(false);
  //   // });
  // }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Join a Room
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90vw] max-w-[400px]">
        <DialogHeader className="pb-2">
          <DialogTitle>Join a room now!</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Room ID" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Join"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
