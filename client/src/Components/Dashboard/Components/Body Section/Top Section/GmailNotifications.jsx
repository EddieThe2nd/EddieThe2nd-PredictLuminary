import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import './Gmail.css'; // Adjust path as necessary

const CLIENT_ID = '535838110120-b9ms9isillqu3l8kscuijsc0aasabn74.apps.googleusercontent.com';
const API_KEY = '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';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

const GmailNotification = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          loadGmailApi(); 
        } else {
          authInstance.signIn().then(() => {
            loadGmailApi(); 
          }).catch((error) => {
            console.error('Error during sign-in:', error);
          });
        }
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const convertToLocalTime = (dateString) => {
    // Convert date string to Date object
    const date = new Date(dateString);

    // Format date to a readable string with timezone 'Africa/Johannesburg'
    return date.toLocaleString('en-US', {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const loadGmailApi = () => {
    gapi.client.gmail.users.messages
      .list({
        userId: 'me',
        labelIds: ['INBOX'],
        maxResults: 50,
      })
      .then((response) => {
        const messages = response.result.messages || [];
        const messagePromises = messages.map((message) =>
          gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: message.id,
          })
        );

        Promise.all(messagePromises).then((responses) => {
          setMessages(responses.map((res) => ({
            from: res.result.payload.headers.find(header => header.name === 'From')?.value,
            subject: res.result.payload.headers.find(header => header.name === 'Subject')?.value,
            date: convertToLocalTime(res.result.payload.headers.find(header => header.name === 'Date')?.value),
          })));
        });
      })
      .catch((error) => {
        console.error('Error loading Gmail messages:', error);
      });
  };

  return (
    <div>
      <h2>SmartSalesAI Gmail Messages:</h2>
      <table className="email-table">
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index}>
              <td>{msg.from}</td>
              <td>{msg.subject}</td>
              <td>{msg.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GmailNotification;
