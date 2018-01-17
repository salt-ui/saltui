import { prefixClass } from '../../Context';
import Datetime from '../../Datetime';
import YearField from './YearField';

class DayFieldWithTime extends YearField {
  static displayName = 'DayFieldWithTime';
  /* eslint-disable class-methods-use-this */
  getExtraClassNames() {
    return prefixClass('day-width-time-calendar-field');
  }

  getExtraProps() {
    return {
      columns: Datetime.YMDWHM,
    };
  }
  /* eslint-enable class-methods-use-this */
}
export default DayFieldWithTime;
