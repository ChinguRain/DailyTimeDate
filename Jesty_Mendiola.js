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

// DateTimeDisplay.spec.js
import { shallowMount } from '@vue/test-utils';
import DateTimeDisplay from '@/components/DateTimeDisplay.vue'; 
import moment from 'moment';

jest.mock('moment'); // Mock moment.js

describe('DateTimeDisplay', () => {
  let wrapper: any;

  beforeEach(() => {
    // Set up the mock for moment
    (moment as jest.Mock).mockImplementation(() => ({
      format: jest.fn((formatString: string) => {
        if (formatString === 'YYYY/MM/DD') {
          return '2023/10/05'; // Mocked date
        }
        if (formatString === 'HH:mm:ss a') {
          return '14:30:00 PM'; // Mocked time
        }
        return '';
      }),
    }));

    // Shallow mount the component
    wrapper = shallowMount(DateTimeDisplay);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('renders DateTimeLabel with current date and time', () => {
    // Check if DateTimeLabel components are rendered with the correct values
    const dateLabel = wrapper.findComponent({ name: 'DateTimeLabel' });
    const timeLabel = wrapper.findAllComponents({ name: 'DateTimeLabel' }).at(1);

    expect(dateLabel.props().value).toBe('2023/10/05');
    expect(timeLabel.props().value).toBe('14:30:00 PM');
  });

  it('updates currentDate and currentTime every second', async () => {
    jest.useFakeTimers(); // Use fake timers

    // Call the updateDateTime method directly
    wrapper.vm.updateDateTime();
    expect(wrapper.vm.currentDate).toBe('2023/10/05');
    expect(wrapper.vm.currentTime).toBe('14:30:00 PM');

    // Simulate the passage of time
    jest.advanceTimersByTime(1000); // Fast-forward 1 second

    // Call the updateDateTime method again
    wrapper.vm.updateDateTime();
    expect(wrapper.vm.currentDate).toBe('2023/10/05');
    expect(wrapper.vm.currentTime).toBe('14:30:00 PM');
  });
});
