export const weekAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
};

export const today = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
};
