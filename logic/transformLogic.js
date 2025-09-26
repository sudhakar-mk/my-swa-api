// src/logic/transformLogic.js

function transformText(text) {
  // Your big logic from server.js goes here.
  // For now, just example logic:
  return {
    original: text,
    transformed: text.split('').reverse().join('').toUpperCase(),
    length: text.length
  };
}

module.exports = { transformText };
