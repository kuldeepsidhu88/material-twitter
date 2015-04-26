console.log("Hello from Node");

var express = require('express');
var bodyParser = require('body-parser');

var app = new express();
var router = express.Router();

app.use(bodyParser());
app.use(express.static(__dirname + '/view'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/font',express.static('font'));
app.use('/',router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running at port : '+port);

/* Twitter Set up - Start */
var Twitter = require('node-twitter');
 
var twitterSearchClient = new Twitter.SearchClient(
    'SSpRBnQGJN4U8VUD8zpagg',
    'Nm3gn9VoKjxvqyyhAOiqQpzrFy2rdKd4GzgIowA0',
    '69593366-h9FbvybTzCJSh0Qk8CoUrYw3Hf641fqHJy3WpqX88',
    'e96xaMZK93Kdfj5ykFBgbhEUd8FhI9mg1rPvUpZcPs'
);
/* Twitter Set up - End */


/* Routing - Start */
router.get('/',function(req,res){
    res.sendFile('index.html');
});

router.get('/test',function(req,res){
    res.json({message:'welcome to our api!'});
});

router.get('/s',function(req,res){
    var term = req.query.q;
    var count = 2;
    twitterSearchClient.search({'q': term,'lang':'en'}, function(error, result) {
        if (error)
        {
            console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
        }
     
        if (result)
        {
            var result_json = {};
            var statuses = [];
            result_json.statuses = statuses;

/*
            console.log(result.statuses.length);
            console.log(result.statuses[0].user.name);
            console.log(result.statuses[0].user.screen_name);
            console.log(result.statuses[0].text);
            console.log(result.statuses[0].id_str);
            console.log(result.statuses[0].created_at);
            */
            //console.log(result.statuses[0].profile_image_url);
            for(var i=0;i<result.statuses.length;i++){
                var name = result.statuses[i].user.name
                var screen_name = result.statuses[i].user.screen_name;
                var tweet_text = result.statuses[i].text;
                var profile_image_url = "";
                var tweet_id = result.statuses[i].id_str;
                var created_at = result.statuses[i].created_at;
                var status = {
                    "name": name,
                    "screen_name": screen_name,
                    "tweet_text": tweet_text,
                    "profile_image_url": profile_image_url,
                    "tweet_url": "http://twitter.com/"+screen_name+"/status/"+tweet_id,
                    "created_at": created_at
                }
                result_json.statuses.push(status);
            }
            console.log(result_json);

            res.header("Content-Type", "application/json");
            res.send(JSON.stringify(result_json, null, 3));
        }
    });
});







