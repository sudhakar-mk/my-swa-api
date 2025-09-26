// src/functions/transform/index.js
const { transformText } = require('../../logic/transformLogic'); // adjust path as necessary

module.exports = async function (context, req) {
  context.log('Transform function hit.');

  const body = req.body || (req.query && { text: req.query.text }) || {};
  const text = body.text;

  if (!text) {
    context.res = {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Missing "text" in request body' }
    };
    return;
  }

  // Reuse your logic
  const result = (typeof transformText === 'function')
    ? transformText(text)
    : {
        original: text,
        transformed: text.split('').reverse().join('').toUpperCase(),
        length: text.length
      };

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: result
  };
};
