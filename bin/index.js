#!/usr/bin/env node
const https = require('https');
const EVENTTYPES = {
    COMMIT_COMMENT:'CommitCommentEvent',
    CREATE:'CreateEvent',
    DELETE:'DeleteEvent',
    FORK:'ForkEvent',
    GOLLUM:'GollumEvent',
    ISSUE_COMMENT:'IssueCommentEvent',
    ISSUES:'IssuesEvent',
    MEMBER:'MemberEvent',
    PUBLIC:'PublicEvent',
    PULL_REQUEST:'PullRequestEvent',
    PULL_REQUEST_REVIEW:'PullRequestReviewEvent',
    PULL_REQUEST_REVIEW_COMMENT:'PullRequestReviewCommentEvent',
    PULL_REQUEST_REVIEW_THREAD:'PullRequestReviewThreadEvent',
    PUSH:'PushEvent',
    RELEASE:'ReleaseEvent',
    SPONSORSHIP:'SponsorshipEvent',
    WATCH:'WatchEvent',
};
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
                //console.log(JSON.parse(data));
                for(eventData of JSON.parse(data)){
                    console.log(eventData);
                    switch (eventData.type){
                        case EVENTTYPES.COMMIT_COMMENT:
                            console.log() 
                    }
                }
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