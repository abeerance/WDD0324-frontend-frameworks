"use strict";
function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}
function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}
/*
@param originalValue - Original temperature value
@param convertedValue - Converted temperature value
@param fromUnit - Original temperature unit
@param toUnit - Convert temperature unit
*/
function displayConversion(originalValue, convertedValue, fromUnit, toUnit) {
    console.log(`${originalValue} degrees ${fromUnit} is equal to ${convertedValue.toFixed(1)} degrees ${toUnit}`);
}
function runTest() {
    console.log("Temperature Converter");
    console.log("--------------------");
    // Test case 1: Convert 0°C to Fahrenheit
    const freezingCelsius = 0;
    const freezingFahrenheit = celsiusToFahrenheit(freezingCelsius);
    displayConversion(freezingCelsius, freezingFahrenheit, "Celsius", "Fahrenheit");
    // Test case 2: Convert 100°C to Fahrenheit
    const boilingCelsius = 100;
    const boilingFahrenheit = celsiusToFahrenheit(boilingCelsius);
    displayConversion(boilingCelsius, boilingFahrenheit, "Celsius", "Fahrenheit");
    // Test case 3: Convert 32°F to Celsius
    const freezingPointF = 32;
    const freezingPointC = fahrenheitToCelsius(freezingPointF);
    displayConversion(freezingPointF, freezingPointC, "Fahrenheit", "Celsius");
    // Test case 4: Convert 98.6°F (body temperature) to Celsius
    const bodyTempF = 98.6;
    const bodyTempC = fahrenheitToCelsius(bodyTempF);
    displayConversion(bodyTempF, bodyTempC, "Fahrenheit", "Celsius");
}
// runTest();
