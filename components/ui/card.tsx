import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-[0_1px_2px_rgba(15,23,42,0.05),0_12px_24px_rgba(15,23,42,0.06)]",
        className,
      )}
      {...props}
    />
  );
}

export { Card };
