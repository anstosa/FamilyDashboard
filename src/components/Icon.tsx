import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import { FunctionComponent } from "react";

interface Properties extends PropsWithChildren {
  className?: string;
}

export const Icon: FunctionComponent<Properties> = ({
  className,
  children,
}) => {
  return (
    <div className={clsx("material-symbols-outlined", "icon", className)}>
      {children}
    </div>
  );
};
