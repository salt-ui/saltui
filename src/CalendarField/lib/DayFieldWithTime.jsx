import { prefixClass } from '../../Context';
import Datetime from '../../Datetime';
import YearField from './YearField';

class DayFieldWithTime extends YearField {
  static displayName = 'DayFieldWithTime';

  getExtraClassNames() {
    return prefixClass('day-width-time-calendar-field');
  }

  getExtraProps() {
    return {
      columns: Datetime.YMDWHM,
    };
  }
}

export default DayFieldWithTime;
