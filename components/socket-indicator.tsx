"use client";

import { useSocket } from "./provider/socket-provider";
import { Badge } from "./ui/badge";

function SocketIndicator() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge className="bg-yellow-600 text-white border-none" variant="outline">
        falha na conecxão
      </Badge>
    );
  }

  return (
    <Badge className="bg-emerald-600 text-white border-none" variant="outline">
      conectado
    </Badge>
  );
}

export default SocketIndicator;
