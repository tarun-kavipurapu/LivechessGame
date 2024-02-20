import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { nanoid } from "nanoid";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { CopyButton } from "../components/ui/CopyButton";
import { createRoomSchema } from "../lib/validations";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./../store/hooks";
import { setUsername, setRoomId } from "../store/userSlice";
import { useEffect } from "react";
import { socket } from "../lib/socket";

function RoomForm() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const navigate = useNavigate();
  console.log(username);
  const roomId = useAppSelector((state) => state.user.roomId);
  // useEffect(() => {
  //   const roomId = nanoid();
  //   dispatch(setRoomId({ roomId }));
  // }, [dispatch]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createRoomSchema>) {
    dispatch(setUsername({ username: values.username }));

    socket.emit("create-room", { name: values.username, gameId: "20" });

    navigate(`/game?name=${values.username}&id=${roomId}`, { replace: true });
  }

  return (
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
              <FormLabel className="text-foreground text-lg">
                Username
              </FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage className="text-xs " />
            </FormItem>
          )}
        />
        <div>
          <p className="mb-2  text-lg">Room ID</p>
          <div className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
            <span>{roomId}</span>
            <CopyButton value={roomId} />
          </div>
        </div>
        <Button type="submit" className="mt-2 w-full">
          Create a Room
        </Button>
      </form>
    </Form>
  );
}

export default RoomForm;
