import React, { FunctionComponent } from "react";
import { APIResponse, formatPerson } from "../utils/api";
import { Card } from "./Card";
import { Icon } from "./Icon";

interface Properties {
  data?: APIResponse;
  className?: string;
}
export const NapCard: FunctionComponent<Properties> = ({ data, className }) => (
  <Card className={className} disabled={data?.isSchoolDay}>
    <Icon>bed</Icon>
    {formatPerson(data?.nap)}
  </Card>
);
