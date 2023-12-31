/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import Html from "./Html";
import Spinner from "./Spinner";
import Layout from "./Layout";
import NavBar from "./NavBar";

const Comments = lazy(() => import("./Comments" /* webpackPrefetch: true */));
const Sidebar = lazy(() => import("./Sidebar" /* webpackPrefetch: true */));
const Post = lazy(() => import("./Post" /* webpackPrefetch: true */));

export default function App({ assets, store, initialState }) {
  return (
    <Html assets={assets} title="Hello" initialState={initialState}>
      <Provider store={store}>
        <Suspense fallback={<Spinner />}>
          <ErrorBoundary FallbackComponent={Error}>
            <Content />
          </ErrorBoundary>
        </Suspense>
      </Provider>
    </Html>
  );
}

function Content() {
  return (
    <Layout>
      <NavBar />
      <aside className="sidebar">
        <Suspense fallback={<Spinner />}>
          <Sidebar />
        </Suspense>
      </aside>
      <article className="post">
        <Suspense fallback={<Spinner />}>
          <Post />
        </Suspense>
        <section className="comments">
          <h2>Comments</h2>
          <Suspense fallback={<Spinner />}>
            <Comments />
          </Suspense>
        </section>
        <h2>Thanks for reading!</h2>
      </article>
    </Layout>
  );
}

function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
    </div>
  );
}
