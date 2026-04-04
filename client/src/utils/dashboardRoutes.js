const normalizeRole = (role) => role?.trim()?.toLowerCase() ?? '';

export const getDashboardRouteByRole = (role) => {
    const normalizedRole = normalizeRole(role);

    if (normalizedRole === 'seller') {
        return '/seller';
    }

    if (normalizedRole === 'user' || normalizedRole === 'buyer') {
        return '/buyer';
    }

    return null;
};

export const getDashboardLabelByRole = (role) => {
    const normalizedRole = normalizeRole(role);

    if (normalizedRole === 'seller') {
        return 'Seller Dashboard';
    }

    if (normalizedRole === 'user' || normalizedRole === 'buyer') {
        return 'Buyer Dashboard';
    }

    return 'Dashboard';
};

export const getDashboardDescriptionByRole = (role) => {
    const normalizedRole = normalizeRole(role);

    if (normalizedRole === 'seller') {
        return 'Manage your listings';
    }

    if (normalizedRole === 'user' || normalizedRole === 'buyer') {
        return 'Browse properties and groups';
    }

    return 'Open your workspace';
};

export const hasRequiredRole = (role, allowedRoles = []) => {
    const normalizedRole = normalizeRole(role);

    return allowedRoles
        .map(normalizeRole)
        .includes(normalizedRole);
};

export const isDashboardPath = (pathname) => {
    return pathname.startsWith('/seller') || pathname.startsWith('/buyer');
};
