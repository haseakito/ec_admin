import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Container } from "@/components/ui/container";

import { StoreNavigationMenu } from "./nav-items";
import { NavigationActions } from "./nav-actions";

interface StoreNavbarProps {
  stores: Store[];
}

export function StoreNavbar({ stores }: StoreNavbarProps) {
  return (
    <div className="border-b-[1px]">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex gap-x-2 h-16 items-center">
          <Link href="/" className="flex lg:ml-0 gap-x-2 px-3 border-r-[1px]">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <StoreNavigationMenu stores={stores} />
          <NavigationActions />
          <UserButton signInUrl="/" />
        </div>
      </Container>
    </div>
  );
}
