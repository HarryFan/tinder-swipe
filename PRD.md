# 📱 產品名稱：SwipeClean (暫定)

**目標：** 透過直覺的左滑（刪除）與右滑（保留）手勢，快速清理手機相簿中的冗餘照片與影片。

## 1. 核心流程 (User Flow)
- **授權：** 使用者開啟 App，點擊「開始清理」，系統請求相簿讀取與刪除權限。
- **加載：** App 掃描最新（或指定月份）的圖片與影片，存入待處理隊列。
- **決策 (Swipe)：**
  - **右滑 (Save)：** 該媒體移出隊列，保留在手機中。
  - **左滑 (Bin)：** 該媒體路徑暫存在「回收站清單」中。
- **結算：** 當一組圖片處理完畢，彈出總結視窗（例如：已標記 20 張刪除），使用者確認後執行真正的系統刪除。

## 2. 功能需求 (Functional Requirements)

### A. 媒體讀取與顯示 (Media Integration)
- **權限要求：** 必須整合 `expo-media-library` 來獲取相簿權限。
- **多媒體支援：**
  - **圖片：** 直接顯示。
  - **影片：** 卡片置中時自動靜音播放（需整合 `expo-av`）。
- **資訊顯示：** 卡片下方顯示該檔案的大小 (MB) 與日期。

### B. 滑動交互邏輯 (Swiping Logic)
- **左滑 (Delete)：** 觸發紅色 Overlay 顯示 "Delete" 或 🗑️ 圖標。
- **右滑 (Keep)：** 觸發綠色 Overlay 顯示 "Keep" 或 ❤️ 圖標。
- **上滑 (Favorite)：** (進階功能) 將圖片加入手機的「我的最愛」。
- **復原 (Undo)：** 提供一個按鈕，可以按回上一張誤滑的圖片。

### C. 批次處理與刪除 (Batch Processing)
- **暫存機制：** App 不應在左滑時立即刪除檔案，避免誤操作。
- **終端刪除：** 點擊「清理完畢」後，調用 `MediaLibrary.deleteAssetsAsync()` 執行物理刪除。

## 3. 使用 Anti Gravity 調整樣式的重點
既然你要配合 Anti Gravity，以下是你在調整樣式時的優先順序：

| 組件名稱 | 調整方向 | Tailwind 類名參考 |
|---|---|---|
| **Card Container** | 增加陰影與圓角，讓卡片更像實體照片。 | `rounded-3xl shadow-xl border-2 border-white` |
| **Overlay Labels** | 調整 "Keep" 與 "Delete" 的標籤顏色與字體。 | `text-red-500 font-bold uppercase text-4xl` |
| **Action Buttons** | 底部放置三個圓形按鈕：復原、刪除、保留。 | `w-16 h-16 bg-white rounded-full items-center` |
| **Progress Bar** | 頂部顯示目前已處理的進度條。 | `h-2 bg-gray-200 rounded-full w-full` |

## 4. 關鍵技術堆疊 (Tech Stack)
- **Framework:** Expo (React Native)
- **Styling:** NativeWind (Tailwind CSS) - 這對 Anti Gravity 非常友好
- **Media API:** `expo-media-library` (讀取/刪除相簿)
- **Animation:** `react-native-reanimated` (用於平滑的手勢追蹤)

## 5. 實作檢查清單 (Action Plan)
- [ ] **環境初始化：** Clone 專案後，安裝 `expo-media-library` 和 `expo-av`。
- [ ] **資料源替換：** 將原本 `pakenfit/tinder-swipe` 裡的靜態 JSON 資料替換為從 `MediaLibrary.getAssetsAsync` 抓取的真實路徑。
- [ ] **UI 微調：** 使用 Anti Gravity 調整卡片的寬度，確保影片能適配螢幕。
- [ ] **刪除邏輯測試：** 在 Android/iOS 模擬器上測試刪除權限彈窗。
