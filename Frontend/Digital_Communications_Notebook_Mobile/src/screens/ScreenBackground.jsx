import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const ScreenBackground = ({ children }) => {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/notebook-paper-background-lined-notebook-paper_322958-1549.jpg?semt=ais_hybrid",
      }}
      resizeMode="cover"
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default ScreenBackground;
