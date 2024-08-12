import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Switch,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "@/contexts/AuthContext";
import {
  UserProfileTypes,
  PassengerFields,
  PetOwnerFields,
  DriverFields,
} from "@/types";
import { useRouter } from "expo-router";

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfileTypes | null>(null);
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user && user.profile) {
      setProfile(user.profile);
    }
  }, [user]);

  const updateField = (field: string, value: any) => {
    setProfile((prevProfile) => {
      if (prevProfile) {
        return { ...prevProfile, [field]: value };
      }
      return null;
    });
  };

  const renderProfileFields = () => {
    if (!profile) return null;

    switch (profile.userType) {
      case "Passenger":
        return (
          <PassengerFieldsComponent
            profile={profile as PassengerFields}
            updateField={updateField}
          />
        );
      case "Pet Owner":
        return (
          <PetOwnerFieldsComponent
            profile={profile as PetOwnerFields}
            updateField={updateField}
          />
        );
      case "Driver":
        return (
          <DriverFieldsComponent
            profile={profile as DriverFields}
            updateField={updateField}
          />
        );
      default:
        return null;
    }
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      if (profile) {
        await updateProfile(profile);
        Alert.alert("Success", "Profile updated successfully");
        router.back();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <CommonFields profile={profile} updateField={updateField} />
      {renderProfileFields()}
      <Button
        title="Update Profile"
        onPress={handleUpdate}
        disabled={isUpdating}
      />
      {isUpdating && <ActivityIndicator size="large" color="#0000ff" />}
    </ScrollView>
  );
}

const CommonFields = ({ profile, updateField }) => (
  <>
    <TextInput
      style={styles.input}
      value={profile.fullName}
      onChangeText={(text) => updateField("fullName", text)}
      placeholder="Full Name"
    />
    <TextInput
      style={styles.input}
      value={profile.email}
      onChangeText={(text) => updateField("email", text)}
      placeholder="Email Address"
    />
    <TextInput
      style={styles.input}
      value={profile.phoneNumber}
      onChangeText={(text) => updateField("phoneNumber", text)}
      placeholder="Phone Number"
    />
    <TextInput
      style={styles.input}
      value={profile.profilePicture}
      onChangeText={(text) => updateField("profilePicture", text)}
      placeholder="Profile Picture (optional)"
    />
    <TextInput
      style={styles.input}
      value={profile.photoSelfieID}
      onChangeText={(text) => updateField("photoSelfieID", text)}
      placeholder="Photo Selfie ID (real-time)"
    />
    <TextInput
      style={styles.input}
      value={profile.governmentID}
      onChangeText={(text) => updateField("governmentID", text)}
      placeholder="Government-Issued ID"
    />
    <TextInput
      style={styles.input}
      value={profile.preferredPaymentMethod}
      onChangeText={(text) => updateField("preferredPaymentMethod", text)}
      placeholder="Preferred Payment Method"
    />
    <TextInput
      style={styles.input}
      value={profile.cardDetails}
      onChangeText={(text) => updateField("cardDetails", text)}
      placeholder="Card Details (if applicable)"
    />
    <TextInput
      style={styles.input}
      value={profile.billingAddress}
      onChangeText={(text) => updateField("billingAddress", text)}
      placeholder="Billing Address (if applicable)"
    />
    <TextInput
      style={styles.input}
      value={profile.emergencyContactName}
      onChangeText={(text) => updateField("emergencyContactName", text)}
      placeholder="Emergency Contact Name"
    />
    <TextInput
      style={styles.input}
      value={profile.emergencyContactPhoneNumber}
      onChangeText={(text) => updateField("emergencyContactPhoneNumber", text)}
      placeholder="Emergency Contact Phone Number"
    />
    <TextInput
      style={styles.input}
      value={profile.preferredLanguage}
      onChangeText={(text) => updateField("preferredLanguage", text)}
      placeholder="Preferred Language"
    />
    <TextInput
      style={styles.input}
      value={profile.accessibilityNeeds}
      onChangeText={(text) => updateField("accessibilityNeeds", text)}
      placeholder="Accessibility Needs"
    />
    <TextInput
      style={styles.input}
      value={profile.notificationPreferences}
      onChangeText={(text) => updateField("notificationPreferences", text)}
      placeholder="Notification Preferences"
    />
  </>
);

const PassengerFieldsComponent = ({ profile, updateField }) => {
  const passengerProfile = profile as PassengerFields;
  return (
    <>
      <TextInput
        style={styles.input}
        value={passengerProfile.homeAddress}
        onChangeText={(text) => updateField("homeAddress", text)}
        placeholder="Home Address"
      />
      <TextInput
        style={styles.input}
        value={passengerProfile.workAddress}
        onChangeText={(text) => updateField("workAddress", text)}
        placeholder="Work Address"
      />
      {/* Add more passenger-specific fields here */}
    </>
  );
};

const PetOwnerFieldsComponent = ({ profile, updateField }) => {
  const petOwnerProfile = profile as PetOwnerFields;
  return (
    <>
      <Text style={styles.sectionTitle}>Pet Information</Text>
      {petOwnerProfile.pets.map((pet, index) => (
        <View key={index} style={styles.petContainer}>
          <TextInput
            style={styles.input}
            value={pet.name}
            onChangeText={(text) => {
              const updatedPets = [...petOwnerProfile.pets];
              updatedPets[index].name = text;
              updateField("pets", updatedPets);
            }}
            placeholder="Pet Name"
          />
          <TextInput
            style={styles.input}
            value={pet.type}
            onChangeText={(text) => {
              const updatedPets = [...petOwnerProfile.pets];
              updatedPets[index].type = text as
                | "Dog"
                | "Cat"
                | "Bird"
                | "Other";
              updateField("pets", updatedPets);
            }}
            placeholder="Type of Pet (e.g., dog, cat)"
          />
          <TextInput
            style={styles.input}
            value={pet.breed}
            onChangeText={(text) => {
              const updatedPets = [...petOwnerProfile.pets];
              updatedPets[index].breed = text;
              updateField("pets", updatedPets);
            }}
            placeholder="Pet Breed"
          />
          <TextInput
            style={styles.input}
            value={pet.size}
            onChangeText={(text) => {
              const updatedPets = [...petOwnerProfile.pets];
              updatedPets[index].size = text as "Small" | "Medium" | "Large";
              updateField("pets", updatedPets);
            }}
            placeholder="Pet Size (e.g., small, medium, large)"
          />
          <TextInput
            style={styles.input}
            value={pet.weight.toString()}
            onChangeText={(text) => {
              const updatedPets = [...petOwnerProfile.pets];
              updatedPets[index].weight = parseInt(text, 10);
              updateField("pets", updatedPets);
            }}
            placeholder="Pet Weight"
          />
          <TextInput
            style={styles.input}
            value={pet.age.toString()}
            onChangeText={(text) => {
              const updatedPets = [...petOwnerProfile.pets];
              updatedPets[index].age = parseInt(text, 10);
              updateField("pets", updatedPets);
            }}
            placeholder="Pet Age"
          />
          <Switch
            value={pet.vaccinationStatus}
            onValueChange={(value) => {
              const updatedPets = [...petOwnerProfile.pets];
              updatedPets[index].vaccinationStatus = value;
              updateField("pets", updatedPets);
            }}
          />
          <TextInput
            style={styles.input}
            value={pet.specialNeeds || ""}
            onChangeText={(text) => {
              const updatedPets = [...petOwnerProfile.pets];
              updatedPets[index].specialNeeds = text;
              updateField("pets", updatedPets);
            }}
            placeholder="Special Needs"
          />
        </View>
      ))}
      <Button
        title="Add Pet"
        onPress={() => {
          const newPet = {
            name: "",
            type: "Dog",
            breed: "",
            size: "Medium",
            weight: 0,
            age: 0,
            vaccinationStatus: false,
            specialNeeds: "",
          };
          updateField("pets", [...petOwnerProfile.pets, newPet]);
        }}
      />
    </>
  );
};

const DriverFieldsComponent = ({ profile, updateField }) => {
  const driverProfile = profile as DriverFields;
  return (
    <>
      <Text style={styles.sectionTitle}>Driver Information</Text>
      <TextInput
        style={styles.input}
        value={driverProfile.driverLicenseNumber}
        onChangeText={(text) => updateField("driverLicenseNumber", text)}
        placeholder="Driver's License Number"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.driverLicenseExpiry.toString()}
        onChangeText={(text) =>
          updateField("driverLicenseExpiry", new Date(text))
        }
        placeholder="Driver's License Expiry Date"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.vehicleInfo.make}
        onChangeText={(text) =>
          updateField("vehicleInfo", {
            ...driverProfile.vehicleInfo,
            make: text,
          })
        }
        placeholder="Vehicle Make"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.vehicleInfo.model}
        onChangeText={(text) =>
          updateField("vehicleInfo", {
            ...driverProfile.vehicleInfo,
            model: text,
          })
        }
        placeholder="Vehicle Model"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.vehicleInfo.year.toString()}
        onChangeText={(text) =>
          updateField("vehicleInfo", {
            ...driverProfile.vehicleInfo,
            year: parseInt(text, 10),
          })
        }
        placeholder="Vehicle Year"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.vehicleInfo.color}
        onChangeText={(text) =>
          updateField("vehicleInfo", {
            ...driverProfile.vehicleInfo,
            color: text,
          })
        }
        placeholder="Vehicle Color"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.vehicleInfo.licensePlate}
        onChangeText={(text) =>
          updateField("vehicleInfo", {
            ...driverProfile.vehicleInfo,
            licensePlate: text,
          })
        }
        placeholder="Vehicle License Plate"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.insuranceInfo.provider}
        onChangeText={(text) =>
          updateField("insuranceInfo", {
            ...driverProfile.insuranceInfo,
            provider: text,
          })
        }
        placeholder="Insurance Provider"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.insuranceInfo.policyNumber}
        onChangeText={(text) =>
          updateField("insuranceInfo", {
            ...driverProfile.insuranceInfo,
            policyNumber: text,
          })
        }
        placeholder="Insurance Policy Number"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.insuranceInfo.expiryDate.toString()}
        onChangeText={(text) =>
          updateField("insuranceInfo", {
            ...driverProfile.insuranceInfo,
            expiryDate: new Date(text),
          })
        }
        placeholder="Insurance Expiry Date"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.bankAccountInfo?.accountNumber || ""}
        onChangeText={(text) =>
          updateField("bankAccountInfo", {
            ...driverProfile.bankAccountInfo,
            accountNumber: text,
          })
        }
        placeholder="Bank Account Number"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.bankAccountInfo?.routingNumber || ""}
        onChangeText={(text) =>
          updateField("bankAccountInfo", {
            ...driverProfile.bankAccountInfo,
            routingNumber: text,
          })
        }
        placeholder="Bank Routing Number"
      />
      <TextInput
        style={styles.input}
        value={driverProfile.bankAccountInfo?.bankName || ""}
        onChangeText={(text) =>
          updateField("bankAccountInfo", {
            ...driverProfile.bankAccountInfo,
            bankName: text,
          })
        }
        placeholder="Bank Name"
      />
      <Text style={styles.label}>Background Check Status</Text>
      <Text style={styles.value}>{driverProfile.backgroundCheckStatus}</Text>
      {/* Add more driver-specific fields here */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  petContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});
