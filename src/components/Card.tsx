import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import { FunctionComponent } from "react";

interface Properties extends PropsWithChildren {
  className?: string;
  disabled?: boolean;
}

export const Card: FunctionComponent<Properties> = ({
  disabled = false,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg bg-slate-700 p-8",
        "flex flex-col items-center justify-evenly",
        "flex-grow",
        { "opacity-50 blur": disabled },
        className
      )}
    >
      {children}
    </div>
  );
};
