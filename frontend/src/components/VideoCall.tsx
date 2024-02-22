import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Video } from "lucide-react";
import { socket } from "../lib/socket";
import Peer from "simple-peer";
import { useAppSelector } from "../store/hooks";

const VideoCall = () => {
  /**
   * intially both players have the option to call each other
   * player starts the call and
   * for the player two it is displayed that opponent is calling and the Start call should also disappear
   * 
   * case1:
   * opponent accepts the call
   * then the video strem is transferred
   * case2:
   *opponent dennied the call and the sorry message is emitted tot he other player
*   case 3;
    player ignored the call
   *
    strem,receivngcall,caller,callerSignal,callAccpeted,isCalling,userVideo,partnerVideo
   */

  const [stream, setStream] = useState<any>();
  const [receivngCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState();
  const [callerSignal, setCallerSignal] = useState();
  const [callAccpeted, setCallAccepted] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const userVideoRef = useRef(null);
  const partnerVideoRef = useRef(null);

  const roomId = useAppSelector((state) => state.user.roomId);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setStream(stream);
            if (userVideoRef.current) {
              userVideoRef.current.srcObject = stream;
            }
          });
        socket.on("hey", ({ signal, gameId }) => {
          setReceivingCall(true);
          // setCaller()
          setCallerSignal(signal);
        });
      } catch (error) {
        console.error("Error acessing webcam", error);
      }
    };

    getUserMedia();
  }, []);

  function callPeer(roomId) {
    setIsCalling(true);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", { gameId: roomId, signalData: data });
    });
    peer.on("stream", (stream) => {
      if (partnerVideoRef.current) {
        partnerVideoRef.current.srcObject = stream;
      }
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }
  function acceptCall() {
    setCallAccepted(true);
    setIsCalling(false);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", { gameId: roomId, signal: data });
    });
    peer.on("stream", (stream) => {
      if (partnerVideoRef.current) {
        partnerVideoRef.current.srcObject = stream;
      }
    });
    peer.signal(callerSignal);
  }

  let userVideo;
  if (stream) {
    userVideo = (
      <video
        className="bg-white"
        playsInline
        muted
        autoPlay
        ref={userVideoRef}
      />
    );
  }

  let partnerVideo;
  if (stream) {
    partnerVideo = <video playsInline autoPlay ref={partnerVideoRef}></video>;
  }
  return (
    <div className="mt-16 mr-16 ">
      <Video></Video>
      <Card className=" border ">
        {userVideo}
        {partnerVideo}
      </Card>
      <span className="flex justify-between mt-4 ml-2">
        <Button onClick={callPeer}>Start call</Button>
        <Button onClick={acceptCall}>Accept call</Button>

        <Button>Reject Call</Button>
      </span>
    </div>
  );
};

export default VideoCall;
