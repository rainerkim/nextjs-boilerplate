export function generateColorsFromDate(dateStr: string) {
    // dateStr format expected: yyyyMMdd
    // Remove dashes just in case
    const cleanDate = dateStr.replace(/-/g, '');
    const seed = parseInt(cleanDate, 10);

    if (isNaN(seed)) {
        return {
            background: 'bg-white',
            text: 'text-black',
            style: { backgroundColor: '#ffffff', color: '#000000' }
        };
    }

    // Simple hashing to get a stable hue
    // Use a prime number to scramble the bits a bit
    const hue = (seed * 1664525) % 360;

    // Generate pastel background
    const bgLightness = 92; // Very light
    const bgSaturation = 50;

    // Generate stronger text color (same hue or complementary)
    const textLightness = 20; // Dark
    const textSaturation = 60;

    const bgColor = `hsl(${hue}, ${bgSaturation}%, ${bgLightness}%)`;
    const textColor = `hsl(${hue}, ${textSaturation}%, ${textLightness}%)`;
    const borderColor = `hsla(${hue}, ${textSaturation}%, ${textLightness}%, 0.2)`;

    return {
        style: {
            backgroundColor: bgColor,
            color: textColor,
        },
        borderStyle: {
            borderColor: borderColor
        }
    };
}

export function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}
