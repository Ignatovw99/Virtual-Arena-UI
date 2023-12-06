export const getRequestUrl = (baseUrl, url) => {
    return `${baseUrl}${url}`;
};

export const createFormData = (objectData) => {
    const formData = new FormData();

    Object.entries(objectData)
        .map(([property, value]) => [property, normalizeValue(value)])
        .filter(([property, value]) => value)
        .forEach(([property, value]) => formData.append(property, value));

    return formData;
};

export const changeStateValueHandler = (event, setState) => {
    const inputField = event.target;
    if (!inputField) {
        return;
    }

    setState(state => ({
        ...state,
        [inputField.name]: inputField.value
    }));
};

export const createEmptyFile = () => {
    return new Blob([new ArrayBuffer(0)]);
};

export const normalizeValue = (value) => {
    if (!value) {
        return null;
    }
    if (typeof value !== "string") {
        return value;
    }
    const normalized = value.trim();
    return normalized !== "" ?
        normalized :
        null;
};
