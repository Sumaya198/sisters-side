// app/api/admin/users/route.js
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';

export async function GET(req) {
    await dbConnect();

    try {
        const users = await User.find().select('name email createdAt');
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
