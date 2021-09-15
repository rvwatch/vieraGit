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
    if(!params[i]){
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



export async function commands() {
  const options = processParams(params);
  await gatherAllPullRequests(options);
  
}
