import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 6000);
  });
  return (
    <View style={styles.container}>
      {isShowSplashScreen ? <SplashScreen /> : <HomeScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});