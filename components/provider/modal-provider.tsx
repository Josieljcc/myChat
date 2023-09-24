"use client";

import { useEffect, useState } from "react";
import { CreateServerModel } from "../modals/create-server-modal";
import { InviteModel } from "../modals/invite-model";
import { EditServerModal } from "../modals/edit-server-modal";
import { MembersModal } from "../modals/members-model";

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
      <EditServerModal />
      <InviteModel />
      <MembersModal />
    </>
  );
};
