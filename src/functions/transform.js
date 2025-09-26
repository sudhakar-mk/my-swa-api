const { app } = require('@azure/functions');

app.http('transform', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Transform endpoint hit: ${request.url}`);

    // Read JSON body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      body = {};
    }

    const text = body.text;

    if (!text) {
      return {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing "text" in request body' })
      };
    }

    // Example transformation: reverse + uppercase
    const transformed = text.split('').reverse().join('').toUpperCase();

    return {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        original: text,
        transformed,
        length: text.length
      })
    };
  }
});
