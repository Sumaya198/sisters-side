// app/api/admin/users/route.js
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req) {
    await dbConnect();

    const session = await getServerSession({ req, ...authOptions });

    if (!session || !session.user.isAdmin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const users = await User.find({}, 'name email');

    return new Response(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
