const DB_NAME = "zen_minimalist_db";
const STORE_NAME = "wallpapers";
const KEY = "custom_bg";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomBackground(file) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(file, KEY);
      tx.oncomplete = () => resolve(URL.createObjectURL(file));
      tx.onerror = () => reject(tx.error);
    });
}

export async function loadCustomBackground() {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(KEY);
      req.onsuccess = () => {
        resolve(req.result ? URL.createObjectURL(req.result) : null)
      }
      req.onerror = () => resolve(null);
    })
}

export async function clearCustomBackground() {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(KEY);
    tx.oncomplete = () => resolve();
  })
}