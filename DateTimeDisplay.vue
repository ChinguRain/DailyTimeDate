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
     * Updates the current date and time.
     */
    updateDateTime() {
      const now = new Date();
      
      // Format date as YY/MM/DD
      const year = String(now.getFullYear()).slice(-2); 
      const month = String(now.getMonth() + 1).padStart(2, '0'); 
      const day = String(now.getDate()).padStart(2, '0'); 
      this.timeData[0].data.currentDate = `${year}/${month}/${day}`; 

      // Format time in military (24-hour) format with seconds
      const hours = String(now.getHours()).padStart(2, '0'); 
      const minutes = String(now.getMinutes()).padStart(2, '0'); 
      const seconds = String(now.getSeconds()).padStart(2, '0'); 
      this.timeData[0].data.currentTime = `${hours}:${minutes}:${seconds}`; 

      // this.currentDate = now.toLocaleDateString(); // Update the current date
      // this.timeData[0].data.currentTime = now.toLocaleTimeString(); // Update the current time
    }
  },
  mounted() {
    this.updateDateTime(); // Set the initial date and time
    this.interval = setInterval(this.updateDateTime, this.timeData[0].directives.updateInterval); // Update based on the interval
    //this.interval = setInterval(this.updateDateTime, 1000); 
  },
  beforeDestroy() {
    clearInterval(this.interval); // Clear the interval when the component is destroyed
  }
});
</script>