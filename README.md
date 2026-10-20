# @expo/ui iOS repro: BottomSheet outlives its screen; SegmentedControl drops tintColor and its label

`create-expo-app --template blank-typescript@sdk-58`, plus `expo-router` and `@expo/ui` (58.0.21) via
`npx expo install`. The screens are in `app/`; it runs in Expo Go.

```sh
npm install
npx expo start --ios
```

## 1 · A presented `BottomSheet` stays up when a screen is pushed over its owner (`app/sheet.tsx`)

1. Tap «1 · Sheet whose screen leaves the window», then «Open sheet».
2. Wait 3 s: the screen calls `router.push`, as a deep link or a notification tap does. The owner stays
   mounted; its view leaves the window.

**Expected:** the sheet dismisses (or follows its screen) and `onDismiss` fires.
**Actual (iOS):** the sheet stays presented over the pushed screen; only a swipe removes it, and
`onDismiss` never fires. (`router.replace`, which unmounts the owner, dismisses it correctly.)

## 2 · `@expo/ui/community/segmented-control` on iOS (`app/segmented.tsx`)

1. Tap «2 · SegmentedControl on iOS».

**Expected:** the selected segment uses `tintColor` (the library this replaces supports it on iOS 13+
as `selectedSegmentTintColor`), and VoiceOver reads the control's name.
**Actual (iOS):** no tint (`tintColor` is typed `@platform android, web`), and `SegmentedControl.ios.tsx`
passes `label=""` to SwiftUI's `Picker`, so VoiceOver announces no name and no prop can give it one.
