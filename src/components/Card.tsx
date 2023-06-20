import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import { FunctionComponent } from "react";

interface Properties extends PropsWithChildren {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Card: FunctionComponent<Properties> = ({
  disabled = false,
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        className?.includes("bg-") ? "" : "bg-slate-700",
        "rounded-lg overflow-hidden p-8 relative",
        "flex flex-col items-center justify-evenly",
        "flex-grow",
        { "opacity-50 blur": disabled },
        className
      )}
      onClick={(event) => {
        if (onClick) {
          event.stopPropagation();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};
