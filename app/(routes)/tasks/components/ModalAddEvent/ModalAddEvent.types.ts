
import { Athlete } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type ModalAddEventProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>;
  athletes: Athlete[];
  setNewEvent: Dispatch<
    SetStateAction<{
      eventName: string;
      athleteSelected: { name: string; id: string };
    }>
  >;
};