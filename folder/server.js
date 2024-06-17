const express = require('express');
const cron = require('node-cron');

const app = express();
app.use(express.json());

const alarms = {};

// Endpoint to set alarm
app.post('/set-alarm', (req, res) => {
  const { userId, time } = req.body;
  alarms[userId] = { time, res }; // Store the response object along with the alarm

  // Schedule alarm
  cron.schedule(time, () => {
    // Send response to user
    if (alarms[userId]) {
      alarms[userId].res.send(`Alarm for user ${userId} triggered at ${time}`);
      delete alarms[userId]; // Remove the alarm after it's triggered
    }
  });

  res.send('Alarm set successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




const express = require('express');
const cron = require('node-cron');

const app = express();
app.use(express.json());

const alarms = {};

// Endpoint to set alarm
app.post('/set-alarm', (req, res) => {
  const { userId, time } = req.body;
  alarms[userId] = { time, response: res }; // Store the response callback along with the alarm time

  // Schedule alarm
  cron.schedule(time, () => {
    // Trigger the alarm
    if (alarms[userId]) {
      const response = alarms[userId].response;
      response.send(`Your alarm set for ${time} has been completed.`);
      delete alarms[userId]; // Remove the alarm after it's triggered
    }
  });

  res.send('Alarm set successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
