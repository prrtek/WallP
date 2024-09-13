import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize, wp } from "../helpers/common";
import { theme } from "../constants/theme";

export default function ImageCard({ item, router }) {
  // Destructure the item prop
  const getImageHeight = () => {
    let { imageHeight, imageWidth } = item; // Fixed typo: imageheight to imageHeight
    return { height: getImageSize(imageHeight, imageWidth) };
  };

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "home/image", params: { ...item } })
      }
      style={[styles.imageWrapper, styles.spacing]}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={{ uri: item?.webformatURL }} // Added uri property
        transition={100}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 10,
    // marginVertical: 5,
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});
