import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsPointsOfInterest={true}
        initialRegion={{
          latitude: 9.3,
          longitude: 123.0,
          latitudeDelta: 1.0,
          longitudeDelta: 1.0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
