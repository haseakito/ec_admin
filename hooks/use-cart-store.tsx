import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface CartStore {
  items: Product[];
  add: (data: Product) => void;
  remove: (id: string) => void;
  removeAll: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      add: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        // Check
        if (existingItem) {
          return toast("Item already in cart.");
        }

        // Set the product id in cart
        set({ items: [...get().items, data] });

        // Show successfull toast
        toast.success("Successfully added the item to cart!");
      },
      remove: (id: string) => {
        // Remove the item from the cart storage
        set({ items: [...get().items.filter((item) => item.id !== id)] });

        // Show successfull toast
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
