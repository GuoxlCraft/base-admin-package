import {
  isIdCard,
  isPhone,
  isCode,
  isIP,
  isExternal,
  isInteger,
  isEnglish,
  isAny,
  isKeyword
} from '@/utils/validate'

// 必填项
export const requiredRule = {
  required: true,
  message: '该项不能为空'
}

// 身份证验证
export const idCardRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (isIdCard(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的身份证号码'))
    }
  }
}

// 手机号验证
export const isPhoneRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (isPhone(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的联系电话'))
    }
  }
}

// 邮箱验证
export const isEmailRule = {
  type: 'email',
  message: '请输入正确的电子邮箱'
}

// 关键字验证
export const isKeywordRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (isKeyword(value)) {
      return callback(new Error('请勿输入关键字'))
    } else {
      callback()
    }
  }
}

// url验证
export const isUrl = {
  validator: (_: any, value: any, callback: Fn) => {
    if (isExternal(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的地址'))
    }
  }
}

// 邮编验证
export const isCodeRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (isCode(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的邮编'))
    }
  }
}

// IP验证
export const isIPRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (isIP(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的IP地址'))
    }
  }
}

// 只能是英文
export const isEnglishRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (isEnglish(value)) {
      callback()
    } else {
      return callback(new Error('请输入英文字母'))
    }
  }
}

// 字母 下划线 数字，并且不能以数字开头,且不以o_开头
export const isAnyRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (isAny(value)) {
      callback()
    } else {
      return callback(new Error('请输入以字母开头的字母、下划线和数字'))
    }
  }
}

// 只能是实数
export const isFloatNumRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/.test(value) || !value) {
      callback()
    } else {
      return callback(new Error('请输入数值'))
    }
  }
}

// 只能是整数
export const isIntNumRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (/^(0|[1-9][0-9]*|-[1-9][0-9]*)$/.test(value) || !value) {
      callback()
    } else {
      return callback(new Error('请输入整数'))
    }
  }
}
// 只能是正实数
export const isPositiveFloatNumRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (/^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(value) || !value) {
      callback()
    } else {
      return callback(new Error('请输入正实数'))
    }
  }
}

// 只能是正整数
export const isPositiveIntNumRule = {
  validator: (_: any, value: any, callback: Fn) => {
    if (/^(0|[1-9][0-9]*)$/.test(value) || !value) {
      callback()
    } else {
      return callback(new Error('请输入正整数'))
    }
  }
}

// 不以开头
export function noStartWithRule(str: string) {
  return {
    validator: (_: any, value: any, callback: Fn) => {
      if (value && value.toString().startsWith(str)) {
        return callback(new Error(`不能以'${str}'开头`))
      } else {
        callback()
      }
    }
  }
}

// 长度
export function inputLength(len = 200) {
  return {
    validator: (_: any, value: any, callback: Fn) => {
      if (value.length > len) {
        return callback(new Error(`最大长度为${len}`))
      } else {
        callback()
      }
    }
  }
}

// 最大数值

export function maxNumber(max = 200) {
  return {
    validator: (_: any, value: any, callback: Fn) => {
      if (value <= max) {
        callback()
      } else {
        return callback(new Error(`输入的值不能超过${max}`))
      }
    }
  }
}

// 去重
export function isOnly(arr = [] as any[]) {
  return {
    validator: (_: any, value: any, callback: Fn) => {
      if (!arr.includes(value)) {
        callback()
      } else {
        return callback(new Error(`存在重复的值`))
      }
    }
  }
}

// 只能存在一个主键
export function isOnlyPrimary(arr = [] as any[], key = '', primary = '') {
  return {
    validator: (_: any, value: any, callback: Fn) => {
      const valArr = arr.map((item) => item[key])
      if (valArr.includes(value) && value === primary) {
        return callback(new Error(`只能存在一个主键`))
      } else {
        callback()
      }
    }
  }
}
