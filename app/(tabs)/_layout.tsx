import { Tabs } from "expo-router";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function TabLayout() {
  const [sosVisible, setSosVisible] = useState(false);

  return (
    <>
      <Tabs
        tabBar={(props) => (
          <CustomTabBar {...props} onSOSPress={() => setSosVisible(true)} />
        )}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="reports" options={{ title: "Reports" }} />
      </Tabs>

      <Modal
        visible={sosVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSosVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🚨 SOS Alert</Text>
            <Text style={styles.modalBody}>
              Do you want to send an emergency alert?
            </Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setSosVisible(false);
                // your SOS logic here
              }}
            >
              <Text style={styles.confirmText}>Send Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSosVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

function CustomTabBar({ state, descriptors, navigation, onSOSPress }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Insert SOS button in the middle
        const isMiddle = index === Math.floor(state.routes.length / 2);

        return (
          <View key={route.key} style={{ flex: 1 }}>
            {isMiddle && (
              <TouchableOpacity onPress={onSOSPress} style={styles.sosWrapper}>
                <View style={styles.sosButton}>
                  <Text style={styles.sosText}>SOS</Text>
                </View>
              </TouchableOpacity>
            )}
            {!isMiddle && (
              <TouchableOpacity
                onPress={() => {
                  if (!isFocused) navigation.navigate(route.name);
                }}
                style={styles.tabItem}
              >
                <Text
                  style={[styles.tabLabel, isFocused && styles.tabLabelActive]}
                >
                  {options.title}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 70,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  tabLabel: {
    fontSize: 12,
    color: "#999",
  },
  tabLabelActive: {
    color: "#E53935",
  },
  sosWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  sosButton: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sosText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E53935",
  },
  modalBody: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#E53935",
    width: "100%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelText: {
    color: "#555",
    fontSize: 16,
  },
});
