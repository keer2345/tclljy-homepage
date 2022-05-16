export const checkTel = (rule, value) => {
  const regTel = /^(\d3,4\d3,4\d{3,4}|\d{3,4}-)?\d{7,8}$/
  const regPhone = /^1[345768]\d{9}$/
  if (!regTel.test(value) && !regPhone.test(value)) {
    return Promise.reject('电话号码格式有误！')
  }

  return Promise.resolve()
}
