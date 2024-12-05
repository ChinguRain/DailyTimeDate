const TIME_DATA = [
    {
      data: {
        currentDate: '', // This will be updated dynamically
        currentTime: ''  // This will be updated dynamically
      },
      directives: {
        class: "time-display",
        format: "YY/MM/DD HH:MM:SS", // You can specify the format here
        updateInterval: 1000 // Update every second
      }
    }
  ];
  
  export { TIME_DATA };