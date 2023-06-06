import React, { FunctionComponent } from "react";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { DateTime } from "luxon";
import clsx from "clsx";

const DAY_START = 5;
const DAY_END = 20.5;
const dayLength = DAY_END - DAY_START;
const SLEEP_COLOR = "bg-slate-800";
const ZONE_CLASSES = "absolute top-0 h-full z-0";

const getAdjustedHours = (hours: number): number => hours - DAY_START;
const getPercentOfDay = (hours: number): number => (hours / dayLength) * 100;

interface Properties {
  time?: DateTime;
  className?: string;
}

export const TimeCard: FunctionComponent<Properties> = ({
  time,
  className,
}) => {
  return (
    <Card className={className}>
      {/* Bedtime Morning */}
      <div
        title="Bedtime (Morning)"
        className={clsx(ZONE_CLASSES, SLEEP_COLOR)}
        style={(() => {
          const end = getAdjustedHours(6);
          return { left: 0, right: `calc(100% - ${getPercentOfDay(end)}%)` };
        })()}
      />

      {/* Nap */}
      <div
        title="Nap"
        className={clsx(ZONE_CLASSES, SLEEP_COLOR)}
        style={(() => {
          const start = getAdjustedHours(13);
          const end = getAdjustedHours(15);
          return {
            width: `${getPercentOfDay(end - start)}%`,
            left: `${getPercentOfDay(start)}%`,
          };
        })()}
      />

      {/* Bedtime Night */}
      <div
        title="Bedtime (Night)"
        className={clsx(ZONE_CLASSES, SLEEP_COLOR)}
        style={(() => {
          const start = getAdjustedHours(19);
          return { left: `${getPercentOfDay(start)}%`, right: 0 };
        })()}
      />

      {/* Current Time */}
      {time && (
        <div
          className={clsx(
            "absolute top-0 w-1 -ml-[2px] h-full z-10",
            "bg-violet-500"
          )}
          style={{
            left: ((): string => {
              const hours = time.hour + time.minute / 60 - DAY_START;
              const now = hours / 19;
              return `${now * 100}%`;
            })(),
          }}
        />
      )}

      <Icon className="z-20">schedule</Icon>
      <span className="z-20">{time?.toFormat("h:mm")}</span>
    </Card>
  );
};
