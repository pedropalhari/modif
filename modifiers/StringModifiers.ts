function length(value: string) {
  return value.length.toString();
}

function concat(value: string, arg1: string) {
  return value + arg1;
}

function starts(value: string, arg1: string) {
  return value.split(arg1)[1] || "";
}

function ends(value: string, arg1: string) {
  return value.split(arg1)[0] || "";
}

function between(value: string, arg1: string, arg2: string) {
  return ends(starts(value, arg1), arg2);
}

export const StringModifiers = {
  length,
  concat,
  starts,
  ends,
  between,

  // JavasScript default functions
  encodeURIComponent,
  decodeURIComponent,
};
