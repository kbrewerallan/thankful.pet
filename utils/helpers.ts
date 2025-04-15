/**
 * Converts a temperature from Celsius to Fahrenheit.
 *
 * @param celsius - The temperature in Celsius to be converted.
 * @returns The equivalent temperature in Fahrenheit.
 */
export function celsiusToFahrenheit(celsius: string): number {
  const convertToFahrenheit = (celsius: number): number =>
    (celsius * 9) / 5 + 32;
  return convertToFahrenheit(parseFloat(celsius.replace(/[^\d.-]/g, "")));
}

/**
 * Converts a wind speed from miles per hour (mph) to kilometers per hour (km/h).
 *
 * @param mph - The wind speed in miles per hour to be converted.
 * @returns The equivalent wind speed in kilometers per hour.
 * */
export function convertMphToKmh(mph: string): number {
  const convertToKmh = (mph: number): number => mph * 1.60934;
  return convertToKmh(parseFloat(mph.replace(/[^\d.-]/g, "")));
}
