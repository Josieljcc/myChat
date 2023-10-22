import { Server as NetServer, Socket } from "net";
import { Member, Profile, Server } from "@prisma/client";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponse } from "next";

export type serverWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
