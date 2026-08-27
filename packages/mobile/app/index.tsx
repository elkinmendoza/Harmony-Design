import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, heading, text, space, radius, fontFamily } from "@/lib/tokens";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Harmony</Text>
      <Text style={styles.body}>
        A centralised, Figma-driven design system. Big editorial titles,
        organised layouts, and effortless readability.
      </Text>
      <View style={styles.buttons}>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Get started</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Documentation</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space.lg,
    backgroundColor: colors.light.background.primary,
  },
  heading: {
    fontFamily: fontFamily.display,
    fontWeight: "700",
    color: colors.light.content.primary,
    textAlign: "center",
    ...heading["display-2xl"],
  },
  body: {
    fontFamily: fontFamily.body,
    color: colors.light.content.secondary,
    textAlign: "center",
    marginTop: space.lg,
    maxWidth: 480,
    ...text.xl,
  },
  buttons: {
    flexDirection: "row",
    gap: space.md,
    marginTop: space.xl,
  },
  primaryButton: {
    backgroundColor: colors.light.background.brand,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radius.md,
  },
  primaryButtonText: {
    fontFamily: fontFamily.sans,
    fontWeight: "600",
    color: colors.light.content.onBrand,
    ...text.sm,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.light.border.default,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radius.md,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.sans,
    fontWeight: "600",
    color: colors.light.content.primary,
    ...text.sm,
  },
});
