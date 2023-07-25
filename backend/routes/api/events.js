const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Event } = require('../../db/models');

require('dotenv');
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(process.env.SERPAPI_TOKEN);

const router = express.Router();

// fetch events from a location
router.get('/:location/:date', asyncHandler(async (req, res) => {
  const { location, date } = req.params;

  const params = {
    engine: "google_events",
    q: `Events in ${location} ${date}`,
    hl: "en",
    gl: "us",
    google_domain: "google.com",
    location
  };

  const searchResponse = await search.json(params,
    (data) => console.log('query data', data));
}))

module.exports = router;
