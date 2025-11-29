// Skip React Router hydration - this is a static site that doesn't need client-side routing
// Only initialize echo-js for lazy loading images

import("echo-js").then((echoModule) => {
  const echoFactory = echoModule.default;
  const echo = echoFactory(window);
  echo.init();

  // Debounced scroll handler for lazy load
  let poll: ReturnType<typeof setTimeout> | null = null;
  const container = document.querySelector(".row:last-child");
  if (container) {
    container.addEventListener("scroll", () => {
      if (poll) return;
      poll = setTimeout(() => {
        echo.render();
        poll = null;
      }, 100);
    });
  }
});
