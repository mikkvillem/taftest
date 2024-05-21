import axios from 'axios';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request) {
  const mercuryUrl = 'https://uptime-mercury-api.azurewebsites.net/webparser';
  try {
    const url = request.nextUrl.searchParams.get('url');
    const body = { url };

    const mercuryRersponse = await axios.post(mercuryUrl, body);
    //const resJSON = await mercuryRersponse.json();
    return Response.json({ data: mercuryRersponse.data });
  } catch (error) {
    console.log('error: ', error);
  }
}
