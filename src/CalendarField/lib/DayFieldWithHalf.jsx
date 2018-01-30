import { prefixClass } from '../../Context';
import Datetime from '../../Datetime';
import YearField from './YearField';

class DayFieldWithHalf extends YearField {
  static displayName = 'DayFieldWithHalf';
  /* eslint-disable class-methods-use-this */
  getExtraClassNames() {
    return prefixClass('day-with-half-calendar-field');
  }

  getExtraProps() {
    return {
      columns: Datetime.YMDT,
    };
  }
  /* eslint-enable class-methods-use-this */
}

export default DayFieldWithHalf;
