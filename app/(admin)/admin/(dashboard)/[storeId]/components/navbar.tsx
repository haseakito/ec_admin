import { fetchStores } from "@/services/store";

import { UserButton } from "@clerk/nextjs";

import { NavigationMenu } from "./nav-items";
import { StoreSwitcher } from "./store-switcher";

import { ThemeToggle } from "@/components/theme-toggle";

export async function Navbar() {
  // Fetch stores
  const stores: Store[] = await fetchStores();

  return (
    <div className="border-b-[1px]">
      <div className="h-16 flex items-center gap-x-1.5 px-4">
        <StoreSwitcher stores={stores} />
        <NavigationMenu />
        <div className="ml-auto flex items-center space-x-3">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
