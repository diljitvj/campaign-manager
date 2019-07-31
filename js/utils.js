const Utils = {
  // Formats the date time from Javascript Date object
  formatTime: date => {
    const dateString = date.toDateString();
    const timeString = date.toLocaleTimeString();

    const [HH, mm] = timeString.split(":");

    const amOrPm = HH > 11 ? "pm" : "am";
    const hh = HH > 12 ? HH - 12 : HH;

    return `${dateString} ${hh}:${mm} ${amOrPm}`;
  },

  // Creates a debounced function
  debounce: (func, interval) => {
    let timeout;
    return function() {
      const context = this,
        args = arguments;
      const later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, interval || 300);
    };
  }
};
