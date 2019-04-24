// 把 钉钉api 返回的值转换成 key/label 格式
function transToValue(list) {
  return (list || []).map((item) => {
    const {
      emplId,
      nick,
      nickNameCn,
      name,
      orgUserName,
      avatar,
    } = item;

    let label;
    if (orgUserName) {
      // 兼容钉钉新字段
      if (nick) {
        label = `${orgUserName}(${nick})`;
      } else {
        label = orgUserName;
      }
    } else if (name) {
      // 原有逻辑，调整为 姓名(花名) 的方式
      if (nickNameCn && nickNameCn !== name) {
        label = `${name}(${nickNameCn})`;
      } else {
        label = name;
      }
    }

    return {
      key: emplId,
      label,
      avatar,
    };
  });
}

export default { transToValue };
