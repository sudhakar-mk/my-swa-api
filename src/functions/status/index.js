// src/functions/status/index.js
const { getStatus } = require('../logic/statusLogic'); // path to your logic if needed

module.exports = async function (context, req) {
  context.log('Status function processed a request.');

  // If you have a getStatus in logic, use it. Otherwise create inline:
  const payload = (typeof getStatus === 'function')
    ? getStatus()
    : { status: 'ok', timestamp: new Date().toISOString() };

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: payload
  };
};
