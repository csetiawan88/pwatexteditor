import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Initialize the database and store the promise in dbPromise
const dbPromise = initdb();

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error("putDb not implemented");

  // Get the initialized database instance
  const db = await dbPromise;

  // Start a read-write transaction
  const tx = db.transaction("jate", "readwrite");

  // Access the "jate" object store
  const store = tx.objectStore("jate");

  // Add the provided content to the object store
  await store.add(content);
  await tx.done;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error("getDb not implemented");

  // Get the initialized database instance
  const db = await dbPromise;

  // Start a read-only transaction
  const tx = db.transaction("jate", "readonly");

  // Access the "jate" object store
  const store = tx.objectStore("jate");

  // Retrieve all content from the object store
  return store.getAll();
};

initdb();
