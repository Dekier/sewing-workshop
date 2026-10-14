export default defineNuxtPlugin((nuxtApp) => {
  let timer: ReturnType<typeof setTimeout>;
  const refresh = () => {
    if (document.visibilityState === "visible")
      void refreshNuxtData("business-hours");
  };
  const tick = () => {
    refresh();
    timer = setTimeout(tick, 60000 - (Date.now() % 60000));
  };
  nuxtApp.hook("app:mounted", () => {
    refresh();
    timer = setTimeout(tick, 60000 - (Date.now() % 60000));
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
  });
  if (import.meta.hot)
    import.meta.hot.dispose(() => {
      clearTimeout(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    });
});
