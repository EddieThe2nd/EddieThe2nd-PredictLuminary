import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '535838110120-b9ms9isillqu3l8kscuijsc0aasabn74.apps.googleusercontent.com';
const API_KEY = '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';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'];
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

function GmailAuth() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return null;
}

export default GmailAuth;
