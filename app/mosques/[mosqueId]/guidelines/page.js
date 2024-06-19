// app/mosques/[mosqueId]/guidelines/page.js
"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CommunityGuidelines = ({ mosqueId }) => {
    const [accepted, setAccepted] = useState(false);
    const router = useRouter();

    const handleAccept = () => {
        if (accepted) {
            router.push(`/mosques/${mosqueId}/review`);
        } else {
            toast.error('You must accept the guidelines to proceed');
        }
    };

    return (
        <div>
            <h1>Community Guidelines</h1>
            <p>Please read and accept the community guidelines to submit your review.</p>
            {/* Add actual guidelines text here */}
            <div>
                <input
                    type="checkbox"
                    id="acceptGuidelines"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                />
                <label htmlFor="acceptGuidelines">I accept the community guidelines</label>
            </div>
            <button onClick={handleAccept}>Continue</button>
        </div>
    );
};

export default CommunityGuidelines;
