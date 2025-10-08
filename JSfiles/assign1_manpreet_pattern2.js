// pyramid
// * * * * *
//  * * * *
//   * * *
//    * *
//     *

// for (let i =5; i>0; i--){
//     for(let j=0;j<i;j++){
//         process.stdout.write(' * ');
//     }
//     console.log('\n');
//     for( let k =5; k>=i && k>0; k--){
//             process.stdout.write(' ');
//     }
// }

for (let i =5; i>0; i--){
    for(let j=0;j<i;j++){
        process.stdout.write(' * ');
    }
    console.log('\n');
    for( let k =5; k>=i && k>0; k--){
            process.stdout.write(' ');
    }
}

