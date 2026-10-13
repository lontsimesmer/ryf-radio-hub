// Lightweight pub/sub store for the persistent live player UI state.
// The <audio> element lives in __root.tsx so playback continues across
// route navigations; this store lets any route component open/close the
// player modal or the schedule (grille) modal without per-route props.
type Listener = () => void;
const listeners = new Set<Listener>();

let playerOpen = false;
let scheduleOpen = false;

function emit() {
  listeners.forEach((l) => l());
}

export const playerStore = {
  getPlayerOpen: () => playerOpen,
  getScheduleOpen: () => scheduleOpen,
  openPlayer: () => {
    playerOpen = true;
    emit();
  },
  closePlayer: () => {
    playerOpen = false;
    emit();
  },
  openSchedule: () => {
    scheduleOpen = true;
    emit();
  },
  closeSchedule: () => {
    scheduleOpen = false;
    emit();
  },
  subscribe: (fn: Listener) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
