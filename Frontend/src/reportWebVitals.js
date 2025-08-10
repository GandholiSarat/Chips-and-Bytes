/**
 * @file reportWebVitals.js
 * @description
 * Utility for measuring and reporting web vitals performance metrics.
 * Uses the web-vitals library to collect metrics and passes them to a callback.
 * 
 * @param {Function} onPerfEntry - Callback function to handle performance entries.
 */

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
