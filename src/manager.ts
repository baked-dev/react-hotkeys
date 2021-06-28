export interface Hotkey {
  key: string;
  shift?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  callback: () => any;
}

class HotkeyManager {
  private registeredHotkeys: Hotkey[] = [];

  public registerHotkey = (hotkey: Hotkey) => {
    // unshift because we want to trigger hotkeys that are registered later first
    this.registeredHotkeys.unshift(hotkey);
    return () => {
      this.registeredHotkeys.splice(
        this.registeredHotkeys.findIndex((item) => item === hotkey),
        1
      );
    };
  };

  public registerHotkeys = (hotkeys: Hotkey[]) => {
    this.registeredHotkeys.unshift(...hotkeys);
    return () => {
      this.registeredHotkeys = this.registeredHotkeys.filter((item) => {
        return !hotkeys.some((hotkey) => hotkey === item);
      });
    };
  };

  public processEvent = ({ key, altKey, shiftKey, ctrlKey }: KeyboardEvent) => {
    for (const entry of this.registeredHotkeys) {
      if (
        key.toUpperCase() === entry.key &&
        ctrlKey === !!entry.ctrl &&
        shiftKey === !!entry.shift &&
        altKey === !!entry.alt
      ) {
        entry.callback();
        return;
      }
    }
  };
}

export default HotkeyManager;
