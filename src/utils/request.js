export const getRequestUrl = (baseUrl, url) => {
    return `${baseUrl}${url}`;
};

export const createEmptyFile = () => {
    return new Blob([new ArrayBuffer(0)]);
};

export const normalizeValue = (value) => {
    if (!value) {
        return null;
    }
    const normalized = value.trim();
    return normalized !== "" ?
        normalized :
        null;
};
