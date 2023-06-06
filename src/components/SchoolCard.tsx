import React, { FunctionComponent } from "react";
import { APIResponse } from "../utils/api";
import { Card } from "./Card";
import { Icon } from "./Icon";

interface Properties {
  data?: APIResponse;
  className?: string;
}
export const SchoolCard: FunctionComponent<Properties> = ({
  data,
  className,
}) =>
  data?.isSchoolDay ? (
    <Card className={className}>
      <Icon>backpack</Icon>
      School
    </Card>
  ) : (
    <Card className={className}>
      <Icon>house</Icon>
      Home
    </Card>
  );
