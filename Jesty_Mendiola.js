// DateTimeLabel.spec.js
import { shallowMount } from '@vue/test-utils';
import DateTimeLabel from './DateTimeLabel.vue'; // Adjust the path as necessary

describe('DateTimeLabel.vue', () => {
  it('renders the value prop correctly', () => {
    const value = '2023/10/01 12:34:56'; 
    const wrapper = mount(DateTimeLabel, {
      props: { value }
    });

    // Check if the rendered text matches the value prop
    expect(wrapper.find('h4').text()).toBe(value);
  });

  it('throws a warning if the value prop is not provided', () => {
    console.error = jest.fn(); // Mock console.error to suppress the warning in the test output
    mount(DateTimeLabel); // Mount without the required prop
    expect(console.error).toHaveBeenCalled(); // Check if console.error was called
  });
});

// ParentComponent.spec.js
import { shallowMount } from '@vue/test-utils';
import App from './App.vue'; 
import DateTimeDisplay from './DateTimeDisplay.vue'; 

describe('App.vue', () => {
  it('renders the DateTimeDisplay component', () => {
    const wrapper = shallowMount(App);

    // Check if the DateTimeDisplay component is rendered
    const dateTimeDisplay = wrapper.findComponent(DateTimeDisplay);
    expect(dateTimeDisplay.exists()).toBe(true); 
  });
});


// DateTimeDisplay.spec.js
import { shallowMount } from '@vue/test-utils';
import DateTimeDisplay from './DateTimeDisplay.vue'; 
import DateTimeLabel from './DateTimeLabel.vue'; 
import { TIME_DATA } from './time.js'; 

jest.mock('./DateTimeLabel.vue', () => ({
  name: 'DateTimeLabel',
  props: ['value'],
  template: '<div>{{ value }}</div>' // Mock implementation 
}));

describe('DateTimeDisplay.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DateTimeDisplay);
  });

  it('renders DateTimeLabel components with correct values', () => {
    const dateLabel = wrapper.findComponent(DateTimeLabel).at(0);
    const timeLabel = wrapper.findComponent(DateTimeLabel).at(1);

    expect(dateLabel.exists()).toBe(true);
    expect(timeLabel.exists()).toBe(true);
    expect(dateLabel.props('value')).toBe(TIME_DATA[0].data.currentDate);
    expect(timeLabel.props('value')).toBe(TIME_DATA[0].data.currentTime);
  });

  it('calls updateDateTime on mount', () => {
    const updateDateTimeSpy = jest.spyOn(wrapper.vm, 'updateDateTime');
    wrapper.vm.$mount(); // Manually trigger the mount lifecycle hook
    expect(updateDateTimeSpy).toHaveBeenCalled();
  });

  it('sets the correct initial date and time', () => {
    const currentDate = wrapper.vm.timeData[0].data.currentDate;
    const currentTime = wrapper.vm.timeData[0].data.currentTime;

    expect(currentDate).toMatch(/^\d{2}\/\d{2}\/\d{2}$/); // Check date format YY/MM/DD
    expect(currentTime).toMatch(/^\d{2}:\d{2}:\d{2}$/); // Check time format HH:MM:SS
  });
});