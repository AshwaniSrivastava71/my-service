import { NextRequest } from 'next/server';
 
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  // e.g. Query a database for user with ID `id`
  return new Response(JSON.stringify({ id, name: `User ${id}` }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
 
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
    const id = (await params).id;
    const body = await request.json();
    if (!body.pricing) {
        return new Response(JSON.stringify({ error: 'No Pricing provided' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  // e.g. Delete user with ID `id` in DB
    return new Response(JSON.stringify({ order: id, status: `Updated ${id}` }), {status: 200 });
}