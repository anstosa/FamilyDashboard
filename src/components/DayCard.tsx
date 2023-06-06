import React, { FunctionComponent } from "react";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { DateTime } from "luxon";

interface Properties {
  time?: DateTime;
  className?: string;
}
export const DayCard: FunctionComponent<Properties> = ({ time, className }) => (
  <Card className={className}>
    <Icon>calendar_month</Icon>
    {time?.toFormat("cccc")}
  </Card>
);
