import React, { FunctionComponent } from "react";
import { APIResponse, formatPerson, getPersonBg } from "../utils/api";
import { Card } from "./Card";
import { Icon } from "./Icon";
import clsx from "clsx";

interface Properties {
  data?: APIResponse;
  className?: string;
}
export const PickupCard: FunctionComponent<Properties> = ({
  data,
  className,
}) => (
  <Card
    className={clsx(className, getPersonBg(data?.pickup))}
    disabled={!data?.isSchoolDay}
  >
    <div className="flex gap-4">
      <Icon>store</Icon>
      <Icon>arrow_right</Icon>
      <Icon>directions_car</Icon>
    </div>
    {formatPerson(data?.pickup)}
  </Card>
);
