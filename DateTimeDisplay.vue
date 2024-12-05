<template>
  <div>
    <DateTimeLabel :value="currentDate" />
    <DateTimeLabel :value="currentTime" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DateTimeLabel from './DateTimeLabel.vue';
import moment from 'moment'; 
// Import Moment.js
// npm install moment
export default defineComponent({
  components: {
    DateTimeLabel
  },
  data() {
    return {
      currentDate: '',
      currentTime: ''
    };
  },
  methods: {
    /**
     * Updates the current date and time using Moment.js.
     */
    updateDateTime() {
      const now = moment(); 
      
      this.currentDate = now.format('YYYY/MM/DD'); 
      this.currentTime = now.format('HH:mm:ss a');  //LTS if 12 hrs
    }
  },
  mounted() {
    this.updateDateTime(); 
    setInterval(this.updateDateTime, 1000); // Update every second
  },
  beforeDestroy() {
    clearInterval(this.interval); // Clear the interval when the component is destroyed
  }
});
</script>
