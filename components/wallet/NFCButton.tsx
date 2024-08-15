// components/wallet/NFCButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
// You'll need to set up NFC functionality, possibly using a library like react-native-nfc-manager

interface NFCButtonProps {
  card: Card;
}

export function NFCButton({ card }: NFCButtonProps) {
  const handleNFCTap = () => {
    // Implement NFC functionality here
    console.log("NFC tap for card:", card.id);
  };

  return (
    <TouchableOpacity onPress={handleNFCTap}>
      <Text>Use NFC</Text>
    </TouchableOpacity>
  );
}

export default NFCButton;
