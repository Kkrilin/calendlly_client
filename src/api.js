import { config } from "./config";

const serverBaseUrl = config.serverBaseUrl;
// token
export const header = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const userBaseUrl = `${serverBaseUrl}/api/users`;
export const eventBaseUrl = `${serverBaseUrl}/api/event-types`;
export const availabilityBaseUrl = `${serverBaseUrl}/api/availabilities`;
export const bookingBaseUrl = `${serverBaseUrl}/api/bookings`;

// public url
export const eventLookUpUrl = `${serverBaseUrl}/bookings/look-up`;
export const eventBookingUrl = `${serverBaseUrl}/bookings/events`;
export const getTimeSlotsUrl = `${serverBaseUrl}/bookings/slots`;
