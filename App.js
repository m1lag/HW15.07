import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const slide = useRef(new Animated.Value(-260)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: menuOpen ? 0 : -260,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(fade, {
      toValue: menuOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuOpen]);

  return (
    <View style={{ flex: 1 }}>
      <Pressable style={styles.menuButton} onPress={() => setMenuOpen(true)}>
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>

      {menuOpen && (
        <Animated.View
          style={[styles.overlay, { opacity: fade }]}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setMenuOpen(false)} />
        </Animated.View>
      )}

      <Animated.View style={[styles.sidebar, { left: slide }]}>
        <Text style={styles.title}>Меню</Text>

        <Text style={styles.item}>Новий чат</Text>
        <Text style={styles.item}>Контакти</Text>
        <Text style={styles.item}>Виклики</Text>
        <Text style={styles.item}>Налаштування</Text>
        <Text style={styles.item}>Збережені повідомлення</Text>

        <View style={styles.footer}>
          <Text>HW15.07</Text>
          <Text>15.07.2026</Text>
          <Text>v1.0.0</Text>
        </View>
      </Animated.View>

      <View style={styles.main}>
        <Text style={styles.mainText}>Экранчік</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 30,
  },
  menuIcon: {
    fontSize: 32,
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 15,
  },

  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 260,
    backgroundColor: "#fff",
    paddingTop: 80,
    paddingHorizontal: 20,
    elevation: 10,
    zIndex: 20,
    borderRightWidth: 3,
    borderRightColor: "#000",
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "600",
  },
  item: {
    fontSize: 18,
    marginVertical: 12,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 24,
  },
});