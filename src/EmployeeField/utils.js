// 把 钉钉api 返回的值转换成 key/label 格式
function transToValue(list) {
  return (list || []).map(item => (
    {
      key: item.emplId,
      label: item.nickNameCn || item.name,
      avatar: item.avatar,
    }
  ));
}

export default { transToValue };
