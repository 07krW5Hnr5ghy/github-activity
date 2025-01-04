#!/usr/bin/env node
// CLI handle
const main = () => {
    const [,,username] = process.argv;
    if(username){
        console.log("ok");
        console.log(username);
    }else{
        console.log(`
            Usage: 
            github-activiy <username>
        `);
    }
}

main();