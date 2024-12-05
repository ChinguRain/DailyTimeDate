<template>
    <div>
      <DateTimeLabel :value="timeData[0].data.currentDate" />
      <DateTimeLabel :value="timeData[0].data.currentTime" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import DateTimeLabel from './DateTimeLabel.vue';
  import { TIME_DATA } from './time.js'; 
  import moment from 'moment'; 
  // Import Moment.js
  // npm install moment
  export default defineComponent({
    components: {
      DateTimeLabel
    },
    data() {
      return {
        timeData: TIME_DATA 
      };
    },
    methods: {
      /**
       * Updates the current date and time using Moment.js.
       */
      updateDateTime() {
        const now = moment(); // Get the current time using Moment.js
        
        // Format date as YY/MM/DD
        this.timeData[0].data.currentDate = now.format('YY/MM/DD'); 
  
        // Format time in military (24-hour) format with seconds
        this.timeData[0].data.currentTime = now.format('HH:mm:ss a'); //LTS if 12 hrs
      }
    },
    mounted() {
      this.updateDateTime(); // Set the initial date and time
      this.interval = setInterval(this.updateDateTime, this.timeData[0].directives.updateInterval); // Update based on the interval
    },
    beforeDestroy() {
      clearInterval(this.interval); // Clear the interval when the component is destroyed
    }
  });
  </script>
