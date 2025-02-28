"use client";
import React, { createContext, useContext, useState } from "react";
import { Task } from "@/lib/type";

interface CacheContentProps {
  data: Task[] | null
  setData: React.Dispatch<React.SetStateAction<Task[] | null>>;
}

const initialContextValue: CacheContentProps = {
  data: null,
  setData: () => {
    throw Error(
      "useContext hook must be used in children of the context provider"
    );
  },
};

const CacheContext = createContext(initialContextValue);

export const useCache = () => useContext(CacheContext);

export default function CacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<Task[] | null>(null);

  return (
    <CacheContext.Provider value={{ data, setData }}>
      {children}
    </CacheContext.Provider>
  );
}
