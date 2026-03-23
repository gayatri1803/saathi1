export const SCHEMES_DB = [
    {
        id: 101,
        name: 'Niramaya Health Insurance',
        amount: '₹1 Lakh cover',
        tag: 'Health',
        category: 'Central',
        minAge: 0,
        maxAge: 120,
        incomeLimits: ['below_1', '1_to_3'],
        targetDisabilities: ['cognitive', 'multiple'],
        requiresUDID: true,
        desc: 'Comprehensive health insurance for persons with Autism, Cerebral Palsy, Mental Retardation and Multiple Disabilities.'
    },
    {
        id: 102,
        name: 'Top Class Education Scholarship',
        amount: 'Full Tuition',
        tag: 'Education',
        category: 'Central',
        minAge: 18,
        maxAge: 30,
        incomeLimits: ['below_1', '1_to_3', '3_to_6'],
        targetDisabilities: ['all'],
        requiresUDID: true,
        desc: 'Financial assistance for pursuing graduate and postgraduate programs.'
    },
    {
        id: 201,
        name: 'ADIP Scheme (Assistive Devices)',
        amount: '₹10,000 max',
        tag: 'Equipment',
        category: 'Central',
        minAge: 0,
        maxAge: 120,
        incomeLimits: ['below_1', '1_to_3'],
        targetDisabilities: ['physical', 'visual', 'hearing', 'speech'],
        requiresUDID: false,
        desc: 'Assistance to disabled persons in purchasing/fitting of aids and appliances.'
    },
    {
        id: 202,
        name: 'Indira Gandhi Disability Pension',
        amount: '₹300/mo',
        tag: 'Pension',
        category: 'Central',
        minAge: 18,
        maxAge: 79,
        incomeLimits: ['below_1'],
        targetDisabilities: ['all'],
        severity: 'Full',
        requiresUDID: true,
        desc: 'Financial assistance to persons with severe or multiple disabilities.'
    },
    {
        id: 301,
        name: 'Divyangjan Swavalamban Yojana',
        amount: 'Loan up to 50L',
        tag: 'Business',
        category: 'Central',
        minAge: 18,
        maxAge: 60,
        incomeLimits: ['below_1', '1_to_3', '3_to_6', 'above_6'],
        targetDisabilities: ['all'],
        requiresUDID: true,
        desc: 'Concessional credit for economic and developmental activities.'
    },
    {
        id: 302,
        name: 'Free Transport Concession',
        amount: '75% discount',
        tag: 'Transport',
        category: 'Central',
        minAge: 0,
        maxAge: 120,
        incomeLimits: ['below_1', '1_to_3', '3_to_6', 'above_6'],
        targetDisabilities: ['physical', 'visual', 'cognitive'],
        requiresUDID: true,
        desc: 'Concession in railway fares for persons with disabilities and escorts.'
    },
    {
        id: 401,
        name: 'State Disability Pension (Maharashtra)',
        amount: '₹1,000/mo',
        tag: 'Pension',
        category: 'State',
        state: 'Maharashtra',
        minAge: 18,
        maxAge: 65,
        incomeLimits: ['below_1', '1_to_3'],
        targetDisabilities: ['all'],
        requiresUDID: true,
        desc: 'Monthly financial assistance provided by the Maharashtra State Government.'
    }
];

export const calculateMatchScore = (scheme, userProfile) => {
    let score = 100;

    // Age Evaluation
    if (userProfile.age) {
        if (userProfile.age < scheme.minAge || userProfile.age > scheme.maxAge) return 0;
    }

    // Income Evaluation
    if (userProfile.income && scheme.incomeLimits && scheme.incomeLimits.length > 0) {
        if (!scheme.incomeLimits.includes(userProfile.income)) return 0;
    }

    // State Evaluation
    if (scheme.category === 'State' && scheme.state) {
        if (userProfile.state !== scheme.state) return 0;
    }

    // Severity Evaluation
    if (scheme.severity === 'Full' && userProfile.severity === 'Partial') return 0;

    // Disability Typology Evaluation
    if (scheme.targetDisabilities && !scheme.targetDisabilities.includes('all')) {
        let matches = false;
        if (userProfile.disabilityTypes && userProfile.disabilityTypes.length > 0) {
            matches = userProfile.disabilityTypes.some(d => scheme.targetDisabilities.includes(d));
        }
        if (!matches) {
            score -= 40;
        } else {
            // High confidence match
            score += 5;
        }
    }

    // UDID Evaluation (Penalize but don't strictly disqualify unless mandatory)
    // If the person hasn't applied for a UDID, finding them UDID-mandatory schemes is frustrating.
    if (scheme.requiresUDID) {
        if (userProfile.udid === 'No') score -= 30;
        if (userProfile.udid === "Don't know") score -= 25;
        if (userProfile.udid === 'Applied') score -= 10;
    }

    // Normalize score to maximum of 99% (reserving 100% for perfect certified profiles)
    let finalScore = Math.max(0, Math.min(99, score));
    return finalScore;
};

export const getRecommendations = (userProfile) => {
    return SCHEMES_DB.map(scheme => {
        const match = calculateMatchScore(scheme, userProfile);
        return { ...scheme, match };
    })
        .filter(s => s.match > 0)
        .sort((a, b) => b.match - a.match);
};
