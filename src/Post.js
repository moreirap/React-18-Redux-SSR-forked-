/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import GlobalCountButton from "./GlobalCountButton";

export default function Post() {
  return (
    <>
      <h1>Hello world</h1>
      <GlobalCountButton />
      <p>
        This demo is a quick and dirty adoptation from{" "}
        <a href="https://codesandbox.io/s/kind-sammet-j56ro">this Sandbox</a>{" "}
        (created by Dan Abramov) to try out Redux with React 18 streaming, note
        that it is artifically slowed down.
      </p>
      <p>
        All data is loaded on the server <i>before</i> rendering starts, and is
        all hydrated into the Redux store, <i>before</i> React hydration starts.
        This is how Redux SSR apps are built today, and is what is going to be
        supported officially in the initial React 18 release (the full vision is
        better seen in the original sandbox where parts stream in as data
        becomes available).
      </p>
      <p>
        Note that there are lazy loaded components that are rendered on the
        server, but are hydrated progressively by React. This is the big
        improvement in the initial React 18 release, you don't have to wait for
        ALL js to be available before parts of the site can become responsive.
      </p>
      <p>
        The two buttons share the same Redux-state, but the one in the top
        becomes responsive first. If you click that while the button in this
        Post is not responsive, you can see that the count here does not update
        since it is not hydrated yet. This is called tearing, and is expected to
        sometimes happen temporarily when components hydrate at different times
        (though this example makes it very obvious).
      </p>
      <p>
        There is currently a bug however. When tearing, this Post-components
        button tries to hydrate with a different state than it was rendered with
        on the server (because count has updated), leading to a hydration
        mismatch (open the console to see the warning). This is planned to be
        fixed in the next major release of Redux.
      </p>
    </>
  );
}
