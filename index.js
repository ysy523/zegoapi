const express = require('express');
const { ZegoServerAssistant ,generateToken04} = require('./zegoServerAssistant');
const app = express();


const appID = 800739391; // Zego App ID
const serverSecret = 'dd3303415db6855bc2398ae440609ce0'; // Zego Server Secret


app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post('/generatetoken', (req, res) => {
    const { userID, userName } = req.body;
  
    // Validate userID
    if (!userID) {
      return res.status(400).json({ error: 'userId is required' });
    }
  
    console.log('userid', userID);
  
    const roomID = `room_${new Date().getTime()}`;
  
    const payloadObject = {
      room_id: roomID,
      user_id: userID,
      privilege: {
        1: 1, // Allow publishing
        2: 1, // Allow subscribing
      },
    };
  
    const payload = JSON.stringify(payloadObject);
  
    const effectiveTimeInSeconds = Math.floor(Date.now() / 1000) + 3600; // Token expires in 1 hour
  
    try {
      // Generate token
      const token = generateToken04(appID, userID, serverSecret, effectiveTimeInSeconds, payload);
  
      // Generate invite link
      const inviteLink = `https://yourdomain.com/join?roomID=${roomID}&token=${token}`;
  
      // Send response
      res.status(200).json({ roomid: roomID, inviteLink: inviteLink ,token:token });

    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


const PORT =5500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



module.exports = app