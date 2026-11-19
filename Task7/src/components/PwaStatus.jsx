import { useEffect, useState, useSyncExternalStore } from "react";

function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function useOnline() {
  return useSyncExternalStore(subscribe, () => navigator.onLine);
}

export function CachedData({ cached }) {
  const online = useOnline();

  if (online && !cached) return null;

  return (
    <output className="pwa-note">
      Showing cached product data.
    </output>
  );
}

export function OfflineData({ onRetry, retrying }) {
  return (
    <section className="section">
      <div className="content-card">
        <h1>Product data unavailable</h1>
        <p>This data isn’t saved on this device. Reconnect and try again.</p>
        <button
          type="button"
          className="button"
          disabled={retrying}
          onClick={onRetry}
        >
          {retrying ? "Retrying…" : "Retry Connection"}
        </button>
      </div>
    </section>
  );
}

export default function PwaStatus() {
  const online = useOnline();
  const [waiting, setWaiting] = useState(null);

  useEffect(() => {
    if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;

    const serviceWorker = navigator.serviceWorker;
    let registration;
    let installing;
    let disposed = false;
    let controlled = Boolean(serviceWorker.controller);

    function controllerChanged() {
      if (controlled) window.location.reload();
      controlled = Boolean(serviceWorker.controller);
    }

    function showUpdate() {
      setWaiting(registration.active ? registration.waiting : null);
    }

    function watchInstall() {
      installing?.removeEventListener("statechange", showUpdate);
      installing = registration.installing;
      installing?.addEventListener("statechange", showUpdate);
      showUpdate();
    }

    function checkForUpdate() {
      if (document.visibilityState === "visible") {
        void registration?.update().catch(() => {});
      }
    }

    serviceWorker.addEventListener("controllerchange", controllerChanged);
    document.addEventListener("visibilitychange", checkForUpdate);

    void serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: "none" })
      .then((result) => {
        if (disposed) return;

        registration = result;
        registration.addEventListener("updatefound", watchInstall);
        watchInstall();
        checkForUpdate();
      })
      .catch((error) => console.error("Service worker registration failed", error));

    return () => {
      disposed = true;
      serviceWorker.removeEventListener("controllerchange", controllerChanged);
      document.removeEventListener("visibilitychange", checkForUpdate);
      registration?.removeEventListener("updatefound", watchInstall);
      installing?.removeEventListener("statechange", showUpdate);
    };
  }, []);

  return (
    <aside className="container pwa-status" aria-label="Application status">
      <output>{online ? "Online" : "Offline"}</output>

      {!online && (
        <a href={`${import.meta.env.BASE_URL}offline/`}>Offline help</a>
      )}

      {waiting && (
        <button
          className="button button-secondary"
          type="button"
          onClick={() => waiting.postMessage("ACTIVATE_UPDATE")}
        >
          Update Available — Reload
        </button>
      )}
    </aside>
  );
}