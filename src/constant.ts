export const enum  GoogleUserstatus {
    EXISTING_USER= 'EXISTING_USER',
    NEW_USER = "NEW_USER"
}

export interface GoogleAuthAxiosResponse {
        success: 1 | 0,
        userData: {
          id: string,
          name: string,
          email: string,
          googleId: string,
        },
        token: string,
        status: GoogleUserstatus,
}

export interface SignupResponse {
    success: 1 | 0;
    token: string;
    userData: {
      id:string,
      name: string;
      email: string;
    };
  }

export interface LoginResponse extends SignupResponse {}

export const enum DayOfWeek {
   SUN = "sun",
   MON = "mon",
   TUE = "tue",
   WED = "wed",
   THU = "thu",
   FRI = "fri",
   SAT = "sat",
}

export const enum ActiveStatus  {
  INACTIVE,
  ACTIVE,
}

export interface AvailabilityPayload {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  active: ActiveStatus
}

export interface AvailabilityResponse {
  id: string;
  day_of_week: number;
  start_time: string | null;
  end_time: string | null;
  active: ActiveStatus;
}
