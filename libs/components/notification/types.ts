export enum NotificationLevel {
  ERROR,
  SUCCESS
}

export interface Notify {
  (level: NotificationLevel, message: string): void;
}
