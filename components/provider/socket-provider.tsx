"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type socketContextType = {
  socket: any | null;
  isConnect: boolean;
};

const SocketContext = createContext<socketContextType>({
  socket: null,
  isConnect: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SOCKET_URL!,
      {
        path: "api/socket/io",
        addTrailingSlash: false,
      }
    );

    socketInstance.on("connect", () => {
      setIsConnect(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnect(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnect }}>
      {children}
    </SocketContext.Provider>
  );
};
