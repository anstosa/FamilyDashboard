import React, { FunctionComponent } from "react";
import { APIResponse, formatPerson, getPersonBg } from "../utils/api";
import { Card } from "./Card";
import { Icon } from "./Icon";
import clsx from "clsx";

interface Properties {
  data?: APIResponse;
  className?: string;
}
export const NapCard: FunctionComponent<Properties> = ({ data, className }) => (
  <Card
    className={clsx(className, getPersonBg(data?.bedtime))}
    disabled={data?.isSchoolDay}
  >
    <Icon>bed</Icon>
    {formatPerson(data?.nap)}
  </Card>
);
