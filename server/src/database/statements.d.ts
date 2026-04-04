export function saveUserAndTracks(
  user: {
    id: string;
    display_name: string;
  },
  tracks: {
    id: string;
    name: string;
    artist: string;
  }[]
): void;

export function clearSessionData(): void;