import { gatherAllPullRequests } from './cliFunctions';

// Going to try and parse out flags that I pass in to node via process.argv
let flags = process.argv.slice(2);
console.log(flags)
const processParams = (params) => {
    // let params = args.slice(2);

  // if(!params.length){
  //   console.log('Pass in some flags: ex --')
  //   return;
  // } else {
  //   processParams(params);
  // }
  for (let i = 0; i < params.length; i += 2) {
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


export async function commands(args) {
  await gatherAllPullRequests(args);
}
