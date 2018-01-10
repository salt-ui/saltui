import { prefixClass } from '../../Context';
import Datetime from '../../Datetime';
import YearField from './YearField';

class MonthField extends YearField {
  static displayName = 'MonthField';

  static getExtraClassNames() {
    return prefixClass('month-calendar-field');
  }

  static getExtraProps() {
    return {
      columns: Datetime.YM,
    };
  }
}

export default MonthField;
