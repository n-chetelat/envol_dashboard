# Kollage

An application for joining the circus.

<a href="https://gitmoji.dev">
  <img
    src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
    alt="Gitmoji"
  />
</a>

## Development

### How to run

```bash
npm run dev
```

### How to start the firebase emulators

```ts
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmmulator } from "firebase/storage";

const firebaseConfig = {
...
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
export const db = getFirestore(app);
connectFirestoreEmulator(db, "http://127.0.0.1:8080");
export const storage = getStorage(app);
connectStorageEmmulator(storage, "http://127.0.0.1:9199");
```

On console:

```bash
firebase emulators:start --only hosting
```
