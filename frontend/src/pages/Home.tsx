import React from "react";
import { nanoid } from "nanoid";
import RoomForm from "../components/RoomForm";
import JoinRoom from "../components/JoinRoom";
import { Separator } from "../components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { useAppDispatch } from "../store/hooks";
import { setRoomId } from "../store/userSlice";

const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between pb-5 pt-[13vh]">
      <Card className="rounded-lg border bg-card text-card-foreground shadow-sm w-[90vw] max-w-[400px]">
        <CardHeader>
          <CardTitle className="text-4xl">Live Chess</CardTitle>
          <CardDescription>
            Play chess with your friends while chatting.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <RoomForm />
          <div className="flex items-center space-x-2 ">
            <Separator className="w-[150px]" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="w-[150px]" />
          </div>
          <JoinRoom />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
