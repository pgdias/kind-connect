export const KWAI_PIXEL_ID = "325901606065311";

type KwaiPixelInstance = {
  track?: (eventName: string) => void;
};

type KwaiPixelQueue = {
  page?: () => void;
  instance?: (pixelId: string) => KwaiPixelInstance;
};

declare global {
  interface Window {
    kwaiq?: KwaiPixelQueue;
  }
}

/**
 * Sends a standard Kwai Pixel event through the Developer Mode instance.
 * The base snippet queues calls before the remote SDK finishes loading.
 */
export function trackKwaiEvent(eventName: string) {
  if (typeof window === "undefined") return;
  window.kwaiq?.instance?.(KWAI_PIXEL_ID)?.track?.(eventName);
}

/** Records a page view using the Kwai base-code page event. */
export function trackKwaiPageView() {
  if (typeof window === "undefined") return;
  window.kwaiq?.page?.();
}
