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

    const nickName = nick || nickNameCn;
    let label = '';
    if (nickName) {
      // 花名(工号)
      label = `${nickName}(${emplId})`;
    } else if (orgUserName) {
      // 姓名(工号)
      label = `${orgUserName}(${emplId})`;
    } else if (name) {
      // name = 姓名(花名)
      label = (name || '').replace('（', '(').replace('）', ')');
    }

    return {
      key: emplId,
      label,
      avatar,
    };
  });
}

export default { transToValue };
