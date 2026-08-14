"use client";

import Link from "next/link";
import { useId, useState } from "react";

type NavigationItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  items: NavigationItem[];
  signedIn?: boolean;
  onSignOut?: () => void;
};

export function MobileNav({ items, signedIn = false, onSignOut }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const close = () => setIsOpen(false);

  return (
    <div className="mobile-nav">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="mobile-nav__toggle"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      {isOpen ? (
        <nav className="mobile-nav__panel" id={panelId} aria-label="Mobile navigation">
          {items.map((item) => (
            <Link href={item.href} key={item.href} onClick={close}>{item.label}</Link>
          ))}
          {signedIn ? (
            <button
              className="mobile-nav__sign-out"
              onClick={() => { close(); onSignOut?.(); }}
              type="button"
            >
              SIGN OUT
            </button>
          ) : (
            <Link href="/auth/sign-in?returnTo=/#arena" onClick={close}>SIGN IN</Link>
          )}
        </nav>
      ) : null}
    </div>
  );
}
