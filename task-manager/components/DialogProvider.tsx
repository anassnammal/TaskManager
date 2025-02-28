'use client'
import React, { createContext, useContext, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TaskDialog } from "@/components/TaskDialog";
import { Task } from "@/lib/type";

interface DialogContentProps {
    setTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContextValue: DialogContentProps = {
    setTask: () => {
        throw Error(
        "useContext hook must be used in children of the context provider"
        )
    },
    setOpen: () => {
        throw Error(
        "useContext hook must be used in children of the context provider"
    );
  },
};

const DialogContext = createContext(initialContextValue);

export const useDialog = () => useContext(DialogContext);


export default function DialogProvider({ children }: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<Task | undefined>(undefined);

  return (
    <DialogContext.Provider value={{ setOpen, setTask }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <TaskDialog data={task} />
        </DialogContent>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};


