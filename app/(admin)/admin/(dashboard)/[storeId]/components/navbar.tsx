import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

import { AdminNavigationMenu } from "./nav-items";
import { StoreSwitcher } from "./store-switcher";

interface AdminNavbarProps {
  stores: Store[];
}

export function AdminNavbar({ stores }: AdminNavbarProps) {
  return (
    <div className="border-b-[1px]">
      <div className="h-16 flex items-center gap-x-1.5 px-4">
        <StoreSwitcher stores={stores} />
        <AdminNavigationMenu />
        <div className="ml-auto flex items-center space-x-3">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
