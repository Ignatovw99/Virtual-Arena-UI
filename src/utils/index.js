import moment from "moment";

export const formatDate = (dateString, format) => {
    return moment(dateString)
        .format(format);
};
