import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-card)] bg-[color:var(--color-primary-deep)] text-sm font-semibold tracking-wide text-white"
          >
            NR
          </span>
          <span className="ml-3 hidden h-6 border-l border-[color:var(--color-border)] sm:block" />
          <span className="ml-3 hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="truncate text-base font-semibold text-[color:var(--color-fg-strong)]">
              Nanda Registry
            </span>
            <span className="truncate text-xs text-[color:var(--color-fg-weak)]">
              Agent registry &amp; directory
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}
