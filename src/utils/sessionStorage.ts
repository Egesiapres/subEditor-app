import { Subtitle } from "../subtitlesEditor/ModalUpload";

export interface Item {
  name: string;
  url: string;
  // subtitles?: Subtitle[];
  subtitles?: Array<Subtitle>;
}

export const setSessionStorageItem = (itemName: string, item: Item): void => {
  sessionStorage.setItem(itemName, JSON.stringify(item));
};

export const getSessionStorageItem = (itemName: string): Item | null => {
  const item = sessionStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const clearSessionStorageItem = (itemName: string): void => {
  sessionStorage.removeItem(itemName);
};

export const clearSessionStorageItems = (): void => {
  sessionStorage.clear();
};
