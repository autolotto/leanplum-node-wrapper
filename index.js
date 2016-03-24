import request from 'superagent-bluebird-promise';

class LeanPlum {
  constructor ({ broadcastKey, appId }) {
    if (!broadcastKey || !appId) throw new Error('broadcastKey and appId are required.');
    this.endpoint = `https://www.leanplum.com/api?appId=${ appId }&clientKey=${ broadcastKey }&apiVersion=1.0.6`;
  }

  async trackGlobalEvent (eventName, params) {
    let response;
    try {
      // make request to leanplum API, store response to return at end of method
      response = await request.get(`${ this.endpoint }&action=broadcast&globalEvent=${ eventName }&params=${ JSON.stringify(params) }`);

      // check response message and log success or failure
      if (JSON.parse(response.text).response[0].success) {
        console.log(`LeanPlum ${ eventName } has been tracked successfully.`);
      } else {
        console.log(`LeanPlum Tracking for ${ eventName } has failed. Response: ${response.text}`);
      }
    } catch (e) {

      response = e;
      console.log(`LeanPlum trackGlobalEvent error: ${e}`);
    }

    return response;
  }
}

export default function ({ broadcastKey, appId }) { return new LeanPlum({ broadcastKey, appId }); }
