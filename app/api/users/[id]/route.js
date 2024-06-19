// app/api/users/[id]/route.js
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

export async function PUT(req) {
    await dbConnect();

    const { id } = req.query;
    const body = await req.json();

    const user = await User.findByIdAndUpdate(id, body, { new: true });

    if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
