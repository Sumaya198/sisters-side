// app/community-guidelines/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const CommunityGuidelines = () => {
    const [accepted, setAccepted] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const mosqueId = searchParams.get('mosqueId');

    const handleAcceptChange = (e) => {
        setAccepted(e.target.checked);
    };

    const handleContinue = () => {
        if (accepted) {
            router.push(`/mosques/${mosqueId}/review`);
        }
    };

    return (
        <div>
            <h1>Community Guidelines</h1>
            <p>Please read and accept the community guidelines before leaving a review.</p>
            <div>
                <input type="checkbox" id="accept" checked={accepted} onChange={handleAcceptChange} />
                <label htmlFor="accept">I accept the community guidelines</label>
            </div>
            <button onClick={handleContinue} disabled={!accepted}>Continue</button>
        </div>
    );
};

export default CommunityGuidelines;
