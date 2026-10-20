import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Menu() {
  return (
    <View style={styles.container}>
      <Link testID="open-sheet-screen" href="/sheet" style={styles.link}>1 · Sheet whose screen leaves the window</Link>
      <Link testID="open-segmented-screen" href="/segmented" style={styles.link}>2 · SegmentedControl on iOS</Link>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 16 },
  link: { color: '#007aff', fontSize: 17 },
});
