"use client";

import { useEffect, useState } from "react";

interface CurrencyProps {
  price: number;
}

export const Currency: React.FC<CurrencyProps> = ({ price = 0 }) => {
  // Boolean state handling the currency state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div className="font-semibold">${price}</div>;
};
