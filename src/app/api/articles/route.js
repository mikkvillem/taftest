export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request) {
  try {
    const feedUrl = request.nextUrl.searchParams.get('feedUrl');
    const feed = await fetch(feedUrl);

    const text = await feed.text();
    return Response.json({ data: text });
  } catch (error) {
    console.log(error);
  }
}
