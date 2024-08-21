// src/data/mockData.ts or src/utils/mockData.ts

export const sampleReceiptData = {
  tripDetails: {
    startLocation: "123 Main St, Manila",
    endLocation: "456 Park Ave, Quezon City",
    startTime: "14:30",
    endTime: "15:15",
    distance: 12.5,
  },
  fareBreakdown: {
    baseFare: 12,
    distanceCharge: 187.5,
    timeCharge: 45,
    surgePricing: 0,
  },
  driver: {
    name: "Juan dela Cruz",
    vehicleMake: "Toyota",
    vehicleModel: "Vios",
    plateNumber: "ABC 123",
  },
  totalFare: 244.5,
  taxAmount: 26.89,
};
