/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

// 基础组件
import componentPackInput from '../viewComponents/Input';
import componentPackColor from '../viewComponents/Color';
import componentPackInputNumber from '../viewComponents/InputNumber';

// 是否 Boolean
import componentPackBooleanSwitch from '../viewComponents/SelectBoolean/elSwitch';

// 上传
import componentPackUploadImage from '../viewComponents/UploadImage';

// 时间 日期
import componentPackTime from '../viewComponents/Time';

// 日期
import componentPackDateString from '../viewComponents/Date/string';

// 日期时间
import componentPackDateTimeString from '../viewComponents/DateTime/string';

// 日期区间
import componentPackDateRangeString from '../viewComponents/DateRange/string';

// 日期时间区间
import componentPackDateTimeRangeString from '../viewComponents/DateTimeRange/string';


// 布局 Object Array
import componentPackObject from '../viewComponents/Object';
import componentPackArray from '../viewComponents/Array';

const tools = [{
            title: '对象',
            componentPack: componentPackObject
        }, {
            title: '数组',
            componentPack: componentPackArray
        }, {
            title: '数值',
            componentPack: componentPackInputNumber
        }, {
            title: '布尔值',
            componentPack: componentPackBooleanSwitch
        }, {
            title: '字符串',
            componentPack: componentPackInput
        }, {
            title: '颜色',
            componentPack: componentPackColor,
        }, {
            title: '图片',
            componentPack: componentPackUploadImage
        }, {
            title: '时间',
            componentPack: componentPackTime
        }, {
            title: '日期',
            componentPack: componentPackDateString
        }, {
            title: '日期时间',
            componentPack: componentPackDateTimeString
        }, {
            title: '日期范围',
            componentPack: componentPackDateRangeString
        }, {
            title: '日期时间范围',
            componentPack: componentPackDateTimeRangeString
        }
];

export default tools;