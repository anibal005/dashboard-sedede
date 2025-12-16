
import { Athlete } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormEventProps = {
  setNewEvent: Dispatch<
    SetStateAction<{
      eventName: string;
      athleteSelected: { name: string; id: string };
    }>
  >;
  setOpen: Dispatch<SetStateAction<boolean>>;
  athletes: Athlete[];
  setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;
};