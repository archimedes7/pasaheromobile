// components/wallet/QRCodeButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import QRCode from "react-native-qrcode-svg"; // You'll need to install this package
import { Card } from "@/types";

interface QRCodeButtonProps {
  card: Card; // We'll define the Card type later
}

const QRCodeButton: React.FC<QRCodeButtonProps> = ({ card }) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setShowQR(!showQR)}>
        <Text>Show QR Code</Text>
      </TouchableOpacity>
      {showQR && <QRCode value={card.id} size={200} />}
    </>
  );
};

export default QRCodeButton;
