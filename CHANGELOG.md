

## 3.8.37 / 2018-05-17

* `fix`: `RefreshControl` enable GPU acceleration in area-control to fix render bug in iOS


## 3.8.36 / 2018-05-17

* `fix`: `Calendar` show slideUp calendar when native keyboard still exists will cause wrong panel height
* `feat`: `Dialog` change locale value from zh_CN to zh-cn
* `fix`: `RefreshControl` refresh loading will show on mount
* `fix`: `ScrollView` missing method `tryEmitScrollEvent`

## 3.8.35 / 2018-05-16

* `fix`: `ActionSheet` cannot be closed programmatically.


## 3.8.34 / 2018-05-15

* `docs`: `Tab` activeKey should not be number
* `fix`: `CascadeSelectField` right arrow is not shown

## 3.8.33 / 2018-05-11

* `docs`: `PickerField` remove useless props
* `fix`: `EmployeeField` compatible for old native loader

## 3.8.31 / 2018-05-07

* `feat`: `Field` show error message in tip box.
* `fix`: `CitySelectField` wrong text

## 3.8.30 / 2018-05-04

* `fix`: `CascadeSelect` wrong cancel text
* `feat`: `Toast` different default hide duration when type is different.

## 3.8.29 / 2018-05-03

* `style`: `PhotoField` `EmployeeField` render action & placeholder into label right container.
* `feat`: `Field` hide field-box in vertical layout if there's no need to show.
* `feat`: `EmployeeField` support Alinw app container (using enableNW)
* `fix`: `ScrollList` flickering when `noMoreDataTip` is changed to true.
* `fix`: `ScrollList` only render EmptyContentImage if noDataImage is not empty.

## 3.8.28 / 2018-04-28

* `performance`: `RefreshControl` improve pull to refresh performance if in a scrollable container

## 3.8.25 / 2018-04-27

* `fix`: `SearchBar` locale bug when locale is zh_CN

## 3.8.24 / 2018-04-27

* `fix`: `ScrollList` `noDataImage` fail to work
* `fix`: `CheckboxField` Select layer checkbox icon color does not follow theme color

## 3.8.23 / 2018-04-25

* `fix`: `ScrollView` trigger tryEmitScrollEvent unexpectedly

## 3.8.22 / 2018-04-24

* `feat`: `DateTime` change minDate & maxDate to `1900-01-01` & `2051-01-01`

## 3.8.21 / 2018-04-23

* `feat`: `PickerField` Search Result panel style change
* `feat`: `PickerField` remove `cancelText`, `searchText`, add `locale`.
* `feat`: `Utils` add `getLocale` method to uniform locale(zh-cn/zh_CN)
* `feat`: `Avatar` filter unexpected characters

## 3.8.19 / 2018-04-19

* `fix`: `Refreshcontrol` duplicate drag binding

## 3.8.18 / 2018-04-19

* `fix`: `Calendar` slideUp popup fail to close when page is changed in single page app

## 3.8.16 / 2018-04-19

* `fix`: `Calendar` selected weekend day style

## 3.8.15 / 2018-04-17

* `fix`: `EmployeeField` empty tip will be rendered


## 3.8.14 / 2018-04-17

* `fix`: `TabBar` fixed position render bug in iOS
* `fix`: `CascadeSelectField` support `locale`

## 3.8.13 / 2018-04-16

* `feat`: `Calendar` style adjustment

## 3.8.12 / 2018-04-12

* `feat`: `Slot`, `Calendar`, `CascadeSelectField` header font-size adjustment. 

## 3.8.11 / 2018-04-12

* `feat`: `Refreshcontrol` add `needsclick` to the content area.


## 3.8.10 / 2018-04-09

* `fix`: `List` isDelete fail to work
* `feat`: `Refreshcontrol` performance improvement

## 3.8.9 / 2018-04-08

* `fix`: TabBar style bug if center icon is not set

## 3.8.7 / 2018-04-08

* `feat`: `Toast` change loading icon
* `fix`: `PickerField` Panel fail to scroll


## 3.8.6 / 2018-04-03

* `feat`: `Employee` add `needsclick` className to the active element


## 3.8.5 / 2018-04-03

* `fix`: `ImageViewer` fail to stop body scrolling when it's shown
* `fix`: `CascadeSelectField` options cannot be shown if columns is set `[]`
* `feat`: `Calendar` improve scroll experience in iOS

## 3.8.4 / 2018-04-02

* `feat`: `Slot` disable iscroll's bounce to improve performance 


## 3.8.3 / 2018-04-02

* `fix`: `PhotoField` empty img will be seen in the `View Larger Image` mode

## 3.8.2 / 2018-03-30

* `feat`: `Button` onClick will not be called if button's loading is true

## 3.8.1 / 2018-03-30

* `fix`: `ICON` icon size bug

## 3.8.0/ 2018-03-29

* `style`: orange brand color change & add new theme blue, green
* `style`: new color generation formula
* `fix`: `TabBar` ItemMore fail to pass right params to onChange


## 3.7.10 / 2018-03-28

* `fix`: `Datetime` missing month suffix if disabledDate is enabled

## 3.7.9 / 2018-03-28

* `fix`: `Dialog`, `Popup` fail to stop body scrolling when it's shown

## 3.7.8 / 2018-03-27

* `fix`: `CalendarField` normalize onOk's value format.
* `fix`: `CalendarField` android dingtalk bug if value is null

## 3.7.7 / 2018-03-26

* `fix`: `NumberField` formatOnBlur bug

## 3.7.6 / 2018-03-25

* `fix`: `CalendarField` replace `object.assign` with `spread`
* `fix`: `DateTime` wrong value if column is `Y`
* `fix`: `DateTime` confirm without any scrolling return wrong value if the value is disabled
* `fix`: `DateTime` wrong initial options if minDate or maxDate is set

## 3.7.5 / 2018-03-23

* `fix`: `NavBar` arrow style
* `fix`: `CheckboxField` `NavBar` incorrect salt-icon import.


## 3.7.4 / 2018-03-22

* `feat`: `NumberField` support `inputType`

## 3.7.3 / 2018-03-22

* `feat`: `NumberField` support `formatOnBlur`

## 3.7.2 / 2018-03-19

* `fix`: Popup did not remove dom node when unmount
* `fix`: drawer/foldablePane React 15.x compatible
* `fix`: PhotoField did not remove imageViewer when unmount
* `doc`: ImageViewer remove api
* `change`: SelectField receive layout prop
* `change`: `FhotoField` total count in uploading and failed files.

## 3.7.1 / 2018-03-13

* `fix`: ScrollList onFetch can be fired only in none-loading state.

## 3.7.0 / 2018-03-07

* `feat`: RadioField support `popup` mode
* `fix`: CascadeSelectField value is wrong if columns data is changed.

## 3.6.4 / 2018-02-26

* `feat`: PhotoField support new prop `onImagePreview`

## 3.6.3 / 2018-02-24

* `fix`: DatetimeField placeholder & value will show in the meantime.

## 3.6.2 / 2018-02-23

* `fix`: TextField label & placeholder are misaligned.

## 3.6.0 / 2018-02-22

* `feat`: PickerField style optimization.
* `feat`: PickerField support grouping & grouping indicator
* `feat`: CitySelectField refactor with CascadeSelectField & PickerField

## 3.5.23 / 2018-02-22

* `feat`: Datetime logic optimization when handling disabledDate

## 3.5.22 / 2018-02-22

* `feat`: Action/Popover/Popup/Drawer/CascadeSelect style optimization
* `fix`: EmployeeField `transToValue` method not found.
* `feat`: EmployeeField readOnly when not in dingtalk

## 3.5.21 / 2018-02-06

* `fix`: PhotoField add default accept to prevent user upload wrong files to a certain extent.

## 3.5.20 / 2018-02-06

* `fix`: Toast fail to call `props.onDidHide`

## 3.5.19 / 2018-02-01

* `fix`: Datetime value processing bug when date is 31

## 3.5.18 / 2018-01-31

* `changed`: Dialog's z-index is changed to be equal to Toast/Popup's

## 3.5.17 / 2018-01-31

* `fix`: Gallery will slide to the item whose index is `props.active` if re-render


## 3.5.16 / 2018-01-30

* `feat` TextField use multiline in readOnly mode

## 3.5.15 / 2018-01-30

* `feat`: unmount Toast when hiden
* `feat`: SearchBar will cancel another `doSeacrh` if keycode is enter
* `fix`: Datetime slot will go to the first value if disabledDate is set
* `fix`: Datetime Feb should only have 29 days at most.

## 3.5.14 / 2018-01-26

* `fix`: Field label cannot show 6 chinese words in a line in iPhone
* `style`: change vertical field-box layout

## 3.5.13 / 2018-01-25

* `feat`: DateTimeField only support horizontal layout
* `fix`: DateTimeField Icon

## 3.5.12 / 2018-01-24

* `feat`: Some Field (Select, NumberPicker, Rate, CitySelect, Switch) which do not fit vertical layout only support horizontal layout

* `style` adjust field vertical layout

## 3.5.10 / 2018-01-24

* `feat` change readOnly text color to `dark-2`

## 3.5.9 / 2018-01-23

* `feat` TextareaField hide scrollBar

## 3.5.8 / 2018-01-23
* `feat` PhotoField support placeholder
* `feat` EmployeeField hide icon in readOnly mode
* `feat` EmployeeField & PhotoField only support horizontal layout

## 3.5.5
* `fix` group wrong style
* `feat` generate atom css class like `t-color-brand-primary` 

## 3.5.4
* `fix`: none-uniform readonly color
* `fix`: none-uniform placeholder color

## 3.5.3
* `fix`: employee field placeholder style

## 3.5.2
* `fix`: Context Mixin error

## 3.5.1
* `fix`: TabBar border top style

## 3.5.0
* `fix`: Field Style improvement

## 3.4.6 / 2018-01-16
* `fix`: Datetime output timestamp should be set `0h:0m:0s`

## 3.4.5 / 2018-01-10
* `fix`: incorrect DateTime getOptions output

## 3.4.4 / 2018-01-08
* `fix`: DateTimeField display value bug

## 3.4.3 / 2018-01-08
* `fix`: PhotoFieldItem filename

## 3.4.2 / 2018-01-08

* `fix`: DateTime duplicate value calculation
* `feat`: React 15.x compatible

## 3.4.1. / 2018-01-05

* `fix`: missing Datetime method

## 3.4.0 / 2018-01-05

* `feat`: Datetime support prop `disabledDate`

## 3.3.6 / 2018-01-03

* `feat` React 15.x compatible for ActionSheet, Button, Avatar, Badge, Boxs, Calendar, Group
* `fix`: SelectField value is not handled correctly in `componentWillReceiveProps`

## 3.3.5 / 2017-12-28

* `change`: all commonjs module are transformed to es6 module
* `fix`: RadioField check icon style


## 3.3.4 / 2017-12-27

* `fix`: vendor prefix typo in Badge

## 3.3.3 / 2017-12-27

* `fix`: SearchBar can doSearch when value is empty string.

## 3.3.2 / 2017-12-20

* `fix`: Slot lastChoose fail to be updated after props.value change.

## 3.3.1 / 2017-12-20

* `fix`: Slot.formatDataValue fail to return formatted value

## 3.3.0 / 2017-12-18

* `feat`: TabBar iphoneX compatible 
* `feat`: Tab force browser repaint when component mount

## 3.2.0 / 2017-12-18

* `feat`: Crumb support new prop `separator`

## 3.1.33 / 2017-12-15

* `fix`: scrolling to the window's end when toast is shown.

## 3.1.32 / 2017-12-14

* `fix`: scrolling to the window's end when popup is shown.

## 3.1.30 / 2017-12-08

* `fix`: SelectField Icon missing
* `feat`: SearchBar support `exitAfterEnter`

## 3.1.29 / 2017-12-04

* `doc`: remove tingle keyword from docs

## 3.1.28 / 2017-12-01

* `fix`: cancel button style bug if locale is en_US

## 3.1.26 / 2017-12-01

* `feat`: remove input change trim

## 3.1.25 / 2017-11-29

* `fix`: CheckboxField icon style

## 3.1.24 / 2017-11-29

* `fix`: queueCapacity logic error

## 3.1.23 / 2017-11-29

* `fix`: remove searchBar low performance animation.

## 3.1.22 / 2017-11-29

* `fix`: searchBar active animation in iphone

## 3.1.21 / 2017-11-28

* `fix`: typo in PhotoField

## 3.1.20 / 2017-11-28

* `fix`: CitySelectField readOnly fails to work
* `fix`: `SrollList` only load one page after refresh
* `refactor`: rename InfiniteScroll's getRef to getDOMNode

## 3.1.19 / 2017-11-28

* `fix`: umd build webpack wrong externals  
* `change`: git igonre build folder & `dev/index.jsx`

## 3.1.18 / 2017-11-24

* `fix`: searchbar placeholder style bug when search is active.
* `fix`: PhotoField readOnly fails to work

## 3.1.17 / 2017-11-23

* `fix`: CascadeSelect bug caused by duplicated defaultProps declaration. 

## 3.1.16 / 2017-11-22

* `doc`: remove useless link
* `refactor`: eslint source code (20%)

## 3.1.15 / 2017-11-15

* `fix`: `Slot` onConfirm pass wrong value

## 3.1.14 / 2017-11-15

* `fix`: `CascadeSelect` options can not be scrolled

## 3.1.13 / 2017-11-14

* `fix`: `Tab` showAll panel item align bug
* `fix`: `CascadeSelect` tab type change bug (#27)
* `fix`: `CascadeSelect` incorrect placeholder color
* `fix`: `CascadeSelect` normal mode cannot select the first Option if `props.value` is not set


## 3.1.11 / 2017-11-09

* `feat`: TabBar: isUrl can pass base64 dataUrl.
* `fix`: Tab underline bar style

## 3.1.10 / 2017-11-03

* `fix` refactor Toast.hide logic, fix the weird leaving animation.

## 3.1.9 / 2017-11-02

* `fix` the first option can not be selected if user confirm without rolling the slot and value is null/undefined

## 3.1.8 / 2017-11-01

* `fix` NoticeBar wrong icon when type is warning.
* `feat` export H5 PhotoField using `PhotoField.H5`

## 3.1.5 / 2017-10-09
* `feat` 统一了所有组件对于 `icon` 的依赖。
* checkbox-field@2.0.0
	* `breaking`: prop `iconName` 被 `icon` 代替，icon 的类型是一个 React Element，可以是 Icon 组件的实例或者通过 salt-svg-loader 引入的 Icon。
* `style` 增加了新的主题 `net-blue`

## 3.1.4 / 2017-09-20
* checkbox-field@3.0.1
    * `fix`: 移除 placeholder 的 text-align: right

## 3.1.3 / 2017-09-20
* rate@3.0.0
    * 升级 icon 到 3.0.0，及其它依赖整理、升级
    * `feat` 支持 readOnly
* rate-field@2.1.0
    * 升级依赖的 rate 的版本
* infinite-scroll@1.1.0
    * update icon to ^3.0.0

## 3.1.2 / 2017-09-20
* datetime@0.2.1
    * `break`: columns 格式废弃 DHM，改用更直观的 YMDWHM
    * `feat`: columns 格式增加了 YMDHM
* datetime-field@2.3.0
    * `break`: 由于 datetime 升级，也相应作了调整
* calendar-field@3.1.2
    * 升级 datetime 依赖版本

## 3.1.1 / 2017-09-20
* tab-bar@2.1.2
    * `fix`: 移除特殊 item 容器上的 background-color
* toast@2.2.0
    * `feat`: update `icon` to `^3.0.0`

## 3.1.0 / 2017-09-19
* 多个表单组件升级，涉及内容是：field 升级到 `^3.0.0`，并对其它 dependencies 进行升级、整理
    * cascade-select-field@3.0.0
    * city-select-field@2.0.0
    * radio-field@3.0.0
    * checkbox-field@3.0.0
    * textarea-field@3.0.0
    * switch-field@2.0.1
    * number-picker-field@2.0.2
    * select-field@2.0.0
    * datetime-field@2.2.0
    * picker-field@2.0.0
    * photo-field@3.0.1
* icon@3.2.2
    * salt-svg-loader 有调整，移除掉 svg 中的 class 属性
* tab-bar@2.1.1
    * `fix` TabBarItem 不传 badge 就不渲染，导致 item 为空白
* context@1.1.2
    * 整理、升级依赖
* avatar@2.0.1
    * 升级依赖、整理项目
* grid@1.1.2
    * 升级依赖、整理项目
    * 依赖 `box` 改为 `boxs`
* dialog@2.0.3
    * 整理依赖、整理项目
* employee-field@2.0.1
    * `feat`: 升级 `avatar` 至 `^2.0.0`
    * `feat`: 整理项目，删除无用的 svg
* boxs@1.0.5
    * `feat`: 整理项目，删除无用的 svg
* button@2.1.1
    * 修改依赖策略

## 3.0.12 / 2017-09-08
* datetime@0.1.5
    * 新增组件
* datetime-field@2.1.1
    * 提取 datetime，单独发包，在该组件中引用
* field@3.0.0-3.1.3
    * `feat` 修改 label 显示方式
    * `feat` 支持新的 prop errMsg
    * `feat` 增加新的静态方法 Field.getFieldProps
    * `fix` tip 只有一行时间距不对
    * `fix` 无论是否传 icon 都会有 icon 的占位
* rate-field@2.0.0
    * `feat` 升级 field 至 ^3.0.0
    * `fix` 修改 README 符合现状
* employee-field@2.0.0
    * `feat` 升级 field 至 ^3.0.0
* text-field@3.0.0
    * `feat` 升级 field 至 ^3.0.0
* number-field@0.2.0
    * `feat` 新增组件
    * `feat` 升级 field 至 ^3.0.0
* calendar-field@3.0.0-3.1.1
    * `feat` 升级 field 至 ^3.0.0
    * `feat` 已支持 year, month, day(面板形式), dayWithSlot(拨盘形式), dayWithHalf, dayWithTime
    * `fix` value 未定义时报错
* calendar@3.1.2
    * `feat` 年月及年月区间不再支持，增加说明
    * `fix` 入值 value 未支持 { value: xxx } 格式，导致无法渲染正确的 day
* photo-field@2.1.3
    * `fix` 文件名PhotoFieldUploadItem 写成了PhotoFIeldUploadItem
    * `fix` 上次发布未build
* icon@3.2.1
    * `feat` salt-svg-loader 有调整，外层包了一层div，把 position: relative 包在内部
    * `feat` 使用新的 salt-svg-loader 处理icon，涉及改动点如下：
        - 1、remove svg4everybody
        - 2、style inline 化，不依赖外部样式
        - 3、最外层容器由 span 更换为 div
* password-input@0.2.0
    * `feat` add new prop hideIcon
* avatar@1.1.2
    * `fix` String.prototype.includes is too new to use
    * `fix` Object.assign is too new to use

## 3.0.11 / 2017-09-06
* avatar@1.1.1
    * `fix` Object.assign is too new to use
* datetime-field@2.0.1
    * `fix` 非闰年2月出现29-31
    * `feat` 代码es6化
* mask@2.2.0
    * `feat` 将 Mask 渲染到 body
* popup@0.1.7
    * `feat` children can be null or undefined
    * `feat` support React Component Usage like <Popup />
* slot@2.3.1
    * `feat` 使用新的 Popup 用法
* style@2.5.6
    * `feat` change default transition ease
* timeline@2.0.4
    * `fix` border-color of header-dot of actived Item
* icon@3.2.0
    * `feat`: 使用新的 salt-svg-loader 处理icon，涉及改动点如下：
        * remove svg4everybody
        * style inline 化，不依赖外部样式
        * 最外层容器由 span 更换为 div
* collapse@1.1.1
    * `fix` style bug
* notice-bar@0.1.1
    * `fix`: 样式写法，数字后面未加px
* popover@0.1.4
    * `fix` style bug
* switch@1.1.1
    * `fix` style
    * `fix` demo error
    * `feat` es6

## 3.0.10 / 2017-09-01
* tab@2.1.3
    * 样式优化
* rate-field
    * 移除不必要的 group 的使用
    * 移除无效的 showLabel
    * 组件竟然没有按照安全受限的原则来实现，所以重构了一下
* text-field@2.0.1
    * 修复 placeholder 和 前缀的占位错位。
* mask@2.1.0
    * 加入动效
* picker-field@1.2.2
    * 透传 searchText
* datetime-field@2.0.0
    * `feat` 增加国际化参数 locale
    * `breaking change` value：
        * 增加了object类型支持，使用timeType字段表示上/下午
        * 取消了字符串类型
    * `breaking change` columns 不再支持展示列自由组合，改为只支持三种情况，以DatetimeField.YMD 等常量形式给出
    * `breaking change` onSelect 参数改为对象，value 字段表示时间戳，timeType 字段表示上/下午

## 3.0.6 / 2017-08-11
* 脚手架、打包方式完全重构，Readme 重写
* 去除 blue.css 和 ui.js 

## 3.0.5 / 2017-8-9
* notice-bar
    * 新增
* note
    * 移除
    * 请使用notice-bar替代
    * type可选值移除message，用info替换，另外还支持'success','error','warning'
    * 移除closable、closeText，换用optionsType

## 3.0.4 / 2017-8-6
* 同3.0.3

## 3.0.3 / 2017-8-6
* icon-source
    * 移除
* calendar
    * 升级到新版交互，变动较大，请参考 calendar 的 HISTORY
    * 暂不支持 monthCalendar 和 yearCalerdar
* calendar-field
    * 依赖新版的 calendar，暂不支持 monthCalendar 和 yearCalerdar
* cascade-select-field
    * 增加了新的模式 complex
* 其它组件小版本升级

## 3.0.2 / 2017-7-10
* 发布内容与3.0.1完全相同。因为tnpm上已经存在了以前发布过的3.0.1，为了保持CDN和TNPM一致，所以再发一个版本。

## 3.0.1 / 2017-7-10
* photo-field@2.0.0
	* 样式更新至最新规范
	* 支持 H5 上传
	* onChange 增加第二个参数，简化使用流程
* text-field@2.0.0
	* 增加前缀、后缀、计数器、清除按钮
	* 样式优化
* textarea-field@2.0.0
	* 增加计数器
	* 样式优化
* 其它优化点

## 3.0.0 / 2017-6-29
* 本批次组件，均涉及新版视觉规范跟进，需要配合同版本的css一起使用。
* tab@2.0.0
	* 基于 rc-tabs 重构
	* eslint & new scaffold
	* `break` scroll/showScroll
	* `break` pendant
	* `break` onChange：只有真正 change 时才触发, 删除了参数的e属性, 参数的active属性都是string类型
	* active：可以是 integer 或者是 string
	* new prop: showExpandAll: 是否显示展开所有 tab 的图标
	* new prop: defaultActive: 初始化选中面板的 key，如果 active 没有设置, 默认值是 `'0'`
	* new prop: onTabClick: 和老版的 onChange 逻辑一致
	* new prop: animated: 是否动画
	* new prop: swipeable: 是否可以滑动 tab 内容进行切换
	* new prop: hammerOptions: 开启 `swipeable` 的时候可以对 [hammerjs](http://hammerjs.github.io/) 的 [pan](http://hammerjs.github.io/recognizer-pan/) 和 [swipe](http://hammerjs.github.io/recognizer-swipe/) 两种手势进行参数配置
	* new prop: tabBarPosition: tab的位置，可以是 `top/bottom`
	* new prop: pageSize: 可视区显示的 tab 数量，可以看做一页
	* new prop: speed: 多页模式下，TabBar 滑动的速度
	* new prop: tabBarhammerOptions: 同hammerOptions，对 TabBar 的滑动手势进行配置
* search-bar@3.0.0
	* `break` 完全移除 History 和 Result 面板相关的逻辑
	* 增加子组件 WithContainer
* tab-bar@2.0.0
	* 支持icon以 <Icon />的形式传入
	* 修改 badge 样式，引入 badge
	* 样式优化
* scroll-list
	* 新增子组件 ScrollList.Item
* toast@2.0.0
	* add new type `light toast`
	* use rc-dialog instead of layer
	* style optimazition
* button@2.0.0
	* 新增子组件 `TextButton`, `IconButton`, `ButtonGroup`, type = text is deprecated
	* add `inline` button, `banner` button, `loading` button
	* eslint & new scaffold
	* style is optimized
	* icon & text vertical align
* totop
	* new component
	* slide
	* new style
* collapse
	* new component
	* slot@2.0.0-2.1.0
	* 增加Slot单独使用，方便常驻页面中
	* 样式优化
	* formatColumnValue 和 formatDataValue 方法不直接修改入参
	* style is optimized
* mask@2.0.0
	* new style
* foldable-pane
	* new component
* dialog@2.0.0
	* 新增 props `transparentMode`，指定弹窗是否为透明背景(通过增加className实现), transparentMode下不能自定义 buttons
	* 新增 props `btnDir`，指定弹窗的按钮方向，horizontal(水平排布)，vertical(垂直排布)，传递 '' 或不传的时候按照默认规则处理(2个按钮水平排布，其余都为垂直排布)
	* 使用 rc-dialog 作为底层重构
* employee-field
	* 新增，基于钉钉api
* field@2.0.0
	* 移除依赖 icon-source
	* 升级依赖 style、icon
* icon@3.0.0 - 3.0.7
	* 可以单独使用 Icon 了
	* 新增 eye、totop、lock、eye-close
	* 对 svg 添加 line-height 0，以修复无法垂直居中的问题
	* 更新 cross-round 和 check-round
	* 更新 plus-round、minus-round、plus-circle、minus-circle
* grid@1.1.0
	* eslint & new scaffold
* timeline@2.0.0
	* new style
* table
	* new style
	* 增加配置项 可隐藏分割线 `hideSplitLine`
	* eslint
* radio-field@2.0.0
	* new style
* checkbox-field@2.0.0
	* new style
* popover
	* new component
	* menu@0.2.0 - 0.2.2
	* new style
	* adjust icon style
	* text overflow
	* add min-width
* switch@1.1.0
	* new style
* card
	* new style
* pagination@2.0.0 - 2.1.0
	* new style
	* add quick jumper
* avatar
	* support new size `normal`, `large`
	* support icon prop
	* `defaultColor` is deprecated, use `colors` instead
	* name formation logic is changed

## 2.2.3 / 2017-6-12
* scroll-list
	* 添加scrollRefresh来支持只下拉刷新不触底加载
* infinite-scroll
	* add getRef
* pagination
	* 修复上一页下一页禁用时仍然可以点击
* tab-bar
	* 增加中间大tab 的高度样式自定义
* calendar-field
	* 如果传入的 startDate 或 endDate 不存在，则不显示对应的值

## 2.2.2 / 2017-6-2
* datetime-field
	* fix: 在小月的情况下选择大月 31 号取值错误的问题
	* fix: 点击取消回填值不对

## 2.2.1 / 2017-6-2
* steps
	* 样式更新

## 2.1.7 / 2017-5-3
* refreshcontrol
	* new component
* infinite-scroll
	* new component

## 2.1.6 / 2017-4-27
* picker-field
	* add fetchDataOnOpen prop，default value is `true`
* badge
	* new component
* card
	* new component
* number-picker
	* new component
* number-picker-field
	* new component
* scroll-list
	* 添加内置数据源

## 2.1.5 / 2017-4-21
* popup
	* 新增组件
* action-sheet
	* 新增组件

## 2.1.4 / 2017-4-21
* picker-field
	* bugfix
* scroll-list
	* fix: 修正className。打salt大包后，它会覆盖scroll-view的样式

## 2.1.3 / 2017-4-21
* picker-field
	* 新增组件
* calendar-field
	* 传递 readOnly 到field
* field
	* 支持extra：放一些额外的元素，比如徽标等

## 2.1.2 / 2017-4-19
* field
	* readOnly状态下不显示tip
* slide
	* 发布正式版
* gallery
	* 发布正式版

## 2.1.1 / 2017-4-11
* calendar
	* 在iOS上某些场景下，会导致点击“取消”不消失，在样式上进行了兼容
* table
	* 滚动条层级太高 和其他组件一同使用会有影响
	* 同时使用两个表格数据不一样时，高度不能自适应（原来用的id来选择元素，换成refs来选择）
* checkbox-field
	* fix: slot模式下，修正readOnly状态的颜色
* datetime-field
	* 对tingle组件的依赖策略由`~`改为`^`
* cascade-select-field
	* 对tingle组件的依赖策略由`~`改为`^`

## 2.1.0 / 2017-4-9
* layer
	* 添加`renderToBody`配置项，可以选择是否把节点插入到body，默认为true。原来的逻辑是原位插入
* mask
	* 优化：当Mask visible的时候，禁用页面滚动
* table
  * 内容超出之后滚动不流畅，fix
  * align为center时显示位置未居中，fix
* slot
	* 对tingle组件的依赖策略由`~`改为`^`

## 2.0.2 / 2017-4-7
* cascade-select-field 更新文档
* mask
	* 当Mask visible的时候，禁用页面滚动；否则复原
	* z-index调整为1000
* dialog，z-index调整为1020

## 2.0.1 / 2017-4-5
* 合并1.2.13

## 1.2.13 / 2017-3-31
* hotfix: 加入 dedupe plugin，修复打包过大的问题

## 2.0.0 / 2017-3-28
* 新增menu
* 新增progress
* scroll-list
	* 有一系列`break change`
		* 删除属性
			* 删除 iscroll 的 `options` 属性
			* 删除 `pushLoadTip`
			* 删除 `cache` 属性
		* 删除 API
			* 删除 `clearCache` 方法
		* 添加的属性
			* 增加 `refreshing` 属性
			* 增加 `loading` 属性
			* 添加 `noMore` 属性
		* 运行机制变动
			* 使用 `scroll-view` 封装实现，去除了 `iscroll` 的依赖
			* 底部加载的交互方式从手动上拉加载更换为触底自动加载
			* `onLoad` 回调分解为两个方法：`onRefresh` 和 `onLoad`。分别对应下拉刷新和触底加载的回调。
		* 注意事项
			* 新版本的 dom 结构和 class 名称有变化，做了自定义样式的同学需要验证一下新版本的展示是否正确
			* onLoad的使用方式有变化，分解为了 `onRefresh` 和 `onLoad`
* table
	* feat: 边框rem(1px)在部分设备下不显示
	* feat: 当未固定时，滑动时左侧边框不显示
* tab-bar
	* feat: 升级icon，并修改demo，不再引入icon-source
	* feat: 升级generator
	* feat: 格式化代码、删除冗余代码
	* fix: 修复中间特殊button的color
	* feat: 修改css样式替换icon

## 1.2.11 / 2017-3-16
* 升级icon到2.0.0
* 依赖icon的组件：
	* 升级icon到2.x
	* 修改demo，不再引入icon-source，不再往页面上插入svg
	* generator升级，升级generator的update任务
	* 格式化代码
	* 并做小版本升级
	* 涉及组件：
		* checkbox-field
		* datetime-field
		* field
		* list
		* nav-bar
		* note
		* photo-field
		* radio-field
		* search-bar
		* select-field
		* toast
		* table
		* tab-bar
* 新增或增强的组件：
	* table
	* timeline
	* image-viewer
	* tab-bar
* 由上面的修改所带来的问题的修复

## 1.2.10
* 更新calendar样式

## 1.2.9
* 发正式版样式

## 1.2.8
* table 新增
* timeline 新增
* calendar-field
 * feat: 点击mask关闭
 * feat: 面板显示隐藏的逻辑，封装在组件内部

## 1.2.7
* 新增calendar-field
* calendar升级到^2.0.0，含样式上和修复及其它优化

## 1.2.6
* with scroll-list@1.3.0

## 1.2.3
* checkbox-field@1.1.4
 * fix: 移动端无法选中选项
 * fix: 样式修复

## 1.2.2
* 移除demo的Native，用户可到钉钉官网查找相关jsapi，更新更及时

## 1.2.1
* 误发，忘记build了

## 1.2.0
* crumb
 * 新增组件

## 1.1.18 / 2016.12.30
* checkbox-field
 * 右侧 icon 没对齐修复
 * 滑动穿透修复
* photo-field
 * placeholder样式修复
* textarea-field
 * placeholder 文案颜色与规范不一致修复

## 1.1.17 / 2016.12.15
* checkbox-field
 * 移动端多选组件交互更改，提供了一种slot的方式
* text-field
 * 禁用态也可显示placeholder
* tab-bar
 * 修复icon不支持相对路径的问题

## 1.1.16 / 2016.12.8
* search-bar
 * zindex修复
* tab-bar
 * zindex修复
* list
 * 移除dependencies中的gulp-svg-symbols，它仅用于开发

## 1.1.15 / 2016.12.1
* fix 1.1.14遗留的bug

## 1.1.14 / 2016.12.1
* fix 1.1.13遗留的bug

## 1.1.13
* 复制index.html到dist/demo/index.html，并更新页面上静态文件地址，发布到线上，用户可以访问这个demo

## 1.1.11
* list
 * 数据更新后isDelete不可用，fix
* scroll-list
 * 把数据请求的功能分离出来
* datetime-field
 * console.waring拼写错误，fix
* slide
 * 90毫秒的点击捕获时间太短，改成500
* photo-field
 * Ali.alert，bugfix

## 1.1.10
* box@1.0.2 
 * 增加react依赖，支持node端渲染
* checkbox-field@1.0.13 
 * feat: add required tag
* gallery@1.1.2 
  * 增加react依赖，支持node端渲染 
* group@1.0.8 
 * 增加react依赖，支持node端渲染
* icon-source@1.0.13
 * feat: add field-required
* mask@1.0.6 
 * 增加react依赖，支持node端渲染
* photo-field@1.0.3 
 * feat: add required tag
* slide@1.0.8 
* slot@1.0.9 
 * fix issue #4
* toast@1.0.10 
 * feat: change loading

## 1.1.9
 * slot@1.0.9
   * bugfix

## 1.1.8
 * cascade-select-field
   * 新增组件

## 1.1.7
 * dialog@1.0.19 
  * 修复国际化 bug
 * icon-source@1.0.12 
  * 增加 toast 图标
 * tab@1.0.23 
  * remove border-bottom in the brick mode

## 1.1.6
* tab-bar@1.1.4
 * 调整选中态图片地址的传入方式为使用属性 activeIcon
 * 支持自定义 TabBar 和 TabBarItem 样式
* search-bar@1.0.4
 * 修复clear keyword未触发 onChange 的 bug

## 1.1.5
* tab-bar@1.1.2
 * fix: touch scroll
* dialog@1.0.18 
 * 支持国际化
* grid@1.0.4 
 * 代码优化
* scroll-list@1.2.7
 * bugfix
 
## 1.1.4
* scroll-list@1.2.2
 * Bugfix/reset position
* search-bar@1.0.3
 * fix: reset overflow after unmount
* icon-source@1.0.11
 * display none
 
## 1.1.3
* scroll-list@1.2.1
 * fix default background image
 * fix rchild
* tab@1.0.22 
 * fix title propType to `node`
 * style: formatting
 
## 1.1.2
* rate@1.0.2 
 * gulpfile add plugin `add-module-exports`
* scroll-list@1.1.5 
 * fix rchild is undefined
 
## 1.1.1
* button@1.0.10
 * onClick 传入 event 参数
 
## 1.1.0
* 版本号标准化
* toast@1.0.7
 * 改为默认不显示 mask
* tab@1.0.20
 * 修复文字很长时，右侧没留空白
* scroll-list@1.1.4
 * use nextProps param to do fetch action
* checkbox-field@1.0.12
 * label判断修改
* radio-field@1.0.9
 * label判断修改
* scroller@1.0.7
 * 文档订正
* layer@1.0.10
 * 文档订正
* rate@1.0.1
 * 新增组件 
* photo-field@1.0.1
 * 新增组件
 
## 1.0.29
* scroll-list@1.1.0
 * 重构
 * 样式修改

## 1.0.28
* toast@1.0.6
 * mask 支持隐藏
* layer@1.0.9
 * 修复 mask  隐藏
* iscroll-list@1.0.11
 * 修复滑动到末页的时候会将所有数据清空
 * 修复在 scroll 里的元素在 Android 里无法点击
* checkbox-field@1.0.11
 * 添加 label
 * radio-field@1.0.7
  * 添加 label
* calendar@1.0.0
 * 新增组件
 * 新增 calendar demo

## 1.0.27
* tab@1.0.18
  * demo 修改
* scroll-list@1.0.5
  * 样式修改
  
## 1.0.26
* datetime-field@1.0.6
  * 新增
* scroll-list@1.0.1
  * 新增

## 1.0.25
* slot@1.0.8
  * 支持服务端调用（增加 react 依赖）
  * 增加表头显示功能
* select-field@1.0.8
  * 支持服务端调用（增加 react 依赖）
* tab@1.0.17
 *  增加 tab 滚动定位
* search-bar@1.0.2
 *  添加 onEnter 和 onExit

## 1.0.24
* search-bar@1.0.1
 * 新增
* tab@1.0.16
 * 添加切换销毁属性 `destroyInactiveTabPane` 
* slot@1.0.6
 * 修复 constructor 里使用了 `this.prpps`
 
## 1.0.23
* slide@1.0.7
  * 修复只有一个元素时无法触发 `onSlideClick` 事件的错误

## 1.0.22
* list@1.0.9
 * list item 的 onclick 回调添加 data 参数
 * 头像 的 onclick 回调添加 data 参数
 * 添加滑动删除的回调
* field@1.0.14
 * 添加必填标识(星号)

## 1.0.21
* list@1.0.8
 * list Item 添加 onClick 回调
 * data中的内容不传就不显示（解决有人不想显示头像的问题）
 * 添加头像 onClick 回调
* 打包修复

## 1.0.20
* gallery
  * 添加 `onGalleryClick` 特性

## 1.0.19
* 重新构建 salt-ui

## 1.0.18
* list
 * 解决group边线问题
 * 解决setState后list数据不变的问题

## 1.0.17
* icon
 * 文档补充
 * 添加 onClick 事件

## 1.0.16
 * tab bug fix to 1.0.14:
  * tab 切换方式用 show/hide 会有问, 改用只渲染当前 body
  * 导航部分右边添加自定义icon区域
 * select-field bug fix to 1.0.6
  * 点击图标不会出现选项

## 1.0.15
 * dialog 1.0.17 修复了在内外安卓容器无法居中的问题

## 1.0.13
 * copy salt.js and salt.css

## 1.0.12  
 * 和 tnpm 包版本号保持一致

## 1.0.5
 * add global SaltUI

## 1.0.4
 * filed	1.0.12 修复了 className不在最外层的问题
 * select-field	1.0.5 fix issue #2 #3
 * icon 1.0.10 把 svg4everybody 本地化，原有的方式 webpack 打包后有问题
 * dialog 1.0.14 fix issue #3 #4 #5
 * group	1.0.7 fix issue #3