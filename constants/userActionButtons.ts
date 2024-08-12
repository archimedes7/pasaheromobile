// src/constants/userActionButtons.ts

import { UserProfileTypes } from "@/types";

const commonActions = [
  { label: "Edit Profile", icon: "person", route: "editProfile" },
  { label: "Settings", icon: "settings", route: "settings" },
  { label: "Raise Concern", icon: "warning", route: "raiseConcern" },
];

export const actionButtonsByUserType: Record<
  keyof UserProfileTypes,
  Array<{ label: string; icon: string; route: string }>
> = {
  Passenger: [
    ...commonActions,
    { label: "Addresses", icon: "home", route: "addresses" },
    { label: "Payment Methods", icon: "card", route: "paymentMethods" },
    { label: "Ride Preferences", icon: "options", route: "ridePreferences" },
    { label: "Accessibility", icon: "accessibility", route: "accessibility" },
    { label: "Ride History", icon: "time", route: "rideHistory" },
    { label: "Schedule Ride", icon: "calendar", route: "scheduleRide" },
  ],
  "Pet Owner": [
    ...commonActions,
    { label: "Manage Pets", icon: "paw", route: "managePets" },
    { label: "Addresses", icon: "home", route: "addresses" },
    { label: "Payment Methods", icon: "card", route: "paymentMethods" },
    { label: "Ride Preferences", icon: "options", route: "ridePreferences" },
    { label: "Pet Carriers", icon: "cube", route: "petCarriers" },
    { label: "Vet Contact", icon: "medical", route: "vetContact" },
    { label: "Pet Insurance", icon: "shield", route: "petInsurance" },
    { label: "Ride History", icon: "time", route: "rideHistory" },
    { label: "Schedule Ride", icon: "calendar", route: "scheduleRide" },
  ],
  Driver: [
    ...commonActions,
    { label: "Vehicle Information", icon: "car", route: "vehicleInfo" },
    {
      label: "License & Insurance",
      icon: "document-text",
      route: "licenseInsurance",
    },
    { label: "Bank Account", icon: "cash", route: "bankAccount" },
    {
      label: "Background Check",
      icon: "shield-checkmark",
      route: "backgroundCheck",
    },
    {
      label: "Availability Schedule",
      icon: "calendar",
      route: "availabilitySchedule",
    },
    { label: "Earnings", icon: "stats-chart", route: "earnings" },
    { label: "Ride History", icon: "time", route: "rideHistory" },
    { label: "Pet Preferences", icon: "paw", route: "petPreferences" },
    { label: "Gas Input", icon: "speedometer", route: "gasInput" },
    { label: "Scheduled Rides", icon: "list", route: "scheduledRides" },
  ],
};
