export const formatExamString = (inputString: string) => {
  var parts = inputString.split('(exampro)')
  if (parts.length === 2) {
    var title = parts[0]
    var options = parts[1].split('&')
    var formattedOutput = title + '?'
    for (var i = 0; i < options.length; i++) {
      var keyValue = options[i].split('=')
      if (keyValue.length === 2) {
        formattedOutput += ' ' + keyValue[0] + '=' + keyValue[1] + ';'
      }
    }
    return formattedOutput
  } else {
    return inputString
  }
}

// 普遍的规则 封装
export const commonRules = (des: string, tri: string) => {
  return [{ required: true, message: `请填写${des}`, trigger: tri }]
}
