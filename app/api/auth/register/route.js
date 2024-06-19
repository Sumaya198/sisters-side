import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

export async function POST(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const user = new User(body);
        await user.save();

        return new Response(JSON.stringify(user), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Registration failed' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
