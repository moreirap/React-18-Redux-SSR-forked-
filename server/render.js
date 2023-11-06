/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react";
// import {renderToString} from 'react-dom/server';
import { renderToPipeableStream } from "react-dom/server";
import { createStore } from "redux";
import App from "../src/App";
import { ABORT_DELAY } from "./delays";
import topReducer, { fakeLoadData } from "../src/redux";

// In a real setup, you'd read it from webpack build stats.
let assets = {
  "main.js": "/main.js",
  "main.css": "/main.css"
};

module.exports = function render(url, res) {
  // This is how you would wire it up previously:
  //
  // res.send(
  //   '<!DOCTYPE html>' +
  //   renderToString(
  //     <DataProvider data={data}>
  //       <App assets={assets} />
  //     </DataProvider>,
  //   )
  // );

  // The new wiring is a bit more involved.
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;

  const store = createStore(topReducer);

  // Simulating loading all data before rendering the app
  store.dispatch(fakeLoadData("Wait, it doesn't wait for React to load?"));
  store.dispatch(fakeLoadData("How does this even work?"));
  store.dispatch(fakeLoadData("I like marshmallows"));

  const { pipe, abort } = renderToPipeableStream(
    <App assets={assets} store={store} initialState={store.getState()} />,
    {
      bootstrapScripts: [assets["main.js"]],
      onCompleteShell() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x);
      }
    }
  );
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(abort, ABORT_DELAY);
};
