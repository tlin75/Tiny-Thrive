export {};

declare global {
  interface Window {
    electronAPI?: {
      closeApp: () => void;
      minimise: () => void;
    };
  }
}