import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { wp, hp } from "../helpers/common";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.bgimage}
        resizeMode='cover'
      />
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={styles.animatedContainer}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View style={styles.contentContainer}>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.title}
          >
            Pixels
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            style={styles.punchline}
          >
            Every Pixel Tells a Story
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <Pressable
              onPress={() => router.push("home")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
    zIndex: -1, // Make sure background image is behind the gradient
  },
  animatedContainer: {
    flex: 1,
    position: "absolute",
    width: wp(100),
    height: hp(100),
    top: 0,
    left: 0,
    zIndex: 1, // Ensure gradient is above the background image
    justifyContent: "flex-end", // Position contentContainer at the bottom
    alignItems: "center",
  },
  gradient: {
    width: wp(100),
    height: hp(65),
    position: "absolute",
    bottom: 0,
  },
  contentContainer: {
    width: wp(100),
    paddingBottom: hp(6), // Add padding to avoid overlapping with the bottom
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  punchline: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
