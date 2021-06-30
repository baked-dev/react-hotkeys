# @baked/react-hotkeys

## Usage

Wrap your app in a HotkeyProvider

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider, Manager } from "@baked/react-hotkeys";
import App from "./App";

const manager = new Manager();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider manager={manager}>
    <App />
  </Provider>,
  rootElement
);
```

### with hooks

```js
import React, { useEffect } from "react";
import { useHotkeyManager } from "@baked/react-hotkeys";

const Example = () => {
  const manager = useHotkeyManager();
  // the registerHotkey(s) methods return an uregister method
  // that can be called by useEffect to unregister the hotkey
  // when the component unmouts.
  useEffect(
    manager.registerHotkey({
      key: "a",
      ctrl: true,
      shift: true,
      callback: () => alert("Hotkey triggered."),
    }),
    []
  );
  return <></>;
};

export default Example;
```

### with class components

```js
import React, { Component } from "react";
import { withHotkeyManager } from "@baked/react-hotkeys";

class Example extends Component {
  componentDidMount = () => {
    this.unregister = this.props.manager.registerHotkey({
      key: "a",
      ctrl: true,
      shift: true,
      callback: () => alert("Hotkey triggered."),
    });
  };
  componentWillUnmount = () => {
    this.unregister();
  };

  render = () => <></>;
}

export default withHotkeyManager(Example);
```

##### with typescript:

```ts
import React, { Component } from "react";
import {
  withHotkeyManager,
  HotkeyManagerComponentProps,
} from "@baked/react-hotkeys";

type ExampleInitialProps = {};

type ExampleProps = HotkeyManagerComponentProps & ExampleInitialProps;

class Example extends Component<ExampleProps> {
  componentDidMount = () => {
    this.unregister = this.props.manager.registerHotkey({
      key: "a",
      ctrl: true,
      shift: true,
      callback: () => alert("Hotkey triggered."),
    });
  };
  componentWillUnmount = () => {
    this.unregister();
  };

  render = () => <></>;
}

export default withHotkeyManager(Example);
```
