import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useFaceDetection } from "react-native-vision-camera";

const FaceRecognition = ({ onVerify }) => {
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.front;
  const [isVerified, setIsVerified] = useState(false);

  const frameProcessor = useFaceDetection({
    detectLandmarks: "all",
    runClassifications: "all",
  });

  useEffect(() => {
    if (frameProcessor.faces.length > 0) {
      // Implement your face verification logic here
      // For simplicity, let's assume verification is successful if a face is detected
      setIsVerified(true);
      onVerify(true);
    } else {
      setIsVerified(false);
      onVerify(false);
    }
  }, [frameProcessor.faces]);

  if (device == null) return <Text>No camera available</Text>;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.preview}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      {isVerified && <Text style={styles.verifiedText}>Verified</Text>}
      {!isVerified && <Text style={styles.notVerifiedText}>Not Verified</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  verifiedText: {
    color: "green",
    fontSize: 18,
    textAlign: "center",
  },
  notVerifiedText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default FaceRecognition;
