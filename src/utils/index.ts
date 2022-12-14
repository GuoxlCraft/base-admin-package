import { requestAnimationFrame, cancelAnimationFrame } from '@/utils/animation'
const $animation = { requestAnimationFrame, cancelAnimationFrame }
import {
  getViewportOffset,
  hasClass,
  addClass,
  removeClass,
  on,
  off,
  once,
  getStyle,
  getBoundingClientRect,
  setStyle,
  isScroll,
  getScrollContainer,
  isInContainer
} from '@/utils/dom-uitls'
const $domUtils = {
  getViewportOffset,
  hasClass,
  addClass,
  removeClass,
  on,
  off,
  once,
  getStyle,
  getBoundingClientRect,
  setStyle,
  isScroll,
  getScrollContainer,
  isInContainer
}
import {
  requiredRule,
  idCardRule,
  isPhoneRule,
  isEmailRule,
  isUrl,
  isCodeRule,
  isIPRule,
  isKeywordRule,
  isEnglishRule,
  inputLength,
  maxNumber,
  isOnly,
  isOnlyPrimary,
  isAnyRule,
  noStartWithRule,
  isFloatNumRule,
  isIntNumRule,
  isPositiveFloatNumRule,
  isPositiveIntNumRule
} from '@/utils/form-rules'
const $formRules = {
  requiredRule,
  idCardRule,
  isPhoneRule,
  isEmailRule,
  isUrl,
  isCodeRule,
  isIPRule,
  isEnglishRule,
  isKeywordRule,
  inputLength,
  maxNumber,
  isOnly,
  isOnlyPrimary,
  isAnyRule,
  noStartWithRule,
  isFloatNumRule,
  isIntNumRule,
  isPositiveFloatNumRule,
  isPositiveIntNumRule
}
import {
  deepClone,
  findIndex,
  toAnyString,
  param2Obj,
  oneOf,
  formatTime,
  valueEquals,
  IEVersion,
  humpToUnderline,
  formatTimeForXlsx,
  splitNum
} from '@/utils/common'
const $utils = {
  deepClone,
  findIndex,
  toAnyString,
  param2Obj,
  oneOf,
  formatTime,
  valueEquals,
  IEVersion,
  humpToUnderline,
  formatTimeForXlsx,
  splitNum
}
import {
  is,
  isExternal,
  isEmail,
  isPhone,
  isIdCard,
  isTel,
  isNum,
  isCode,
  isIP,
  isInteger,
  isEnglish,
  isChinese,
  isServer,
  isFirefox,
  isString,
  isObject,
  isAny,
  isLowerCaseAny,
  noStartWith,
  isKeyword,
  isFloatNum,
  isDateTimeFormat,
  isDateFormat
} from '@/utils/validate'
const $validate = {
  is,
  isExternal,
  isEmail,
  isPhone,
  isIdCard,
  isTel,
  isNum,
  isCode,
  isIP,
  isInteger,
  isEnglish,
  isChinese,
  isServer,
  isFirefox,
  isString,
  isObject,
  isKeyword,
  isAny,
  isLowerCaseAny,
  noStartWith,
  isFloatNum,
  isDateTimeFormat,
  isDateFormat
}

export { $animation, $domUtils, $formRules, $utils, $validate }
