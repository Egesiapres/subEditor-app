import { useState } from "react";

export type ModalType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  data: object;
  setData: () => void;
};

export default function useModal() {
  const [isOpen, setOpen] = useState(false);

  const [data, setData] = useState(null);

  const open = () => {
    setOpen(true);
  };

  const close = (_e: object, reason: string) => {
    if (!reason || reason === "escapeKeyDown") {
      setOpen(false);
    }
  };

  return {
    isOpen,
    open,
    close,
    data,
    setData,
  };
}
