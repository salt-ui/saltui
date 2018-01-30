import { prefixClass } from '../../Context';
import Datetime from '../../Datetime';
import YearField from './YearField';

class MonthField extends YearField {
  static displayName = 'MonthField';
  /* eslint-disable class-methods-use-this */
  getExtraClassNames() {
    return prefixClass('month-calendar-field');
  }

  getExtraProps() {
    return {
      columns: Datetime.YM,
    };
  }
  /* eslint-enable class-methods-use-this */
}

export default MonthField;
