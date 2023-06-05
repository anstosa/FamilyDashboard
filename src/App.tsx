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
            <Icon>schedule</Icon>
            {time.toFormat("h:mm")}
          </Card>
        </CardGroup>

        {/* SCHOOL */}
        <CardGroup>
          {data?.isSchoolDay ? (
            <Card className="w-1/2">
              <Icon>backpack</Icon>
              School Day
            </Card>
          ) : (
            <Card className="w-1/2">
              <Icon>house</Icon>
              Home Day
            </Card>
          )}
          <Card className="w-1/2" disabled={!data?.isSchoolDay}>
            <Icon>directions_car</Icon>
            {formatPerson(data?.dropoff)}
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
