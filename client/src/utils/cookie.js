import Cookies from 'js-cookie';

export const getCookie = (name) => {
    // Try js-cookie first
    let value = Cookies.get(name);
    if (value) return value;

    // Manual parsing fallback
    try {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
            // Also check for PascalCase if the search was for lowercase
            const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
            if (cookie.startsWith(pascalName + '=')) {
                return cookie.substring(pascalName.length + 1);
            }
        }
    } catch (e) {
        console.error(`Error parsing cookie ${name}:`, e);
    }
    
    return null;
};

export const setCookie = (name, value, options = {}) => {
    const defaultOptions = { expires: 7, path: '/' };
    Cookies.set(name, value, { ...defaultOptions, ...options });
};

export const removeCookie = (name, options = {}) => {
    const defaultOptions = { path: '/' };
    Cookies.remove(name, { ...defaultOptions, ...options });
};






















