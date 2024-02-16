"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function NavigationMenu({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  // Hooks handling current URL's pathname
  const pathname = usePathname();

  // Hooks handling dynamic params
  const params = useParams();

  // Navigation item, its location, and its current status
  const NavItems: { href: string; label: string; active: boolean }[] = [
    {
      href: `/admin/${params.storeId}/`,
      label: "Overview",
      active: pathname === `/admin/${params.storeId}`,
    },
    {
      href: `/admin/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/admin/${params.storeId}/products`,
    },
    {
      href: `/admin/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/admin/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-3 lg:space-x-5", className)}>
      {NavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
