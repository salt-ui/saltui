import React from 'react';
import { shallow, mount } from 'enzyme';
import Datetime from '../Datetime';
import { getOptions } from '../util/date';
import { getMonthsByYear } from '../util/base';

describe('Datetime', () => {
  const monthIndex = 1;
  const dayIndex = 2;

  it('setup without crash', () => {
    const wrapper = shallow(<Datetime />);
    expect(wrapper).toBeTruthy();
  });

  test.skip('month gap, minDate and maxDate', () => {
    const minDate = new Date('2018-11-27').getTime();
    const maxDate = new Date('2018-12-07').getTime();
    const title = 'test minDate';
    const onChange = jest.fn();
    const wrapper = mount(<Datetime
      columns={Datetime.YMD}
      minDate={minDate}
      maxDate={maxDate}
      title={title}
      onChange={onChange}
    />);
    expect(wrapper.find('Slot').props().title).toEqual(title);
    expect(wrapper.find('Slot').props().value).toBeInstanceOf(Array);

    const dayArr = wrapper.find('Slot').props().data[dayIndex];
    expect(dayArr[0].value).toBe(1);
    expect(dayArr[dayArr.length - 1].value).toBe(7);

    const newValue = [
      { value: 2018, text: '2018年' },
      { value: 10, text: '11月' },
      { value: 30, text: '30日' },
    ];
    wrapper.instance().handleChange(newValue, 1);
    const newData = wrapper.instance().state.data;
    expect(newData[dayIndex].length).toBe(3);
    expect(newData[dayIndex][0].value).toBe(28);
    expect(newData[dayIndex][newData[dayIndex].length - 1].value).toBe(30);
  });

  test('year gap, minDate and maxDate', () => {
    const minDate = new Date('2018-12-27').getTime();
    const maxDate = new Date('2019-01-07').getTime();
    const title = 'test minDate';
    const onChange = jest.fn();
    const wrapper = mount(<Datetime
      columns={Datetime.YMD}
      minDate={minDate}
      maxDate={maxDate}
      title={title}
      onChange={onChange}
    />);
    expect(wrapper.find('Slot').props().title).toEqual(title);
    expect(wrapper.find('Slot').props().value).toBeInstanceOf(Array);

    const dayArr = wrapper.find('Slot').props().data[dayIndex];
    expect(dayArr[0].value).toBe(28);
    expect(dayArr[dayArr.length - 1].value).toBe(31);

    const newValue = [
      { value: 2019, text: '2019年' },
      { value: 0, text: '01月' },
      { value: 5, text: '05日' },
    ];
    wrapper.instance().handleChange(newValue, 0);
    const newData = wrapper.instance().state.data;
    expect(newData[monthIndex].length).toBe(1);
    expect(newData[monthIndex][0].value).toBe(0);
    expect(newData[dayIndex].length).toBe(7);
    expect(newData[dayIndex][0].value).toBe(1);
    expect(newData[dayIndex][newData[dayIndex].length - 1].value).toBe(7);
  });
});

describe('getOptions', () => {
  const defaultProps = {
    className: '',
    locale: 'zh-cn',
    columns: 'YMD',
    onConfirm: _ => _,
    onCancel: _ => _,
    onChange: _ => _,
    slotRef: _ => _,
    minuteStep: 1,
    disabledDate: () => [],
    title: undefined,
    value: undefined,
    confirmText: undefined,
    cancelText: undefined,
    disabledTime: undefined,
  };

  test('month gap', () => {
    const minDate = new Date('2018-11-27').getTime();
    const maxDate = new Date('2018-12-07').getTime();
    const props = {
      minDate,
      maxDate,
      ...defaultProps,
    };

    const monthIndex = 1;
    const options = getOptions(undefined, props);
    const monthArr = options[monthIndex];
    expect(monthArr.length).toBe(2);
    expect(monthArr[0].value).toBe(10);
    expect(monthArr[1].value).toBe(11);
  });

  test('year gap', () => {
    const minDate = new Date('2018-12-27').getTime();
    const maxDate = new Date('2019-01-07').getTime();
    const props = {
      minDate,
      maxDate,
      ...defaultProps,
    };

    const monthIndex = 1;
    let options = getOptions(undefined, props);
    let monthArr = options[monthIndex];
    expect(monthArr[0].value).toBe(11);

    options = getOptions({ value: new Date('2019-01-02').getTime() }, props);
    monthArr = options[monthIndex];
    expect(monthArr[0].value).toBe(0);
  });
});

describe('getMonthsByYear', () => {
  test('month gap', () => {
    const minDate = new Date('2018-11-27').getTime();
    const maxDate = new Date('2018-12-07').getTime();

    const monthArr = getMonthsByYear({ minDate, maxDate, year: 2018 });
    expect(monthArr).toBeInstanceOf(Array);
    expect(monthArr.length).toBe(2);
    expect(monthArr[0].value).toBe(10);
    expect(monthArr[1].value).toBe(11);
  });

  test('year gap', () => {
    const minDate = new Date('2018-12-27').getTime();
    const maxDate = new Date('2019-01-07').getTime();

    let monthArr = getMonthsByYear({ minDate, maxDate, year: 2018 });
    expect(monthArr).toBeInstanceOf(Array);
    expect(monthArr.length).toBe(1);
    expect(monthArr[0].value).toBe(11);

    monthArr = getMonthsByYear({ minDate, maxDate, year: 2019 });
    expect(monthArr).toBeInstanceOf(Array);
    expect(monthArr.length).toBe(1);
    expect(monthArr[0].value).toBe(0);
  });
});
