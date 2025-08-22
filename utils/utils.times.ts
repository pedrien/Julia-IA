/**
 * Converts a time duration string (e.g., "3m", "1h", "7d") to its equivalent value in seconds.
 *
 * This function takes an expiration string that specifies a time duration in minutes ('m'), hours ('h'),
 * or days ('d') and returns the corresponding duration in seconds.
 *
 * Example usage:
 * - "3m" will be converted to 180 seconds (3 * 60)
 * - "1h" will be converted to 3600 seconds (1 * 60 * 60)
 * - "7d" will be converted to 604800 seconds (7 * 24 * 60 * 60)
 *
 * @export
 * @param {string} expiresIn - The expiration duration string in the format of "<value><unit>".
 *                             The value can be an integer, and the unit can be 'm' (minutes),
 *                             'h' (hours), or 'd' (days).
 * @returns {number} - The equivalent duration in seconds.
 * @throws {Error} - Throws an error if the format of the expiration string is invalid.
 */
export function convertExpiresInToSeconds(expiresIn: string): number {
    const value = parseInt(expiresIn.slice(0, -1));
    const unit = expiresIn.slice(-1);

    switch (unit) {
        case "m":
            return value * 60;
        case "h":
            return value * 60 * 60;
        case "d":
            return value * 24 * 60 * 60;
        default:
            throw new Error(
                "Invalid expiration format. Use 'm' for minutes, 'h' for hours, or 'd' for days."
            );
    }
}
