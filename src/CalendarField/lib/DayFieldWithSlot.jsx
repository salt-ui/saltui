import { prefixClass } from '../../Context';
import Datetime from '../../Datetime';
import YearField from './YearField';

class DayFieldWithSlot extends YearField {
  static displayName = 'DayFieldWithSlot';

  static getExtraClassNames() {
    return prefixClass('day-with-slot-calendar-field');
  }

  static getExtraProps() {
    return {
      columns: Datetime.YMD,
    };
  }
}

export default DayFieldWithSlot;
