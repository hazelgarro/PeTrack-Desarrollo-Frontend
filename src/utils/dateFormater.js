export function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const yearsDifference = now.getFullYear() - date.getFullYear();
    const monthsDifference = now.getMonth() - date.getMonth();
    
    // Ajustar la diferencia de años si el mes actual es anterior al mes de la fecha dada
    const totalMonthsDifference = yearsDifference * 12 + monthsDifference;

    if (totalMonthsDifference >= 12) {
        return `${yearsDifference} año${yearsDifference > 1 ? 's' : ''}`;
    } else if (totalMonthsDifference > 0) {
        return `${monthsDifference} mes${monthsDifference > 1 ? 'es' : ''}`;
    } else {
        return 'Sin datos'; // Si la fecha es futura
    }
}