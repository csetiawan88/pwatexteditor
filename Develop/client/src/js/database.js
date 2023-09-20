// Import the openDB function from the "idb" library
import { openDB } from "idb";

// Function to initialize the database
const initdb = async () =>
  openDB("jate", 1, {
    // Upgrade function that runs when the database version changes
    upgrade(db) {
      // Check if the "jate" object store already exists
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // If not, create the "jate" object store with auto-incrementing keys
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// // Initialize the database and store the promise in dbPromise
// const dbPromise = initdb();

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error("putDb not implemented");
  console.log("PUT to the database");

  // Get the initialized database instance
  const jateDb = await openDB("jate", 1);

  // Start a read-write transaction
  const tx = jateDb.transaction("jate", "readwrite");

  // Access the "jate" object store
  const store = tx.objectStore("jate");

  // Add the provided content to the object store
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error("getDb not implemented");
  console.log("GET from the database");

  // Get the initialized database instance
  const jateDb = await openDB("jate", 1);

  // Start a read-only transaction
  const tx = jateDb.transaction("jate", "readonly");

  // Access the "jate" object store
  const store = tx.objectStore("jate");

  // Retrieve content with the key "1" from the object store
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

// Call the initdb function to initialize the database when this module is loaded
initdb();
