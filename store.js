const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, opts.configName + '.json');
    if (!fs.existsSync(this.path)) {
      const initial_data = {
        "boards": [
          {"name": "test1"}, 
          {"name": "test2"},
          {"name": "test3"}
        ]
      }
      fs.writeFileSync(this.path, JSON.stringify(initial_data));
    }
    this.data = this.parseDataFile(this.path);
  }
  
  get(key) {
    return this.data[key];
  }
  
  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  parseDataFile(filePath) {
    try {
    return JSON.parse(fs.readFileSync(filePath));
    } catch(error) {
    return;
    }   
  }   

}

module.exports = Store;