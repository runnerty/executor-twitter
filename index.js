"use strict";

const Twit = require("twit");

const Execution = global.ExecutionClass;

class twitterExecutor extends Execution {
  constructor(process) {
    super(process);
  }

  exec(params) {
    let _this = this;

    let T = new Twit({
      consumer_key:         params.consumerKey,
      consumer_secret:      params.consumerSecret,
      access_token:         params.accessToken,
      access_token_secret:  params.accessTokenSecret,
      timeout_ms:           params.timeout,  // optional HTTP request timeout to apply to all requests.
    });

    let command = params.command;

    switch(command) {
      case "update":
        T.post("statuses/update", { status: params.status }, function(err, data, response) {
          if (err) {
            const endOptions = {
              end: "error",
              messageLog: err,
              err_output: err
            };
            _this.end(endOptions);
          } else {
            const endOptions = {
              end: "end",
              data_output: data
            };
            _this.end(endOptions);
          }
        });
        break;

      case "search":
        T.get("search/tweets", { q: params.query }, function(err, data, response) {
          if (err) {
            const endOptions = {
              end: "error",
              messageLog: err,
              err_output: err
            };
            _this.end(endOptions);
          } else {
            const endOptions = {
              end: "end",
              data_output: data
            };
            _this.end(endOptions);
          }
        });
        break;

      case "followers":
        T.get("followers/ids", { screen_name: params.screen_name },  function (err, data, response) {
          if (err) {
            const endOptions = {
              end: "error",
              messageLog: err,
              err_output: err
            };
            _this.end(endOptions);
          } else {
            const endOptions = {
              end: "end",
              data_output: data
            };
            _this.end(endOptions);
          }
        });
        break;

      case "retweet":
        T.post("statuses/retweet/:id", { id: params.tweet_id }, function (err, data, response) {
          if (err) {
            const endOptions = {
              end: "error",
              messageLog: err,
              err_output: err
            };
            _this.end(endOptions);
          } else {
            const endOptions = {
              end: "end",
              data_output: data
            };
            _this.end(endOptions);
          }
        });
        break;

      case "direct":
        T.post("direct_messages/new", {screen_name: params.screen_name, text: params.textToSend}, function (err, data, response){
          if(err){
            const endOptions = {
              end: "error",
              messageLog: err,
              err_output: err
            };
            _this.end(endOptions);
          } else{
            const endOptions = {
              end: "end",
              data_output: data
            };
            _this.end(endOptions);
          }
        });
        break;

      default:
        const endOptions = {
          end: "error",
          messageLog: "param not found",
          err_output: "param not found"
        };
        _this.end(endOptions);
        break;
    }
  }
}

module.exports = twitterExecutor;
