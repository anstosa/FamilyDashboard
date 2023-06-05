const API_URL =
  "https://script.google.com/macros/s/AKfycbzeMxd1WdO7jiiPLyDD1WqXezIdqhvZ0FOVk3vYHwYV2bVZRtdxDfTKzBxQ8w86r1Ur/exec";

export enum Person {
  Mama = "mama",
  Papa = "papa",
  School = "school",
  Unknown = "unknown",
}

export const getPersonBg = (person?: Person): string => {
  switch (person) {
    case Person.Mama:
      return "bg-pink-700";
    case Person.Papa:
      return "bg-blue-700";
    case Person.School:
      return "";
    case Person.Unknown:
      return "";
    default:
      return "";
  }
};

export const getPersonText = (person?: Person): string => {
  switch (person) {
    case Person.Mama:
      return "text-pink-700";
    case Person.Papa:
      return "text-blue-700";
    case Person.School:
      return "";
    case Person.Unknown:
      return "";
    default:
      return "";
  }
};

export const formatPerson = (person?: Person): string => {
  switch (person) {
    case Person.Mama:
      return "Mama";
    case Person.Papa:
      return "Mama";
    case Person.School:
      return "School";
    case Person.Unknown:
      return "?????";
    default:
      return "Loading...";
  }
};

export interface APIResponse {
  isSchoolDay: boolean;
  dropoff: Person;
  pickup: Person;
  nap: Person;
  bedtime: Person;
}

let isFetching: Promise<APIResponse> | undefined;

export const getData = async (): Promise<APIResponse> => {
  if (isFetching) {
    return isFetching;
  } else {
    isFetching = new Promise(async (resolve) => {
      const response = await fetch(API_URL);
      const body = await response.json();
      resolve(body);
    });
    return isFetching;
  }
};
