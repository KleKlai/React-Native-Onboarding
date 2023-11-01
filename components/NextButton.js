import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

const NextButton = ({ percentage, scrollTo }) => {
  const size = 158;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={158} height={158}>
        <G rotation={-90} origin={center}>
          <Circle
            cx={center}
            cy={center}
            stroke="#E6E7E8"
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
            strokeWidth={2}
          />
          <Circle
            ref={progressRef}
            stroke="#493d8a"
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            strokeWidth={2}
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>

      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#493d8a",
    borderRadius: 50,
    padding: 35,
  },
});
