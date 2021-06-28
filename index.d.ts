import {
  HotkeyManagerComponentProps,
  useHotkeyManager,
  withHotkeyManager,
  default as Provider,
} from "./src/provider";
import Manager, { Hotkey } from "./src/manager";

declare module "@baked/react-hotkeys" {
  export {
    HotkeyManagerComponentProps,
    useHotkeyManager,
    withHotkeyManager,
    Manager,
    Hotkey,
    Provider,
  };
}
