function now(_value: string) {
  return new Date().toString();
}

function date(value: string) {
  return new Date(value).toString();
}

export const DateModifiers = {
  now,
  date,
};
