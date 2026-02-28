import React, { useState, useRef, useCallback, useEffect } from 'react';
import * as MediaLibrary from 'from 'expo-media-library';
import { Alert } from 'react-native';

export interface MediaCard {
  id: string;
  uri: string;
  type: 'photo' | 'video';
  creationTime: number;
  filename: string;
  width: number;
  height: number;
}

type SwipeAction = {
  id: string;
  direction: 'left' | 'right';
};

export const useSwipeWithUndo = () => {
  const [cards, setCards] = useState<MediaCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([]);
  const [keptIds, setKeptIds] = useState<string[]>([]);
  const [history, setHistory] = useState<SwipeAction[]>([]);
  const swiperRef = useRef<any>(null);

  const fetchMedia = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("需要權限", "請允許 App 存取相簿以進行清理");
        return;
      }

      const { assets } = await MediaLibrary.getAssetsAsync({
        first: 50,
        sortBy: [MediaLibrary.SortBy.creationTime],
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
      });

      const formattedCards: MediaCard[] = assets.map((asset) => ({
        id: asset.id,
        uri: asset.uri,
        type: asset.mediaType === 'video' ? 'video' : 'photo',
        creationTime: asset.creationTime,
        filename: asset.filename,
        width: asset.width,
        height: asset.height,
      }));

      setCards(formattedCards);
    } catch (error) {
      console.error("抓取相簿失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSwipedLeft = (index: number) => {
    const card = cards[index];
    if (card) {
      setPendingDeleteIds((prev) => [...prev, card.id]);
      setHistory((prev) => [...prev, { id: card.id, direction: 'left' }].slice(-20)); // Limit history to 20
    }
  };

  const handleSwipedRight = (index: number) => {
    const card = cards[index];
    if (card) {
      setKeptIds((prev) => [...prev, card.id]);
      setHistory((prev) => [...prev, { id: card.id, direction: 'right' }].slice(-20));
    }
  };

  const undoLastAction = useCallback(() => {
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    if (lastAction.direction === 'left') {
      setPendingDeleteIds((prev) => prev.filter((id) => id !== lastAction.id));
    } else {
      setKeptIds((prev) => prev.filter((id) => id !== lastAction.id));
    }

    setHistory(newHistory);

    if (swiperRef.current?.swipeBack) {
      swiperRef.current.swipeBack();
    }
  }, [history, swiperRef]);

  const executeBatchDelete = async () => {
    if (pendingDeleteIds.length === 0) {
      Alert.alert("提示", "目前沒有選取任何要刪除的照片");
      return;
    }

    Alert.alert(
      "確認刪除",
      `您確定要從手機相簿中永久刪除這 ${pendingDeleteIds.length} 個檔案嗎？`,
      [
        { text: "取消", style: "cancel" },
        {
          text: "確定刪除",
          style: "destructive",
          onPress: async () => {
            try {
              const success = await MediaLibrary.deleteAssetsAsync(pendingDeleteIds);
              if (success) {
                Alert.alert("清理成功", `已刪除 ${pendingDeleteIds.length} 個檔案`);
                setPendingDeleteIds([]);
                setHistory([]);
              }
            } catch (error) {
              Alert.alert("錯誤", "刪除過程中發生問題，請檢查系統權限");
            }
          }
        }
      ]
    );
  };

  return {
    cards,
    loading,
    swiperRef,
    handleSwipedLeft,
    handleSwipedRight,
    undoLastAction,
    executeBatchDelete,
    canUndo: history.length > 0,
    pendingCount: pendingDeleteIds.length,
  };
};
