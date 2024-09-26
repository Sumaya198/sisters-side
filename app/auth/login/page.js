'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import styles from './Login.module.css';
import Navbar from '@/app/components/Navbar';
import NavbarBlack from '@/app/components/NavbarBlack';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success('Logged in successfully');
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during login');
        }
    };

    return (
        <>
       <NavbarBlack />
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.imageSection}></div>
                <div className={styles.formSection}>
                    <h1 className={styles.h1}>Login</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                         className={styles.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                        className={styles.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button className={styles.button} type="submit">Login</button>
                    </form>
                    <div className={styles.additionalLinks}>
                        <Link href="/forgot-password">Forgot Password?</Link>
                        <Link href="/auth/register">Create an Account</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;
