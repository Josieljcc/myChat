import { Member, Profile, Server } from "@prisma/client";

export type serverWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
