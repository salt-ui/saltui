import { prefixClass } from '../../Context';
import Datetime from '../../Datetime';
import YearField from './YearField';

class DayFieldWithSlot extends YearField {
  static displayName = 'DayFieldWithSlot';
  /* eslint-disable class-methods-use-this */
  getExtraClassNames() {
    return prefixClass('day-with-slot-calendar-field');
  }

  getExtraProps() {
    return {
      columns: Datetime.YMD,
    };
  }
  /* eslint-enable class-methods-use-this */
}

export default DayFieldWithSlot;
