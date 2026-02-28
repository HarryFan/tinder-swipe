# Tinder Swipe App (照片清理助手)

一個基於 React Native 和 Expo 開發的應用程式，藉由類似 Tinder 的滑動介面，讓你能流暢且高效率地清理手機相簿中的媒體。

## 功能特色

- **深入相簿存取**：無縫整合作業系統權限，幫助您讀取與管理裝置內最新的相片與影片。
- **滑動手勢操作**：向左滑（刪除）或向右滑（保留），配備流暢的動畫與靈敏的觸控回饋。
- **影片支援**：透過 `expo-video` 打造原生影片播放體驗，並針對最上層的活躍卡片提供靜音自動播放功能。
- **安全的批次刪除**：刪除動作會先加入待處理的佇列，最後再透過作業系統原生的確認提示進行實體刪除，避免誤刪。同時支援強大的「復原 (Undo)」操作！
- **流暢動畫特效**：使用 `react-native-reanimated` 實現絲滑的卡片移動與旋轉物理效果。
- **現代化介面**：使用 NativeWind 進行樣式設計（適用於 React Native 的 Tailwind CSS）。
- **跨平台支援**：完美運行於 iOS 與 Android 裝置。

## 技術堆疊

- **React Native** (結合 Expo Router 進行導航)
- **TypeScript** (確保嚴謹的型別安全)
- **NativeWind** (基於 Tailwind CSS 的樣式定義)
- **React Native Gesture Handler** (觸控手勢處理)
- **React Native Reanimated** (60FPS 流暢動畫引擎)
- **Expo Video** (高效能原生影片自動播放)
- **Expo Media Library** (裝置相簿存取與刪除 API)

## 開始使用

### 環境要求

- Node.js (v18 或更新版本)
- Expo CLI (`npm install -g @expo/cli`)
- iOS 模擬器 (適用於 iOS 開發) 或 Android Studio (適用於 Android 開發)

### 安裝步驟

1. 複製此儲存庫：

```bash
git clone <repository-url>
cd tinder-swipe
```

2. 安裝依賴套件：

```bash
npm install
# 或使用
bun install
```

3. 啟動開發伺服器：

```bash
npm start
# 或使用
bun start
```

4. 在您偏好的平台上運行：

```bash
# iOS
npm run ios
# 或使用
bun run ios

# Android
npm run android
# 或使用
bun run android

# Web (受限於照片存取能力)
npm run web
# 或使用
bun run web
```

## 專案結構

```
├── app/                    # Expo Router 頁面
│   ├── _layout.tsx         # 包含手勢處理邏輯的根佈局
│   ├── index.tsx           # 主畫面
│   └── +html.tsx           # 網頁版 HTML 靜態模板
├── components/             # 可重複使用的 UI 元件
│   ├── tinder-card.tsx     # 單張包含手勢的滑動卡片
│   ├── tinder-swipe.tsx    # 卡片堆疊與 Swipe 邏輯管理
│   ├── container.tsx       # Safe Area 容器
│   └── button.tsx          # 自訂按鈕元件
├── hooks/                  # 自訂 React Hooks
│   └── use-swipe-with-undo.ts # 管理媒體狀態、相簿存取、復原機制與批次刪除
├── openspec/               # 產品規格與變更檔案 (OpenSpec)
├── assets/                 # 圖片與圖示資源
└── global.css              # 全域樣式設定 (包含 Tailwind 組態)
```

## 運作原理

1. **卡片堆疊**：應用程式載入您的最新媒體，並以重疊卡片的方式顯示。
2. **手勢偵測**：透過 `GestureDetector` 偵測每張卡片上的平移 (Pan) 滑動手勢。
3. **動態渲染**：卡片在滑動時會根據滑動距離與角度同步位移，並產生自然的旋轉效果。
4. **判斷邏輯**：當卡片滑退超過特定的距離門檻時，放手後將觸發保留（往右）或刪除（往左）判定。
5. **卡片狀態拋轉**：卡片滑出螢幕後，會記錄進陣列歷史中支援隨時撤銷操作。

## 核心元件

### TinderCard

- 負責處理單一卡片內部的手勢捕捉與動畫回饋。
- 內建滑動觸發門檻、多階段視差文字不透明度與彈簧 (Spring) 動畫回彈。
- 根據滑動範圍即時判斷卡片屬性變化。

### TinderSwipe

- 以原生方式管理卡片堆疊的總體狀態，追蹤使用者的操作步驟。
- 集中呼叫自定義 Hook，安全地透過作業系統原生 UI 介面處理批次清除。
- 藉由陣列索引控管以達到不斷無縫輪播。

## 開發指南

### 可用指令

- `npm start` - 啟動 Expo 開發伺服器
- `npm run ios` - 在 iOS 模擬器上運行
- `npm run android` - 在 Android 模擬器上運行
- `npm run web` - 在網頁瀏覽器上運行 (不支援原生相簿 API)
- `npm run lint` - 執行 ESLint 與 Prettier 自動檢查
- `npm run format` - 透過 ESLint 與 Prettier 排版格式化程式碼

### 程式碼品質管理

此專案使用：

- **ESLint** 針對程式碼風格進行靜態分析。
- **Prettier** 確保撰寫格式的一致性。
- **TypeScript** 提供可靠的開發除錯協助。

## 提供貢獻

這也是一個實驗與教育性質的開源專案。歡迎 Fork 擴充並嘗試以下方向：

- 新增更多的照片 Metadata 資訊卡展示（例如：檔案大小、解析度座標紀錄）。
- 實作更多種趣味的動畫過場特效。
- 為 Keep 或 Delete 加入視覺外的震動觸覺或音效反饋。
- 改善 UI 將控制欄加入更多標籤分類情境。
