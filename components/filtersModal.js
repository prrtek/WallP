import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { theme } from "../constants/theme";
import { capitalize, hp } from "../helpers/common";
import { ColorFilter, CommonFilterRow, SectionView } from "./filterViews";
import { data } from "../constants/data";

// CustomBackdrop component with blackish blur effect
const CustomBackdrop = ({ animatedIndex, style }) => {
  return (
    <Animated.View style={[style, styles.backdrop]}>
      <BlurView
        intensity={80} // Adjust the intensity of the blur effect
        style={StyleSheet.absoluteFill}
        tint='dark' // Dark tint to create a blackish blur effect
      >
        <View style={styles.overlay} />
      </BlurView>
    </Animated.View>
  );
};

// FiltersModal component with BottomSheetModal
export default function FiltersModal({
  modalRef,
  onClose,
  onApply,
  onReset,
  filters,
  setFilters,
}) {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>

          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let sectionData = data.filters[sectionName];
            let title = capitalize(sectionName);
            return (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
                key={sectionName}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </Animated.View>
            );
          })}
          <Animated.View
            entering={FadeInDown.delay(500).springify().damping(11)}
            style={styles.buttons}
          >
            <Pressable style={styles.resetButton} onPress={onReset}>
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.neutral(0.9) },
                ]}
              >
                Reset
              </Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={onApply}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const sections = {
  order: (props) => <CommonFilterRow {...props} />,
  orientation: (props) => <CommonFilterRow {...props} />,
  type: (props) => <CommonFilterRow {...props} />,
  colors: (props) => <ColorFilter {...props} />,
};

// Styles
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  backdrop: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
  },
  content: {
    flex: 1,
    gap: 15,
    // width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  applyButton: {
    flex: 1,
    padding: 12,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.neutral(0.8),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
  },
  resetButton: {
    flex: 1,
    padding: 12,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.neutral(0.03),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.grayBG,
  },
  buttonText: {
    fontSize: hp(2.2),
  },
});
