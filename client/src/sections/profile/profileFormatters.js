export const formatCurrency = (value) => {
    if (value === null || value === undefined) {
        return 'Rs 0';
    }

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatCompactDate = (value) => {
    if (!value) {
        return 'Not available';
    }

    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
};

export const formatMonthYear = (value) => {
    if (!value) {
        return 'Recently joined';
    }

    return new Intl.DateTimeFormat('en-IN', {
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
};

export const relativeTimeFromNow = (value) => {
    if (!value) {
        return 'Recently';
    }

    const now = new Date();
    const target = new Date(value);
    const diffMs = target.getTime() - now.getTime();
    const diffSeconds = Math.round(diffMs / 1000);
    const ranges = [
        { unit: 'year', seconds: 60 * 60 * 24 * 365 },
        { unit: 'month', seconds: 60 * 60 * 24 * 30 },
        { unit: 'week', seconds: 60 * 60 * 24 * 7 },
        { unit: 'day', seconds: 60 * 60 * 24 },
        { unit: 'hour', seconds: 60 * 60 },
        { unit: 'minute', seconds: 60 },
    ];

    for (const range of ranges) {
        if (Math.abs(diffSeconds) >= range.seconds) {
            const valueForUnit = Math.round(diffSeconds / range.seconds);
            return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(valueForUnit, range.unit);
        }
    }

    return 'Just now';
};

export const getInitials = (name) => {
    if (!name) {
        return 'TB';
    }

    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
};

export const getStatusClasses = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === 'confirmed' || normalizedStatus === 'open') {
        return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    }

    if (normalizedStatus === 'pending' || normalizedStatus === 'full') {
        return 'bg-amber-50 text-amber-700 border border-amber-100';
    }

    return 'bg-slate-100 text-slate-700 border border-slate-200';
};
