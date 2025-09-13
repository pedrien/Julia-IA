/**
 * Utility functions for date formatting across different platforms
 * Compatible with Mac, Windows, and Linux
 */

/**
 * Converts datetime-local input value to universal format YYYY-MM-DD HH:MM:SS
 * @param datetimeLocalValue - Value from datetime-local input (format: YYYY-MM-DDTHH:MM)
 * @returns Formatted string in YYYY-MM-DD HH:MM:SS format
 */
export const formatDateTimeLocalToUniversal = (datetimeLocalValue: string): string => {
  if (!datetimeLocalValue) return "";
  
  // Split the datetime-local value (YYYY-MM-DDTHH:MM)
  const [date, time] = datetimeLocalValue.split("T");
  
  // Ensure time has seconds (HH:MM:SS)
  const timeWithSeconds = time ? `${time}:00` : "00:00:00";
  
  return `${date} ${timeWithSeconds}`;
};

/**
 * Converts universal format to datetime-local input value
 * @param universalFormat - String in YYYY-MM-DD HH:MM:SS format
 * @returns Value compatible with datetime-local input
 */
export const formatUniversalToDateTimeLocal = (universalFormat: string): string => {
  if (!universalFormat) return "";
  
  // Replace space with T and remove seconds for datetime-local
  const [date, time] = universalFormat.split(" ");
  const timeWithoutSeconds = time ? time.substring(0, 5) : "00:00";
  
  return `${date}T${timeWithoutSeconds}`;
};

/**
 * Formats a Date object to universal format YYYY-MM-DD HH:MM:SS
 * @param date - Date object
 * @returns Formatted string in YYYY-MM-DD HH:MM:SS format
 */
export const formatDateToUniversal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Parses universal format string to Date object
 * @param universalFormat - String in YYYY-MM-DD HH:MM:SS format
 * @returns Date object
 */
export const parseUniversalToDate = (universalFormat: string): Date => {
  if (!universalFormat) return new Date();
  
  // Handle both space and T separators for flexibility
  const normalizedFormat = universalFormat.replace(' ', 'T');
  return new Date(normalizedFormat);
};

/**
 * Gets current date and time in universal format
 * @returns Current date/time in YYYY-MM-DD HH:MM:SS format
 */
export const getCurrentDateTimeUniversal = (): string => {
  return formatDateToUniversal(new Date());
};

/**
 * Validates if a string is in universal format
 * @param dateString - String to validate
 * @returns boolean indicating if format is valid
 */
export const isValidUniversalFormat = (dateString: string): boolean => {
  const universalRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return universalRegex.test(dateString);
};
