let dateDiff = function (timestamp:number) {
  // 补全为13位
  let arrTimestamp = (timestamp + '').split('');
  for (let start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = '0';
    }
  }
  timestamp = Number(arrTimestamp.join(''));
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - timestamp;
  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return '不久前';
  }
  // 计算差异时间的量级
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  // 数值补0方法
  let zero = function (value:number) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };
  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    return (function () {
      var date = new Date(timestamp);
      return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
    })();
  } else if (monthC >= 1) {
    return ~~monthC + "月前";
  } else if (weekC >= 1) {
    return ~~weekC + "周前";
  } else if (dayC >= 1) {
    return ~~dayC + "天前";
  } else if (hourC >= 1) {
    return ~~hourC + "小时前";
  } else if (minC >= 1) {
    return ~~minC + "分钟前";
  }
  return '刚刚';
};
export default dateDiff

