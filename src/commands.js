import { gatherAllPullRequests } from './cliFunctions';

// Going to try and parse out flags that I pass in to node via process.argv
let params = process.argv.slice(2);
console.log(params)
const processParams = (params) => {
  // let params = args.slice(2);

  // if(!params.length){
  //   console.log('Pass in some flags: ex --')
  //   return;
  // } else {
  //   processParams(params);
  // }
  for (let i = 0; i < params.length; i += 2) {
    if (!params[i]) {
      console.log()
    }
    console.log('Your Params', params[i], params[i + 1]);
    let missingDash = !!params[i].indexOf('-');
    console.log('Missing a dash?', missingDash)

    if ((params[i] && params[i + 1]) && missingDash) {

      console.log('You forgot a "-" or "--" in front of', params[i])
    }
    if (params[i] && !missingDash && !params[i + 1]) {
      console.log('This type of arg must follow', params[i])
    }
  }
}

// capture single - and -- flags
// list all repos per org
// get number of PRs by Repo name
// get all prs of a state type open, closed, merged
// 


// {
//   list : options;
//   repo: options
//   type: options
// }

// --repo ramda
// --repo rvwatch

// const messaging = {
//   missingFlags: `Please enter a valid flag. For example: ', ${Object.keys(commandTypes)}}`,
//   missingRepo: `Please enter a valid repo name`,

// }


// const commandTypes = {
//   list: 
// }


// const flags = {
//   --repo: 
// }


function () {
  const reject = 'nope';
}

// export async function commands() {
//   const options = processParams(params);

//   try{
//     await new Promise();


//     await gatherAllPullRequests(options);
//   } catch (e) {
//     console.error('oops');
//   }
}

export function commands() {
  const options = processParams(params);


  return gatherAllPullRequests(options).catch(e => {
    console.error('oops');
  });
}

class Promise {
  constructor(handler) {
    this.status = "pending";
    this.value = 'oops';
    let a = 'something';

    const resolve = value => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
      }
    };
    const reject = value => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.value = value;
      }
    };

    try {
      handler(resolve, reject);
      // (resolve, reject) => reject('oops')
    } catch (err) {
      reject(err);
    }


  }

  then(onFulfilled, onRejected) {
    if (this.status === "fulfilled") {
      onFulfilled(this.value);
    } else if (this.status === "rejected") {
      onRejected(this.value);
    }
  }

  catch(onRejected) {

  }
}




"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  }
  else {
    Promise.resolve(value)
      .then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function foo() {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(
      function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('https://google.com');

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
  }));
  return _foo.apply(this, arguments);
}