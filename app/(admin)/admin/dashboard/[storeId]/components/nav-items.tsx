"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import {
    useParams,
    usePathname
} from "next/navigation"

export function NavigationMenu({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {

    // Hooks handling current URL's pathname
    const pathname = usePathname()

    // Hooks handling dynamic params
    const params = useParams()

    const NavItems: {href: string, label: string, active: boolean}[] = [
        {
            href: `/${params.storeId}/`,
            label: "Overview",
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`
        },
    ]

  return (
    <nav className={cn("flex items-center space-x-3 lg:space-x-5", className)}>
        {
            NavItems.map((item) => (
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
            ))
        }
    </nav>
  )
}
