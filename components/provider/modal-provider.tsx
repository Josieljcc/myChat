"use client";

import { useEffect, useState } from "react";
import { CreateServerModel } from "../modals/create-server-modal";
import { InviteModel } from "../modals/invite-model";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModel />
      <InviteModel />
    </>
  );
};
