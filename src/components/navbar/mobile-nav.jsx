"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { useComparison } from "@/context/ComparisonProvider";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { comparisonList = [] } = useComparison();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <img
            src="/logo-white.png"
            alt="Logo"
            width="40"
            height="40"
            className="rounded-full invert-white dark:invert-0"
          />
          <span className="font-bold">StatsCrave</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <MobileLink
              href="/dashboard"
              onOpenChange={setOpen}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/dashboard")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Dashboard
            </MobileLink>
          </div>
          {/* <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <React.Fragment key={1}>
                <MobileLink
                  href={"/userSpotify"}
                  onOpenChange={setOpen}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/userSpotify")
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  Your Spotify
                </MobileLink>
              </React.Fragment>
            </div>
          </div> */}
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <React.Fragment key={1}>
                <MobileLink
                  href={"/records"}
                  onOpenChange={setOpen}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/records")
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  Records
                </MobileLink>
              </React.Fragment>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <React.Fragment key={1}>
                <MobileLink
                  href={"/charts"}
                  onOpenChange={setOpen}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/charts")
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  Charts
                </MobileLink>
              </React.Fragment>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <React.Fragment key={1}>
                <MobileLink
                  href={"/replay"}
                  onOpenChange={setOpen}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/replay")
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  Replay
                </MobileLink>
              </React.Fragment>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <React.Fragment key={1}>
                <MobileLink
                  href={"/updates"}
                  onOpenChange={setOpen}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/updates")
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  Updates
                </MobileLink>
              </React.Fragment>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <React.Fragment key={1}>
                <MobileLink
                  href={"/compare"}
                  onOpenChange={setOpen}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/compare")
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                 
                  Compare

                  {comparisonList.length > 0 && (
            <span className="relative ml-4">
              <span className="absolute top-0  right-0 -mt-1 -mr-1 bg-primary font-medium rounded-full h-4 w-4 flex items-center justify-center">
                {comparisonList.length}
              </span>
            </span>
          )}
                </MobileLink>
              </React.Fragment>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({ href, onOpenChange, className, children, ...props }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
