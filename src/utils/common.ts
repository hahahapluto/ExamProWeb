export const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};


export const transTime = (dataTime: string) => {
  const inputDate = new Date(dataTime)
  // 提取年、月、日、小时和分钟
  const year = inputDate.getFullYear()
  const month = inputDate.getMonth() + 1 // 月份从0开始，所以需要加1
  const day = inputDate.getDate()
  const hours = inputDate.getHours()
  const minutes = inputDate.getMinutes()

  // 格式化为 "yyyy-mm-dd hh:mm:00" 格式
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`

  console.log(formattedDate) // 输出格式化后的日期时间
  return formattedDate
}