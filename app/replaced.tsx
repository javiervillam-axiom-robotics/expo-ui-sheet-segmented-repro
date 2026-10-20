import { Text, View } from 'react-native';

import { styles } from './index';

export default function Replaced() {
  return (
    <View style={styles.container}>
      <Text testID="replaced">A screen was pushed over the sheet's screen. Expected: no sheet. On iOS it is still presented, empty.</Text>
    </View>
  );
}
