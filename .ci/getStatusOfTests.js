
const maxTries=100;
let tries = 0;
const https = require("https");
const token = process.env.token;
const url = `https://circleci.com/api/v1.1/project/github/${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.TESTS_REPONAME}?circle-token=${token}&limit=1`;

const getStatusOfATest= ()=>{
	https.get(url,{headers:{'Accept':'application/json'}}, res => {
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    console.log(`response:${body}`);
    body = JSON.parse(body)[0];
    if (body.status!=='fail' &&  body.status!=='success' && tries<maxTries ){
    	tries++;
    	setTimeout(getStatusOfATest,10000);
    }else{
    	if(body.status === 'success'){
    		//sucess
    		process.exit(0);
    	}else{
    		// otherwise fail
    		process.exit(1);
    	}
    }
  });
});
}
getStatusOfATest();