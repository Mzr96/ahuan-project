import type { z } from "zod";

export default class LocalStorageService {
  static setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem<ItemType>(
    key: string,
    schema: z.Schema<ItemType>
  ): ItemType | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      const parsedItem = JSON.parse(item);
      return schema.parse(parsedItem);
    } catch (error) {
      console.error(`Invalid data for ${key}`, error);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
