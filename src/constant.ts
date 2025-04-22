export const enum  GoogleUserstatus {
    EXISTING_USER= 'EXISTING_USER',
    NEW_USER = "NEW_USER"
}

// Base user structure
export interface BaseUserData {
  id: string;
  name: string;
  email: string;
  profileSlug: string;
}

// Extend base user structure for Google
interface GoogleUserData extends BaseUserData {
  googleId: string;
}

// Signup response
export interface SignupResponse {
  success: 1 | 0;
  token: string;
  userData: BaseUserData;
}

// Login response (same structure as signup)
export interface LoginResponse extends SignupResponse {}

// Google Auth response
export interface GoogleAuthAxiosResponse extends Omit<SignupResponse, "userData"> {
  userData: GoogleUserData;
  status: GoogleUserstatus;
}


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


export interface EventTypeResponse {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  eventSlug: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  User?: BaseUserData
  // location?: string; // Uncomment if location is added later
}



export interface MeetingData {
  id: string;
  guest_name: string;
  guest_email: string;
  start_time: string; // ISO format string
  end_time: string;   // ISO format string
  reminderSent: boolean;
  isReschedule: boolean;
  rescheduleBy?: string;
  rescheduleReason?: string;
  googleEventId?: string;
  userId: string;
  eventTypeId: string;
  EventType?: EventTypeResponse;
  User?: BaseUserData;
}


export type GroupedMeetings = {
  [date: string]: MeetingData[];
};