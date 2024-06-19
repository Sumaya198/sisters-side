// app/admin/dashboard/page.js
"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Correct import for app directory
import axios from 'axios';

const AdminDashboard = () => {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || !session.user.isAdmin) {
            router.push('/'); // Redirect non-admin users
        } else {
            fetchUsers();
        }
    }, [session, status]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
