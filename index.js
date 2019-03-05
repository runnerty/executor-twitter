'use strict';

const Twit = require('twit');

const Execution = global.ExecutionClass;

class twitterExecutor extends Execution {
  constructor(process) {
    super(process);
  }

  exec(params) {
    let _this = this;

    let T = new Twit({
      consumer_key: params.consumerKey,
      consumer_secret: params.consumerSecret,
      access_token: params.accessToken,
      access_token_secret: params.accessTokenSecret,
      timeout_ms: params.timeoutMs
    });

    let command = params.command;

    switch (command) {
      case 'update':
        T.post('statuses/update', { status: params.status }, (err, data, response) => callback(err, data, response));
        break;

      case 'search':
        T.get('search/tweets', { q: params.query }, (err, data, response) => callback(err, data, response));
        break;

      case 'followers':
        T.get('followers/ids', { screen_name: params.screen_name }, (err, data, response) =>
          callback(err, data, response)
        );
        break;

      case 'retweet':
        T.post('statuses/retweet/:id', { id: params.tweet_id }, (err, data, response) => callback(err, data, response));
        break;

      case 'direct':
        T.post(
          'direct_messages/new',
          { screen_name: params.screen_name, text: params.textToSend },
          (err, data, response) => callback(err, data, response)
        );
        break;

      case 'media':
        T.post('media/upload', { media_data: params.base64 }, (err, data, response) => {
          const mediaIdStr = data.media_id_string;
          const altText = params.altText || 'Alternative image text';
          const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
          if (!err) {
            T.post('media/metadata/create', meta_params, (err, data, response) => {
              if (!err) {
                let paramsImg = { status: params.status, media_ids: [mediaIdStr] };
                T.post('statuses/update', paramsImg, (err, data, response) => {
                  callback(err, data, response);
                });
              } else {
                callback(err, data, response);
              }
            });
          } else {
            callback(err, data, response);
          }
        });
        break;

      default:
        callback(new Error('Expected params not found'), null, null);
        break;
    }

    function callback(err, data, response) {
      if (err) {
        const endOptions = {
          end: 'error',
          messageLog: err,
          err_output: err,
          extra_output: response
        };
        _this.end(endOptions);
      } else {
        const endOptions = {
          end: 'end',
          // data_output: data,
          // extra_output: response
        };
        _this.end(endOptions);
      }
    }
  }
}

module.exports = twitterExecutor;
