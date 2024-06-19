// app/api/auth/register/route.js
import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    return new Response(JSON.stringify({ message: 'User created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
