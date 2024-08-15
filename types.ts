import { Region } from "react-native-maps";

// Existing types
export interface CarType {
  // ... (keep existing CarType interface)
}

export interface LocationData {
  // ... (keep existing LocationData interface)
}

export type RootStackParamList = {
  // ... (keep existing RootStackParamList type)
};

// New profile-related types
export interface CommonProfileFields {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other" | "Prefer not to say";
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  preferredLanguage?: string;
  rating?: number;
  accountCreationDate?: Date;
  lastLoginDate?: Date;
}

export interface PassengerFields extends CommonProfileFields, WalletFields {
  homeAddress?: string;
  workAddress?: string;
  frequentDestinations?: string[];
  paymentMethods?: {
    type: "Credit Card" | "Debit Card" | "PayPal" | "Cash";
    details: string;
  }[];
  ridePreferences?: {
    musicPreference?: "No music" | "Soft" | "Loud";
    temperaturePreference?: "Cool" | "Warm" | "No preference";
    conversationPreference?: "Chatty" | "Quiet" | "No preference";
  };
  accessibility?: {
    wheelchairAccess: boolean;
    visualAid: boolean;
    hearingAid: boolean;
  };
}

export interface DriverFields extends CommonProfileFields, WalletFields {
  driverLicenseNumber: string;
  driverLicenseExpiry: Date;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    licenseNumber: string;
    registrationState: string;
  };
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    expiryDate: Date;
  };
  bankAccountInfo?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  backgroundCheckStatus: "Pending" | "Approved" | "Rejected";
  availabilitySchedule?: {
    day:
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday";
    startTime: string;
    endTime: string;
  }[];
  totalRides?: number;
  totalEarnings?: number;
  averageRating?: number;
  specialSkills?: string[];
  languages?: string[];
  allowsPets: boolean;
  petRestrictions?: string;
}

export interface PetOwnerFields extends PassengerFields, WalletFields {
  pets: {
    name: string;
    type: "Dog" | "Cat" | "Bird" | "Other";
    breed: string;
    size: "Small" | "Medium" | "Large";
    weight: number;
    age: number;
    vaccinationStatus: boolean;
    specialNeeds?: string;
  }[];
  preferredCarriers?: {
    type: "Crate" | "Carrier" | "Harness";
    size: "Small" | "Medium" | "Large";
  }[];
  veterinarianContact?: {
    name: string;
    phone: string;
    address: string;
  };
  petInsurance?: {
    provider: string;
    policyNumber: string;
  };
}

//new when wallet was introduced

// Basic user profile for initial sign-up
export interface BasicUserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
}

// Wallet types
export interface Card {
  id: string;
  name: string;
  type: "credit" | "debit" | "loyalty" | "transport";
  number: string;
  expiryDate?: string;
  balance?: number;
  issuer?: string;
  points?: number;
  color?: string;
  isDefault?: boolean;
  cardProvider?: string; // e.g., Visa, Mastercard, etc.
  cardHolderName?: string;
  cvv?: string; // Note: Store this securely or consider not storing it at all
  billingAddress?: string;
  currency?: string;
  isActive?: boolean;
  lastUsed?: Date;
}

export interface Transaction {
  id: string;
  cardId: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  date: Date;
  category?: string;
  merchantName?: string;
  status: "pending" | "completed" | "failed";
}

export interface WalletFields {
  walletId: string;
  cards: Card[];
  preferredCard?: string; // ID of the preferred card
  walletBalance: number;
  walletCurrency: string;
  lastTransaction?: Transaction;
}

export interface WalletSummaryProps {
  totalBalance: number;
  currency: string;
  cardCount: number;
}

export interface WalletProfile {
  userId: string;
  walletId: string;
  cards: Card[];
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export type RideHailingUserType =
  | PassengerFields
  | DriverFields
  | PetOwnerFields;

// Combined user profile
export interface FullUserProfile {
  basicProfile: BasicUserProfile;
  walletProfile?: WalletProfile;
  rideHailingProfile?: RideHailingUserType;
}

export type UserProfileTypes = PassengerFields | DriverFields | PetOwnerFields;
