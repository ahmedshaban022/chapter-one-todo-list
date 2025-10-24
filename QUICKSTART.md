# Quick Start Guide

Get up and running with the Todo List app in 5 minutes!

## 📋 Prerequisites

Make sure you have these installed:
- **Node.js** (v16+): [Download](https://nodejs.org/)
- **Git**: [Download](https://git-scm.com/)

## 🚀 Installation (3 steps)

### 1. Clone & Navigate
```bash
git clone <your-repo-url>
cd chapter-one-todo-list
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the App
```bash
npm start
```

That's it! 🎉

## 📱 Run on Your Device

### Easiest Way: Expo Go App

1. **Install Expo Go** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan the QR code** that appears in your terminal
   - iOS: Use Camera app
   - Android: Use Expo Go app

Done! The app will open on your device.

## 💻 Run on Emulator/Simulator

### iOS Simulator (Mac only)
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

**Note**: Make sure you have Xcode (for iOS) or Android Studio (for Android) installed.

## 🎯 First Steps

Once the app is running:

1. **Tap the + button** to create your first todo
2. **Enter a title** (required)
3. **Choose a priority**: Low, Medium, or High
4. **Tap "Add Todo"**

Try these features:
- ✅ Tap the checkbox to mark a todo complete
- ✏️ Tap the edit icon to update a todo
- 🗑️ Tap the trash icon to delete a todo
- 🔍 Use the filter tabs to view All, Active, or Completed todos
- 🔄 Pull down to refresh the list

## 🆘 Troubleshooting

### App won't start?
```bash
npm start -- --clear
```

### Connection issues?
Make sure your computer and phone are on the **same WiFi network**.

### Still having issues?
Check out the full [README.md](README.md) or open an issue on GitHub.

## 📚 Next Steps

- Read the [Architecture Documentation](ARCHITECTURE.md)
- Check out [Contributing Guidelines](CONTRIBUTING.md)
- Explore the code structure

## ✨ Key Features to Try

1. **Persistent Storage**: Close the app and reopen it - your todos are saved!
2. **Priority Colors**: High priority todos show a red indicator
3. **Smart Sorting**: Todos are automatically sorted by priority
4. **Pull to Refresh**: Pull down the list to refresh
5. **Empty States**: See helpful messages when lists are empty

## 🎨 Customization

Want to customize the app? Check out:
- **Colors**: `src/theme/colors.ts`
- **Spacing**: `src/theme/spacing.ts`
- **Typography**: `src/theme/typography.ts`

Happy task managing! 📝✨

