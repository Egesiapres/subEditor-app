import { useState } from "react";

export default function useModal() {
  const [isOpen, setOpen] = useState(false);

  const [data, setData] = useState(null);

  const open = () => {
    setOpen(true);
  };

  const close = (e, reason) => {
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
