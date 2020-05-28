import React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabIcon = ({onPress, menuToggled}) => {
  const logoStyles = [styles.logoStyle];
  if (menuToggled !== null) {
    const animation = new Animated.Value(menuToggled ? 1 : 0);

    Animated.timing(animation, {
      toValue: menuToggled ? 0 : 1,
      duration: 500,
      useNativeDriver: true
    }).start();

    const rotateInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });
    const animatedStyles = { transform: [{ rotate: rotateInterpolate }] };
    logoStyles.push(animatedStyles);
  }

  return (
    <TouchableOpacity
      style={styles.tabStyle}
      onPress={onPress}
    >
      <Animated.View style={logoStyles}>
        <Ionicons name="md-arrow-dropdown" size={32} color="black" />
      </Animated.View>
    </TouchableOpacity>
  );
};
export default TabIcon
const styles = StyleSheet.create({
});
