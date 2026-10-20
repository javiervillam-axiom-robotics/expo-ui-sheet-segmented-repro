import { BottomSheet, Host, Text as UIText } from '@expo/ui';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import { styles } from './index';

/**
 * Screen 1. Open the sheet; 3 s later `router.push` opens another screen over this one, as a deep link or
 * a notification tap does: this screen stays mounted but its view leaves the window. Expected: the sheet
 * dismisses (or follows its screen) and `onDismiss` fires. Actual on iOS: the sheet stays presented over
 * the next screen, empty, until swiped away.
 */
export default function SheetScreen() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(0);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => router.push('/replaced'), 3000);
    return () => clearTimeout(t);
  }, [open, router]);
  return (
    <View style={styles.container}>
      <Button testID="open-sheet" title="Open sheet (router.push runs 3 s later)" onPress={() => setOpen(true)} />
      <Text>onDismiss calls: {dismissed}</Text>
      <Host>
        <BottomSheet
          isPresented={open}
          onDismiss={() => {
            setDismissed((n) => n + 1);
            setOpen(false);
          }}
        >
          <UIText>Sheet content</UIText>
        </BottomSheet>
      </Host>
    </View>
  );
}
