/**
 * @Author: PiNgFan826
 * @Date:   2016-08-23 09:18
 * @Last modified by:   PiNgFan826
 * @Last modified time: 2016-08-23 18:14
 */




const localDB = {
  version: 2,
  indexedDB: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
  IDBKeyRange: window.IDBKeyRange || window.webkitIDBKeyRange,
  IDBTransaction: window.IDBTransaction || window.webkitIDBTransaction,
};

const dbName = 'localDB';

localDB.indexedDB.onerror = function (e) {
  console.log('DB error: ', e.target.errorCode);
};

function createDB() {
  const request = localDB.indexedDB.open(dbName, 4);

  request.onerror = function (e) {
    console.log('DB error: ', e.target.errorCode);
  };

  request.onsuccess = function () {
    localDB.db = request.result;
  };

  request.onupgradeneeded = function (evt) {
    evt.currentTarget.result.createObjectStore('index', { keyPath: 'id', autoIncrement: true });
  };
}

function deleteDB() {
  const request = localDB.indexedDB.deleteDatabase(dbName);

  request.onsuccess = function () {
    console.log(dbName, 'Database delete success!');
  };

  request.onerror = function (e) {
    console.log('Database error: ', e.target.errorCode);
  };
}

function openDB() {
  const request = localDB.indexedDB.open(dbName, 5);

  request.onerror = function (e) {
    console.log('Database error: ', e.target.errorCode);
  };

  // request.onupgradeneeded = function (evt) {
  //   evt.currentTarget.result.createObjectStore('index', { keyPath: 'id', autoIncrement: true });
  // };

  request.onsuccess = function () {
    localDB.db = request.result;
    // updateItem();
    deleteItem();
  };
}

function addItem() {
  try {
    const transaction = localDB.db.transaction('index', 'readwrite');
    const store = transaction.objectStore('index');
    if (localDB != null && localDB.db != null) {
      const request = store.add({
        dream: 'I want to do something that i want to do',
        name: 'shenqianlu',
        city: 'changli',
      });

      request.onsuccess = function () {
        console.log('add item success!');
      };

      request.onerror = function (e) {
        console.log(e);
      };
    }
  } catch (e) {
    console.log(e);
  }
}

function fetchItem() {
  try {
    if (localDB != null && localDB.db != null) {
      const store = localDB.db.transaction('index').objectStore('index');
      store.get('2').onsuccess = function (e) {
        const result = e.target.result;
        if (result == null) {
          console.log('index not found');
        } else {
          console.log(JSON.stringify(result, null, 4));
        }
      };
    }
  } catch (e) {
    console.log(e);
  }
}

function updateItem() {
  try {
    const store = localDB.db.transaction('index', 'readwrite').objectStore('index');
    if (localDB != null && localDB.db != null) {
      store.get('3').onsuccess = function (e) {
        const result = e.target.result;
        result.name = 'shenlu';
        const request = store.put(result);
        request.onsuccess = function () {
          console.log('update item success!');
          fetchItem();
        };
        request.onerror = function (evt) {
          console.log(evt.value);
        };
      };
    }
  } catch (e) {
    console.log(e);
  }
}

function deleteItem() {
  try {
    const store = localDB.db.transaction('index', 'readwrite').objectStore('index');
    if (localDB != null && localDB.db != null) {
      console.log(store);
      store.delete(1).onsuccess = function () {
        console.log('delete item success!');
      };
    }
  } catch (e) {
    console.log(e);
  }
}

openDB();
