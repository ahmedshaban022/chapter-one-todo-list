# 📝 Todo List App

A modern, feature-rich Todo List application built with React Native, TypeScript, and Expo. This app implements SOLID principles and uses persistent storage to maintain your tasks even after closing the app.

![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Expo](https://img.shields.io/badge/Expo-~54.0-black)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- ✅ **Create, Read, Update, Delete (CRUD)** todos
- 🎨 **Beautiful, Modern UI/UX** with smooth animations
- 🌙 **Dark & Light Mode** - Toggle between themes with persistent preference
- 📱 **Cross-platform** - Works on iOS and Android
- 💾 **Persistent Storage** - AsyncStorage keeps your todos saved
- 🎯 **Priority Levels** - High, Medium, Low priorities with color coding
- 🔄 **Status Filtering** - View All, Active, or Completed tasks
- ✏️ **Edit Functionality** - Update existing todos
- 🗑️ **Batch Delete** - Clear all todos at once
- 🔍 **Smart Sorting** - Automatically sorts by priority and creation date
- 📊 **Task Counter** - See active task count at a glance
- 🔄 **Pull to Refresh** - Refresh your todo list
- ⚡ **Fast & Responsive** - Optimized performance

## 🏗️ Architecture

This project follows **SOLID principles** for clean, maintainable code:

- **S**ingle Responsibility Principle - Each class has one job
- **O**pen/Closed Principle - Open for extension, closed for modification
- **L**iskov Substitution Principle - Interfaces are properly implemented
- **I**nterface Segregation Principle - Small, focused interfaces
- **D**ependency Inversion Principle - Depends on abstractions, not concrete implementations

### 📂 Project Structure

```
chapter-one-todo-list/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AddTodoModal.tsx
│   │   ├── Button.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FilterTabs.tsx
│   │   ├── Input.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TodoItem.tsx
│   │   └── index.ts
│   ├── contexts/            # React contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useTodos.ts
│   ├── services/            # Business logic & storage
│   │   ├── interfaces/
│   │   │   ├── IStorageService.ts
│   │   │   └── ITodoRepository.ts
│   │   ├── AsyncStorageService.ts
│   │   └── TodoRepository.ts
│   ├── theme/               # Design tokens
│   │   ├── colors.ts
│   │   ├── darkColors.ts
│   │   ├── lightColors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   └── types/               # TypeScript types
│       ├── Todo.ts
│       └── Theme.ts
├── App.tsx                  # Main application component
├── index.ts                 # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

For running on devices:
- **iOS**: [Xcode](https://developer.apple.com/xcode/) (Mac only)
- **Android**: [Android Studio](https://developer.android.com/studio)

Or install:
- [Expo Go](https://expo.dev/client) app on your mobile device

### 📥 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chapter-one-todo-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   # or
   npx expo start
   ```

## 📱 Running the App

After starting the development server, you have several options:

### Option 1: Expo Go (Easiest)

1. Install **Expo Go** on your iOS or Android device
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code from your terminal using:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Option 2: iOS Simulator (Mac only)

```bash
npm run ios
# or
yarn ios
```

**Requirements:**
- macOS
- Xcode installed
- iOS Simulator configured

### Option 3: Android Emulator

```bash
npm run android
# or
yarn android
```

**Requirements:**
- Android Studio installed
- Android SDK configured
- Android Emulator running

### Option 4: Web Browser (Development)

```bash
npm run web
# or
yarn web
```

**Note:** Some features may not work perfectly in web mode as this is primarily a mobile app.

## 🏗️ Building for Production

### Build for iOS

```bash
# Install EAS CLI if not already installed
npm install -g eas-cli

# Login to Expo
eas login

# Configure and build for iOS
eas build --platform ios
```

### Build for Android

```bash
# Configure and build for Android
eas build --platform android
```

### Generate APK for Android (Development)

```bash
# Build APK
eas build -p android --profile preview
```

For more details, check out [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/).

## 🎯 Usage Guide

### Creating a Todo

1. Tap the **"+"** floating action button
2. Enter a **title** (required)
3. Add a **description** (optional)
4. Select a **priority** (Low, Medium, or High)
5. Tap **"Add Todo"**

### Editing a Todo

1. Tap the **edit icon (✏️)** on any todo
2. Modify the details
3. Tap **"Update"**

### Completing a Todo

- Tap the **checkbox** next to any todo to mark it complete/incomplete

### Deleting a Todo

1. Tap the **delete icon (🗑️)** on any todo
2. Confirm the deletion

### Filtering Todos

- Use the filter tabs at the top:
  - **All**: Shows all todos
  - **Active**: Shows incomplete todos
  - **Completed**: Shows completed todos

### Clearing All Todos

1. Tap **"Clear All"** in the header (visible when todos exist)
2. Confirm the action

### Switching Themes

1. Tap the **theme toggle button** (🌙/☀️) in the header
2. The app will instantly switch between light and dark modes
3. Your theme preference is automatically saved

## 🛠️ Technologies Used

- **[React Native](https://reactnative.dev/)** - Mobile framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Expo](https://expo.dev/)** - Development platform
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Persistent storage
- **[React Hooks](https://reactjs.org/docs/hooks-intro.html)** - State management
- **[React Context](https://reactjs.org/docs/context.html)** - Theme management

## 📝 Key Features Explained

### Persistent Storage

All todos are automatically saved to device storage using AsyncStorage. Your tasks will be there even if you:
- Close the app
- Restart your device
- Update the app

### Priority System

Todos are color-coded by priority:
- 🔴 **High**: Red - Urgent tasks
- 🟡 **Medium**: Amber - Important tasks
- 🟢 **Low**: Green - Nice-to-have tasks

### Smart Sorting

Todos are automatically sorted by:
1. **Priority** (High → Medium → Low)
2. **Creation Date** (Newest first within same priority)

### Dark & Light Mode

The app supports both dark and light themes:
- **Theme Toggle**: Tap the 🌙/☀️ button in the header
- **Persistent Preference**: Your theme choice is saved automatically
- **System Integration**: Status bar adapts to the current theme
- **Smooth Transitions**: Instant theme switching with no flicker

## 🧪 Development Scripts

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --clear

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# Type checking
npx tsc --noEmit

# Format code (if prettier is configured)
npm run format
```

## 🐛 Troubleshooting

### Common Issues

**Issue: Metro bundler cache errors**
```bash
npm start -- --clear
# or
expo start -c
```

**Issue: Android build fails**
- Ensure Android SDK is properly installed
- Check ANDROID_HOME environment variable
- Run `adb devices` to verify device connection

**Issue: iOS build fails**
- Ensure Xcode is installed
- Run `pod install` in the ios folder if it exists
- Check iOS Simulator is properly configured

**Issue: Module not found errors**
```bash
rm -rf node_modules
npm install
# or
yarn install
```

**Issue: AsyncStorage not working**
- Clear app data/cache on your device
- Uninstall and reinstall the app

## 📚 Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author : Ahmed Shaban

Built with ❤️ using React Native and TypeScript

## 🙏 Acknowledgments

- React Native team for the amazing framework
- Expo team for simplifying React Native development
- The open-source community

---

**Happy Task Managing! 📝✨**

If you found this project helpful, please consider giving it a ⭐️

