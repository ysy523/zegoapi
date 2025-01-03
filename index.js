const express = require('express');
const { ZegoServerAssistant ,generateToken04} = require('./zegoServerAssistant');
const app = express();


const appID = 800739391; // Zego App ID
const serverSecret = 'dd3303415db6855bc2398ae440609ce0'; // Zego Server Secret


app.use(express.json());

app.post ('/generatetoken',(req,res)=>{

    const { userID, userName } = req.body;

    if (userID = '')
    {
      return res.status(400).json({ error: 'userId is required' });
    }

    console.log ("userid",userID)

    const roomID = `room_${new Date().getTime()}`;
  
    const payloadObject = {
        room_id: roomID,
        user_id: userID,
        privilege: {
          1: 1, // Allow publishing
          2: 1, // Allow subscribing
        }
        // expire_time: Math.floor(Date.now() / 1000) + 3600, // Token expires in 1 hour
      };

      const payload = JSON.stringify(payloadObject);

      const effectiveTimeInSeconds = Math.floor(Date.now() / 1000) + 3600; //type: number; unit: s； token 过期时间，单位：秒

      const token = generateToken04(appID, userID,serverSecret,effectiveTimeInSeconds,payload);


      const inviteLink = `https://yourdomain.com/join?roomID=${roomID}&token=${token}`;
    res.json({success:true, roomID,inviteLink});
    
})


const PORT =5500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
