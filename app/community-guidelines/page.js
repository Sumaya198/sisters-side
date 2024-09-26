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
            <p>Sister’s Side is intended to be a resource guide to help Muslim women find suitable spaces to pray. In order to create a beneficial resource guide, all reviews must be constructive and focus on the physical space -- keeping in mind the provided criteria. We encourage members to include images of the sister’s side in their reviews, but to also avoid uploading images of masjids that may include any identifiable individuals and make sure to follow masjid rules on photography and videography. We have a zero-tolerance approach to any form of discrimination, bullying and harassment and anyone who would like to leave a review must adhere to the community guidelines. Reviews that violate the community guidelines will be subject to removal.</p>
            <div>
                <input type="checkbox" id="accept" checked={accepted} onChange={handleAcceptChange} />
                <label htmlFor="accept">I accept the community guidelines</label>
            </div>
            <button onClick={handleContinue} disabled={!accepted}>Continue</button>
        </div>
    );
};

export default CommunityGuidelines;
