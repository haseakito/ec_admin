"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export function AlertModal({
  description,
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) {
  // Boolean state handling the mount state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Be careful!"
      description={description ? description : "This action cannot be undone"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-4 space-x-2 flex items-center justify-end w-full">
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          size="sm"
          disabled={loading}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
