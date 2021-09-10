import { getAllPullRequests } from './query';


const processParams = (params) => {
  for(let i = 0; i < params.length; i += 2){
    console.log('Your Params', params[i], params[i + 1]);
    let missingDash = !!params[i].indexOf('-');
    console.log('Missing a dash?', missingDash)

    if((params[i] && params[i + 1]) && missingDash){

      console.log('You forgot a "-" or "--" in front of', params[i])
    }
    if(params[i] && !missingDash && !params[i + 1]){
      console.log('This type of arg must follow', params[i])
    }
  }
}


export async function commands (args) {
  // let params = args.slice(2);

  // if(!params.length){
  //   console.log('Pass in some flags: ex --')
  //   return;
  // } else {
  //   processParams(params);
  // }

  await getAllPullRequests();
}
