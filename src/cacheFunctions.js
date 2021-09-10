import fs from 'fs';

export let myCache = {
    lastQueryTime: null,
    prs: {},
    prCount: 0,
    repoNames: []
  };
  
  export const loadCache = () => {
    return new Promise((resolve) => {
      fs.readFile('cache.json', (err, data) => {
        if (err) {
          console.log('Cache not found, re-running query.')
          resolve();
          return;
        }
        myCache = JSON.parse(data.toString());
        resolve();
      });
    });
  }
  
  export const saveCache = () => {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        'cache.json',
        JSON.stringify(myCache, null, 2),
        err => {
          if (err) {
            reject(err);
          } else {
            console.log('Cache Created!');
            console.log('Total Available Prs =', myCache.prCount);
            resolve();
          }
        }
      );
    });
  }
  
  export const hasCachedData = (prs) => {
    const last = new Date(myCache.lastQueryTime);
    const oldestNode = new Date(prs[prs.length - 1].updatedAt);
    return last > oldestNode;
  }