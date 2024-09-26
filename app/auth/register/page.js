'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import styles from './Register.module.css';
import NavbarBlack from '@/app/components/NavbarBlack';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/api/auth/register', formData);
            if (response.status === 201) {
                toast.success('Registration successful');
                setTimeout(() => {
                    router.push('/auth/login');
                }, 1500);
            } else {
                toast.error('Registration failed');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during registration');
        }
    };

    return (
        <>
        <NavbarBlack />
        <div className={styles.container}>
            <div className={styles.registerContainer}>
                <div className={styles.imageSection}></div>
                <div className={styles.formSection}>
                    <h1 className={styles.h1}>Register</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                        className={styles.input}
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
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
                        <input
                        className={styles.input}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button className={styles.button} type="submit">Register</button>
                    </form>
                    <div className={styles.additionalLinks}>
                        <Link href="/auth/login">Already have an account? Log in</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Register;
