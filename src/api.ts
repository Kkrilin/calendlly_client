import { AxiosRequestConfig } from 'axios';
import { config } from "./config";
const serverBaseUrl = config.serverBaseUrl;
// token
export const header:AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const userBaseUrl: string = `${serverBaseUrl}/api/users`;
export const eventBaseUrl: string = `${serverBaseUrl}/api/event-types`;
export const availabilityBaseUrl: string = `${serverBaseUrl}/api/availabilities`;
export const bookingBaseUrl: string = `${serverBaseUrl}/api/bookings`;

// public url
export const eventLookUpUrl: string = `${serverBaseUrl}/bookings/look-up`;
export const eventBookingUrl: string = `${serverBaseUrl}/bookings/events`;
export const getTimeSlotsUrl: string = `${serverBaseUrl}/bookings/slots`;
export const resheduleBookingUrl: string = `${serverBaseUrl}/bookings/reschedules`;
