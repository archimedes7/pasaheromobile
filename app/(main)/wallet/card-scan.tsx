import React, { useState, useEffect, useRef } from "react";
import { View, Button, Text } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { createWorker } from "tesseract.js";

export default function CardScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedText, setScannedText] = useState("");
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri);

      const worker = await createWorker();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(asset.uri);
      setScannedText(text);
      await worker.terminate();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={cameraRef} />
      <Button title="Scan Card" onPress={takePicture} />
      <Text>{scannedText}</Text>
    </View>
  );
}
