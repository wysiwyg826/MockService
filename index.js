/**
* @Author: PiNgFan826
* @Date:   2016-08-22 17:54
* @Last modified by:   PiNgFan826
* @Last modified time: 2016-08-23 10:16
*/
import Mock from 'mockjs';

class LocalDB {
  constructor(dbName, version) {
    this.db = null;
    this.dbName = dbName;
    this.version = version || 1;
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
    this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
    this.destroy = this.destroy.bind(this);
    this.createDocment = this.createDocment.bind(this);
    this.insertItem = this.insertItem.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  connect() {
    const that = this;
    return new Promise(function (resolve) {
      const request = that.indexedDB.open(that.dbName);
      request.onsuccess = function () {
        that.db = request.result;
        that.request = request;
        that.version = that.db.version;
        resolve(that);
      };
      request.onerror = function (e) {
        console.log('Database error: ', e.target.errorCode);
      };
    });
  }

  destroy() {
    const request = this.indexedDB.deleteDatabase(this.dbName);
    const that = this;
    request.onsuccess = function () {
      console.log(that.dbName, 'Database delete success!');
    };

    request.onerror = function (e) {
      console.log('Database error: ', e.target.errorCode);
    };
  }

  createDocment(doc, key) {
    console.log('run createDocment!', this);
    if (!this.db.objectStoreNames.contains(doc)) {
      this.db.close();
      this.version = this.version + 1;
      const request = this.indexedDB.open(this.dbName, this.version);
      this.request = request;

      request.onerror = function (e) {
        console.log('Database error: ', e.target.errorCode);
      };
      const that = this;

      request.onupgradeneeded = function (e) {
        e.currentTarget.result.createObjectStore(doc, { keyPath: key, autoIncrement: true });
        that.db = request.result;
      };
      request.onsuccess = function () {
        that.db = request.result;
      };
    }
  }

  insertItem(doc, data) {
    try {
      console.log(this);
      const transaction = this.db.transaction(doc, 'readwrite');
      const store = transaction.objectStore(doc);
      if (this != null && this.db != null) {
        for (let len = data.length, i = 0; i < len; i++) {
          const request = store.add(data[i]);

          request.onsuccess = function () {
            // console.log('add item success!');
          };

          request.onerror = function (e) {
            console.log(e);
          };
        }
        console.log(this.dbName, '=> 向', doc, '表插入', data.length, '条数据');
      }
    } catch (e) {
      console.log(e);
    }
  }

  fetchItem(doc, id) {
    try {
      if (this != null && this.db != null) {
        const store = this.db.transaction(doc).objectStore(doc);
        store.get(id).onsuccess = function (e) {
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

  fetchItems(doc, index, limit) {
    try {
      let ins = 0;
      let ind = 0;
      const tindex = index || 0;
      const tlimit = limit || 10;
      let arr = [];
      if (this != null && this.db != null) {
        const store = this.db.transaction(doc).objectStore(doc);
        const request = store.openCursor();
        request.onsuccess = function (evt) {
          const cursor = evt.target.result;
          if (cursor && tlimit > ind && ins >= tindex - 1) {
            arr[ind++] = cursor.value;
            cursor.continue();
          } else if (cursor) {
            ins++;
            cursor.continue();
          }
        };
      }
      console.log(arr);
      return arr;
    } catch (e) {
      console.log(e);
    }
  }


  updateItem(doc, id, obj) {
    try {
      const store = this.db.transaction(doc, 'readwrite').objectStore(doc);
      if (this != null && this.db != null) {
        store.get(id).onsuccess = function (e) {
          const result = e.target.result;
          for (let o in obj) {
            result[o] = obj[o];
          }
          const request = store.put(result);
          request.onsuccess = function () {
            console.log('update item success!');
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

  deleteItem(doc, key) {
    try {
      const store = this.db.transaction(doc, 'readwrite').objectStore(doc);
      if (this != null && this.db != null) {
        console.log(store);
        store.delete(key).onsuccess = function () {
          console.log('delete item success!');
        };
      }
    } catch (e) {
      console.log(e);
    }
  }

}
const localDatabase = new LocalDB('testDB', 1);



localDatabase.connect().then(function (pf) {
  // pf.createDocment('mock', 'uid');
  // pf.insertItem('mock', data.list);
  // pf.fetchItems('mock', 4, 10);
  pf.updateItem('mock', 143, {
    AMOUNT: 123,
    CUSID: 2,
    CUSPNM: 'dadasd',
    DAY: 321,
    uid: 143,
  });
});
