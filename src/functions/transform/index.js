// src/functions/transform/index.js
const { transformText } = require('../logic/transformLogic'); // adjust path if needed

module.exports = async function (context, req) {
  context.log('Transform function hit.');

  try {
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

    // Call your logic (this is the line likely throwing if something's wrong)
    const result = transformText ? transformText(text) : {
      original: text,
      transformed: text.split('').reverse().join('').toUpperCase(),
      length: text.length
    };

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: result
    };
  } catch (err) {
    // TEMPORARY: return the error details so we can debug the production issue
    context.log.error('Transform error:', err);
    context.res = {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: {
        error: String(err.message || err),
        stack: err.stack ? String(err.stack).split('\n').slice(0,10) : undefined,
        note: 'This response includes debug info; remove debug handler after fix.'
      }
    };
  }
};
