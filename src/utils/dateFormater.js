export function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    // Calcular la diferencia en años, meses y días
    const yearsDifference = now.getFullYear() - date.getFullYear();
    const monthsDifference = now.getMonth() - date.getMonth();
    const daysDifference = Math.floor((now - date) / (1000 * 60 * 60 * 24)); // Diferencia en días

    // Ajustar la diferencia de meses considerando el día del mes
    const totalMonthsDifference =
        yearsDifference * 12 + monthsDifference - (now.getDate() < date.getDate() ? 1 : 0);

    if (totalMonthsDifference >= 12) {
        return `${yearsDifference} año${yearsDifference > 1 ? 's' : ''}`;
    } else if (totalMonthsDifference > 0) {
        return `${totalMonthsDifference} mes${totalMonthsDifference > 1 ? 'es' : ''}`;
    } else if (daysDifference >= 0) {
        return `${daysDifference} día${daysDifference !== 1 ? 's' : ''}`;
    } else {
        return 'Fecha inválida'; // Si la fecha es futura
    }
}