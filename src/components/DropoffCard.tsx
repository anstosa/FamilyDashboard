import React, { FunctionComponent } from "react";
import { APIResponse, formatPerson, getPersonBg } from "../utils/api";
import { Card } from "./Card";
import { Icon } from "./Icon";
import clsx from "clsx";

interface Properties {
  data?: APIResponse;
  className?: string;
}
export const DropoffCard: FunctionComponent<Properties> = ({
  data,
  className,
}) => (
  <Card
    className={clsx(className, getPersonBg(data?.dropoff))}
    disabled={!data?.isSchoolDay}
  >
    <div className="flex gap-4">
      <Icon>directions_car</Icon>
      <Icon>arrow_right</Icon>
      <Icon>store</Icon>
    </div>
    {formatPerson(data?.dropoff)}
  </Card>
);
