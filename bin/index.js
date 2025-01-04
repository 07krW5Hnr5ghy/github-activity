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
                    switch (eventData.type){
                        case EVENTTYPES.COMMIT_COMMENT:
                            console.log(`- Created commit comment in ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.CREATE:
                            console.log(`- Created repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.DELETE:
                            console.log(`- Deleted ${eventData.payload.ref_type} ${eventData.payload.ref} repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.FORK:
                            console.log(`- Fork repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.GOLLUM:
                            console.log(`- Wiki created for repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.ISSUE_COMMENT:
                            console.log(`- ${eventData.payload.action} comment in ${eventData.payload.issue} issue for repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.ISSUES:
                            console.log(`- ${eventData.payload.action} ${eventData.payload.issue} #${eventData.payload.number} issue for repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.MEMBER:
                            console.log(`- ${eventData.payload.member} added in repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.PUBLIC:
                            console.log(`- Repository ${eventData.repo.name} became public`);
                            break;
                        case EVENTTYPES.PULL_REQUEST:
                            console.log(`- Pull request ${eventData.payload.action} #${eventData.payload.number} in repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.PULL_REQUEST_REVIEW:
                            console.log(`- Review ${eventData.payload.action} for pull request #${eventData.payload.number} in repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.PULL_REQUEST_REVIEW_COMMENT:
                            console.log(`- Comment ${eventData.payload.action} for pull request #${eventData.payload.pull_request} in repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.PULL_REQUEST_REVIEW_THREAD:
                            console.log(`- Thread marked ${eventData.payload.action} for pull request #${eventData.payload.pull_request} in repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.PUSH:
                            console.log(`- Pushed ${eventData.payload.commits.length} commits in repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.RELEASE:
                            console.log(`- Release ${eventData.payload.action} for repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.SPONSORSHIP:
                            console.log(`- Sponsorship for ${eventData.payload.action} for repository ${eventData.repo.name}`);
                            break;
                        case EVENTTYPES.WATCH:
                            console.log(`- Started watching repository ${eventData.repo.name}`);
                        default:
                            console.log("Event type not supported.");
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