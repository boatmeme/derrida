var express = require('express'),
request = require('request');


var app = express.createServer(
    express.logger(),
    express.bodyParser(),
    express.static(__dirname + '/public')
);

app.get('/', function(req, res){
    if(req.param("url")) {
        var url = unescape(req.param("url"));
        request({uri:url,encoding:'binary'}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
                var contentType = response.headers['content-type'];
                var image = new Buffer(body.toString(),'binary').toString("base64");
                if(req.param("format") && req.param("format") == "html" ) {
                    var data_uri_prefix = "data:" + contentType + ";base64,";
                    res.render('image.ejs', {   image: image,
                                                layout:false,
                                                data_uri_prefix:data_uri_prefix 
                                            });
                } else if(req.param("format") && req.param("format") == "base64" ) {
                    res.send(image);
                } else {
                    res.render('index.ejs', {   image: image,
                                                layout:false,
                                                contentType:contentType 
                                            });
                }
          }
        });
    } else {
        res.send("Please provide a query parameter named 'url'");
    }
});

app.listen(process.env.PORT);