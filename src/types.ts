export type AppId = 'home' | 'chat' | 'games' | 'video' | 'clock' | 'settings' | 'gallery' | 'browser' | 'mail' | 'music' | 'maps' | 'youtube' | 'camera' | 'store' | 'phone';

export interface AppConfig {
  id: AppId;
  name: string;
  icon: string;
  color: string;
}
