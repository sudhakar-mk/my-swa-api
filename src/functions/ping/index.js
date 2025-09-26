// src/functions/ping/index.js
module.exports = async function (context, req) {
  context.log('Ping function invoked');
  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { pong: true, time: new Date().toISOString() }
  };
};
