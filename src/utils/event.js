import { EVENT_CATEGORY_OPTIONS } from "../constants/common";

export const getEventCategoryLabel = (category) => {
    return EVENT_CATEGORY_OPTIONS[category];
};

export const getEventImageUrl = (imageUrl) => {
    return imageUrl || "/public/virtual-arena-logo.png";
};
