// app/api/users/route.js
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export async function POST(req) {
    await dbConnect();

    const body = await req.json();
    const user = new User(body);
    await user.save();

    return new Response(JSON.stringify(user), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function GET(req) {
    await dbConnect();

    const users = await User.find({});

    return new Response(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
