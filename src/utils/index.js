export const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
    });
    return formatter.format(price);
}