function leftPad(value) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

export default function toStringByFormatting(source) {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());
  const hour = leftPad(source.getHours());
  const minute = leftPad(source.getMinutes());
  const second = leftPad(source.getSeconds());
  const date = [year, month, day].join("-");
  const time = [hour, minute, second].join(":");

  return `${date} ${time}`;
}
