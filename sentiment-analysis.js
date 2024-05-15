const Sentiment = require('sentiment');

const sentiment = new Sentiment();

function analyzeSentiment(text) {
    const result = sentiment.analyze(text);
    return result.score;
}

module.exports = analyzeSentiment
