export enum NotificationLevel {
  ERROR,
}

export interface Notify {
  (level: NotificationLevel, message: string): void;
}
