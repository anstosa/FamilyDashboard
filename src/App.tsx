import React, { FunctionComponent, useEffect, useState } from "react";
import { APIResponse, formatPerson, getData, getPersonBg } from "./utils/api";
import { Card } from "./components/Card";
import { CardGroup } from "./components/CardGroup";
import clsx from "clsx";
import { Icon } from "./components/Icon";
import { DateTime } from "luxon";

export const App: FunctionComponent = () => {
  const [data, setData] = useState<APIResponse | undefined>();
  const [time, setTime] = useState<DateTime>(DateTime.local());
  const isLoading = typeof data === "undefined";

  useEffect(() => {
    (async () => {
      // get initial data
      setData(await getData());
    })();

    // refresh data every minute
    setInterval(async () => {
      setData(await getData());
      setTime(DateTime.local());
    }, 1000 * 60);

    // reload every 24 hours
    setTimeout(window.location.reload, 1000 * 60 * 60 * 24);
  }, []);

  return (
    <>
      <div
        className={clsx(
          "h-screen w-screen",
          "flex flex-col justify-stretch gap-8 p-8",
          {
            blur: isLoading,
          }
        )}
      >
        {/* DATE + TIME */}
        <CardGroup>
          <Card className="w-1/2">
            <Icon>calendar_month</Icon>
            {time.toFormat("cccc")}
          </Card>
          <Card className="w-1/2">
            {/* Bedtime 2 */}
            <div
              className={clsx(
                "absolute top-0 left-0 h-full z-0",
                "bg-slate-800"
              )}
              style={(() => {
                const start = 0;
                const end = 6;
                const hours = end - start;
                const section = hours / 24;
                return { width: `${section * 100}%` };
              })()}
            />
            {/* Nap */}
            <div
              className={clsx("absolute top-0 h-full z-0", "bg-slate-800")}
              style={(() => {
                const start = 13;
                const end = 15;
                const hours = end - start;
                const width = hours / 24;
                const left = start / 24;
                return { width: `${width * 100}%`, left: `${left * 100}%` };
              })()}
            />
            {/* Bedtime 1 */}
            <div
              className={clsx("absolute top-0 h-full z-0", "bg-slate-800")}
              style={(() => {
                const start = 19;
                const end = 24;
                const hours = end - start;
                const width = hours / 24;
                const left = start / 24;
                return { width: `${width * 100}%`, left: `${left * 100}%` };
              })()}
            />
            {/* Current Time */}
            <div
              className={clsx(
                "absolute top-0 w-1 h-full z-10",
                "bg-violet-500"
              )}
              style={{
                left: ((): string => {
                  const hours = time.hour + time.minute / 60;
                  const progress = hours / 19;
                  return `${progress * 100}%`;
                })(),
              }}
            />
            <Icon className="z-20">schedule</Icon>
            <span className="z-20">{time.toFormat("h:mm")}</span>
          </Card>
        </CardGroup>

        {/* SCHOOL */}
        <CardGroup>
          {data?.isSchoolDay ? (
            <Card className="w-1/3">
              <Icon>backpack</Icon>
              School
            </Card>
          ) : (
            <Card className="w-1/3">
              <Icon>house</Icon>
              Home
            </Card>
          )}
          <Card
            className={clsx("w-1/3", getPersonBg(data?.dropoff))}
            disabled={!data?.isSchoolDay}
          >
            <div className="flex gap-4">
              <Icon>directions_car</Icon>
              <Icon>arrow_right</Icon>
              <Icon>store</Icon>
            </div>
            {formatPerson(data?.dropoff)}
          </Card>
          <Card
            className={clsx("w-1/3", getPersonBg(data?.pickup))}
            disabled={!data?.isSchoolDay}
          >
            <div className="flex gap-4">
              <Icon>store</Icon>
              <Icon>arrow_right</Icon>
              <Icon>directions_car</Icon>
            </div>
            {formatPerson(data?.pickup)}
          </Card>
        </CardGroup>

        {/* SLEEP */}
        <CardGroup>
          <Card className="w-1/2" disabled={data?.isSchoolDay}>
            <Icon>bed</Icon>
            {formatPerson(data?.nap)}
          </Card>
          <Card className={clsx("w-1/2", getPersonBg(data?.bedtime))}>
            <Icon>bedtime</Icon>
            {formatPerson(data?.bedtime)}
          </Card>
        </CardGroup>
      </div>
      {isLoading && (
        <div
          className={clsx("fixed inset-0", "flex items-center justify-center")}
        >
          <Icon className="animate-spin">refresh</Icon>
        </div>
      )}
    </>
  );
};

export default App;
