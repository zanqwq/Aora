# expo
- expo-router(file base routering):
  - Slot
  - Stack: 用栈的形式堆叠 screen
  - Tabs: add nav bar to screen, customize using Tabs.Screen
  - `(foldername)` represent route group
     allow you to add additional pages/screens with special layout
  - `[query].jsx`: dynamic query
  - SplatScreen
- react-native-safe-area-context(处理安全区问题, 例如屏幕的刘海)
- react-native-screens
- expo-linking
- expo-constants: access to os env
- expo-status-bar: 设置手机最上方的通知栏, 例如时间, 电池, wifi, 如果 app 是暗黑主题, 就要把 status bar style 设置为 light
- package.json 修改 main
- app.json 添加 scheme: deep link expo with rn, 允许在 app 外通过 url 打开 app 特定 screen
- nativewind, tailwindcss, vscode tailwindcss intelli
- expo-font, useFonts
- 