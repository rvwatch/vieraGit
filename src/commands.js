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


const commandMap = {
  type: 'Please enter type of query',
  owner: 'Please enter owner name.',
  pulls: false
}

const options = {
  first:  100,
  after: null
}

export async function commands (args) {
  // let params = args.slice(2);

  // if(!params.length){
  //   console.log('Set some params foo!!')
  //   return;
  // } else {
  //   processParams(params);
  // }

  const data = await getAllPullRequests();
  console.log('Get me all the info', data);
  console.log('How many things!?', data.length)
}


/* 

if no endCursor
add that specific repo to a new map with a "PRS" key
add the array of new pullRequests to the map at the key of PRS
break the recurse and then increase our index and go back to start of stack

run my fetch!
see how many repos exist, in this case 11
11 nodes
nodes is an array of objects
each repo is an object in the array
add that specific repo to a new map with a "PRS" key
each repo has an array or pullRequests
add the array of new pullRequests to the map at the key of PRS
each repo may have an endcursor
if endCursor
update my query to that end cursor
run my fetch with the new query!
pass in the new map so we can keep adding to it
back to start new stack



*/