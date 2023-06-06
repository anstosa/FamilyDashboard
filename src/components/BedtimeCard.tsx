import React, { FunctionComponent } from "react";
import { APIResponse, formatPerson, getPersonBg } from "../utils/api";
import { Card } from "./Card";
import clsx from "clsx";
import { Icon } from "./Icon";

interface Properties {
  data?: APIResponse;
  className?: string;
}
export const BedtimeCard: FunctionComponent<Properties> = ({
  data,
  className,
}) => (
  <Card className={clsx(className, getPersonBg(data?.bedtime))}>
    <Icon>bedtime</Icon>
    {formatPerson(data?.bedtime)}
  </Card>
);
