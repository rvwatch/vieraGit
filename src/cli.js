import { getIssues } from './query';

const args = process.argv.slice(2);
// loop over the args in blocks of 2

// [-u, rvwatch, -t, pull]


for(let i = 0; i < args.length; i += 2){
  console.log(args[i], args[i + 1]);
  // validate that theres a - or 2 -- in the args[i]
  let missingDash = !!args[i].indexOf('-');
  if((args[i] && args[i + 1]) && missingDash){
    console.log('You forgot a "-" or "--" in front of', args[i])
  }
  if(args[i] && !missingDash && !args[i + 1]){
    console.log('This type of arg must follow', args[i])
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

// for(let arg of args){
//   switch (arg) {
//     case '-n' || '--name':
//         console.log('GIVE ME A NAME')
//       break;
  
//     default:
//       break;
//   }
// }
const data = getIssues(options);
console.log(data);
export function cli (args) {
  console.log(args.slice(2))
}