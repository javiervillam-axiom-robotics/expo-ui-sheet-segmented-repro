import SegmentedControl from '@expo/ui/community/segmented-control';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { styles } from './index';

/**
 * Screen 2. The drop-in's iOS file drops `tintColor` (typed `@platform android, web`; the library it
 * replaces supports it on iOS 13+ as `selectedSegmentTintColor`) and passes `label=""` to SwiftUI's
 * Picker, so VoiceOver gets no name for the control and no prop can give it one.
 */
export default function SegmentedScreen() {
  const [index, setIndex] = useState(0);
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'stretch' }}>
        <SegmentedControl
          values={['Day', 'Week', 'Month']}
          selectedIndex={index}
          onChange={(e) => setIndex(e.nativeEvent.selectedSegmentIndex)}
          tintColor="#e11d48"
          // @ts-expect-error not in SegmentedControlProps; the iOS Picker gets label="" instead
          accessibilityLabel="Period"
          testID="period"
        />
      </View>
      <Text>Expected on iOS: the selected segment is red and VoiceOver reads «Period».</Text>
    </View>
  );
}
