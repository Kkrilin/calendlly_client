import { config } from "./config";

const serverBaseUrl = config.serverBaseUrl;
export const header = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const eventBaseUrl = `${serverBaseUrl}/api/event-types`;
export const availabilityBaseUrl = `${serverBaseUrl}/api/availabilities`;
export const eventLookUpUrl = `${serverBaseUrl}/book/look-up`
