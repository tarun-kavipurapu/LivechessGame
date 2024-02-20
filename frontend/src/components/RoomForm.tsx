import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nanoid } from "nanoid";
import { Button } from "../components/ui/button";
import {
  Form,
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
import { socket } from "../lib/socket";
import { Loader2 } from "lucide-react";

function RoomForm() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const roomId = useAppSelector((state) => state.user.roomId);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (!roomId) {
      dispatch(setRoomId({ roomId: nanoid() }));
    }
  }, [dispatch, roomId]);

  const onSubmit = async (values: z.infer<typeof createRoomSchema>) => {
    setIsLoading(true);
    dispatch(setUsername({ username: values.username }));

    socket.emit("create-room", { name: values.username, gameId: roomId });

    socket.on("opponent-joined", ({ message }) => {
      setIsLoading(false);
      navigate(`/game/${roomId}`, { replace: true });
    });
  };

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
              <Input placeholder="username" {...field} />
              <FormMessage className="text-xs" />
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
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            " Create a Room"
          )}
        </Button>
        {isLoading && (
          <p className="text-center text-sm text-muted-foreground">
            Waiting for an opponent to join...
          </p>
        )}
      </form>
    </Form>
  );
}

export default RoomForm;
