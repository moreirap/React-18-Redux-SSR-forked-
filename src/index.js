/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { hydrateRoot } from "react-dom";
import { createStore } from "redux";
import topReducer from "./redux";
import App from "./App";

const store = createStore(topReducer, window.initialState);

hydrateRoot(
  document,
  <App
    assets={window.assetManifest}
    store={store}
    initialState={window.initialState}
  />
);
