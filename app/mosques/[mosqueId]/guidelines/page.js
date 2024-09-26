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
            <p>Sister’s Side is intended to be a resource guide to help Muslim women find suitable spaces to pray. In order to create a beneficial resource guide, all reviews must be constructive and focus on the physical space -- keeping in mind the provided criteria. We encourage members to include images of the sister’s side in their reviews, but to also avoid uploading images of masjids that may include any identifiable individuals and make sure to follow masjid rules on photography and videography. We have a zero-tolerance approach to any form of discrimination, bullying and harassment and anyone who would like to leave a review must adhere to the community guidelines. Reviews that violate the community guidelines will be subject to removal.</p>
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
