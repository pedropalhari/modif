const ALL_BUT_NUMBERS = /[^0-9]/g;
const ONLY_NUMBERS_REGEX = /[0-9]/g;
const ONLY_WHITE_SPACE_REGEX = /\s/g;

function removeNumbers(value: string) {
  return value.replace(ONLY_NUMBERS_REGEX, "");
}

function onlyNumbers(value: string) {
  return value.replace(ALL_BUT_NUMBERS, "");
}

function removeWhiteSpace(value: string) {
  return value.replace(ONLY_WHITE_SPACE_REGEX, "");
}

export const RegexModifiers = {
  removeNumbers,
  onlyNumbers,
  removeWhiteSpace,
};
