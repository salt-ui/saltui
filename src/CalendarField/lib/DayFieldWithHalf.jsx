import { prefixClass } from '../../Context';
import Datetime from '../../Datetime';
import YearField from './YearField';

class DayFieldWithHalf extends YearField {
  static displayName = 'DayFieldWithHalf';

  getExtraClassNames() {
    return prefixClass('day-with-half-calendar-field');
  }

  getExtraProps() {
    return {
      columns: Datetime.YMDT,
    };
  }
}

export default DayFieldWithHalf;
