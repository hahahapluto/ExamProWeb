export const formatExamString = (inputString: string) => {
  var parts = inputString.split("(exampro)");
  if (parts.length === 2) {
    var title = parts[0];
    var options = parts[1].split("&");
    var formattedOutput = title;
    for (var i = 0; i < options.length; i++) {
      var keyValue = options[i].split("=");
      if (keyValue.length === 2) {
        formattedOutput += " " + keyValue[0] + "=" + keyValue[1] + ";";
      }
    }
    return formattedOutput;
  } else {
    return inputString;
  }
};

export const formatExamString2 = (inputString: string) => {
  var parts = inputString.split("(exampro)");
  return parts[0];
};

// 普遍的规则 封装
export const commonRules = (des: string, tri: string) => {
  return [{ required: true, message: `请填写${des}`, trigger: tri }];
};

export const getOption = (key: string, inputString: string) => {
  const keyIndex = inputString.indexOf(key); // 如果找到了该键

  if (keyIndex !== -1) {
    // 计算值的起始位置
    const valueStart = keyIndex + key.length; // 查找下一个键的索引位置

    const nextKeyIndex = inputString.indexOf(";", valueStart); // 如果没有下一个键，截取整个字符串

    if (nextKeyIndex === -1) {
      return inputString.substring(valueStart);
    } else {
      // 否则，截取到下一个键之前的部分
      return inputString.substring(valueStart, nextKeyIndex);
    }
  } else {
    return null;
  }
};

export const getQues = (inputString: string) => {
  const match = inputString.match(/^(.*?)A=/);
  if (match && match[1]) {
    return match[1].trim();
  } else {
    return inputString;
  }
};
