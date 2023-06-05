import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import { FunctionComponent } from "react";

interface Properties extends PropsWithChildren {
  className?: string;
}

export const CardGroup: FunctionComponent<Properties> = ({
  className,
  children,
}) => (
  <div
    className={clsx(
      "flex gap-8 w-full items-stretch justify-stretch flex-grow",
      className
    )}
  >
    {children}
  </div>
);
