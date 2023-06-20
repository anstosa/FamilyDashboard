import React, { FunctionComponent, useState } from "react";
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
  const [showTicks, setShowTicks] = useState<boolean>(false);

  return (
    <Card className={className} onClick={() => setShowTicks(!showTicks)}>
      {/* Bedtime Morning */}
      <div
        title="Bedtime (Morning)"
        className={clsx(ZONE_CLASSES, SLEEP_COLOR)}
        style={(() => {
          const end = getAdjustedHours(6);
          return { left: 0, right: `calc(100% - ${getPercentOfDay(end)}%)` };
        })()}
      />

      {showTicks &&
        [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => (
          <div
            className="absolute w-px h-1 bg-white top-0 z-30 opacity-50"
            key={hour}
            style={(() => {
              const tick = getAdjustedHours(hour);
              return { left: `${getPercentOfDay(tick)}%` };
            })()}
          >
            <span className="text-xs -ml-1 absolute top-2">
              {hour > 12 ? hour - 12 : hour}
            </span>
          </div>
        ))}

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
          style={(() => {
            const start = getAdjustedHours(time.hour + time.minute / 60);
            return { left: `${getPercentOfDay(start)}%` };
          })()}
        />
      )}

      <Icon className="z-20">schedule</Icon>
      <span className="z-20">{time?.toFormat("h:mm")}</span>
    </Card>
  );
};
