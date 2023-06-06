import React, { FunctionComponent, useEffect, useState } from "react";
import { APIResponse, getData } from "./utils/api";
import { CardGroup } from "./components/CardGroup";
import clsx from "clsx";
import { Icon } from "./components/Icon";
import { DateTime } from "luxon";
import { BedtimeCard } from "./components/BedtimeCard";
import { NapCard } from "./components/NapCard";
import { PickupCard } from "./components/PickupCard";
import { DropoffCard } from "./components/DropoffCard";
import { SchoolCard } from "./components/SchoolCard";
import { DayCard } from "./components/DayCard";
import { TimeCard } from "./components/TimeCard";

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
          <DayCard className="w-1/2" time={time} />
          <TimeCard className="w-1/2" time={time} />
        </CardGroup>

        {/* SCHOOL */}
        <CardGroup>
          <SchoolCard data={data} className="w-1/3" />
          <DropoffCard data={data} className="w-1/3" />
          <PickupCard data={data} className="w-1/3" />
        </CardGroup>

        {/* SLEEP */}
        <CardGroup>
          <NapCard data={data} className="w-1/2" />
          <BedtimeCard data={data} className="w-1/2" />
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
