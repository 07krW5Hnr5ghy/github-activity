#!/usr/bin/env node
const https = require('https');
// CLI handle
const main = () => {
    const [,,username] = process.argv;
    if(username){
        const options = {
            host:'api.github.com',
            path:`/users/${username}/events/public`,
            method:'GET',
            headers:{
                'Accept':'application/vnd.github+json',
                'User-Agent': 'Mozilla/5.0'
            },
        };
        let request = https.request(options,(res)=>{
            if(res.statusCode!==200){
                console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
                res.resume();
                return;
            }

            let data = '';

            res.on('data',(chunk)=>{
                data += chunk;
            });

            res.on('close',()=>{
                console.log('Retrieved all data');
                console.log(JSON.parse(data));
            });
        });
        request.end();
        request.on('error',(err)=>{
            console.error(`Encountered an error trying trying to make a request : ${err.message}`);
        });
    }else{
        console.log(`
            Usage: 
            github-activiy <username>
        `);
    }
}

main();