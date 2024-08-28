
import { parse } from 'url';
import axios from 'axios';

export default async (req, res) => {
  const { query } = parse(req.url, true);
  const { code } = query;

  if (code) {
    try {
      const tokenResponse = await axios.post('https://api.gohighlevel.com/oauth/token', {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.GOHIGHLEVEL_CLIENT_ID,
        client_secret: process.env.GOHIGHLEVEL_CLIENT_SECRET,
        redirect_uri: 'https://your-vercel-app.vercel.app/api/oauth/callback'
      });

      const { access_token } = tokenResponse.data;
      // Store or use the access token as needed
      res.status(200).json({ success: true, message: 'Authorization successful' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error exchanging code for token' });
    }
  } else {
    res.status(400).json({ success: false, message: 'No authorization code provided' });
  }
};
