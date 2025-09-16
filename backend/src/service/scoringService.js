export const calculateRuleScore = (lead, offer) => {
    let score = 0;

    const decisionMakerRoles = ['CEO', 'Head of Growth', 'CTO'];
    const influencerRoles = ['Manager', 'Lead'];

    if (decisionMakerRoles.some(role => lead.role.includes(role))) {
        score += 20;
    } else if (influencerRoles.some(role => lead.role.includes(role))) {
        score += 10;
    }

    if (offer.ideal_use_cases.some(uc => lead.industry.includes(uc))) {
        score += 20;
    }

    const fields = ['name', 'role', 'company', 'industry', 'location', 'linkedin_bio'];
    const isComplete = fields.every(f => lead[f] && lead[f].trim() !== '');
    if (isComplete) score += 10;

    return score;
};
