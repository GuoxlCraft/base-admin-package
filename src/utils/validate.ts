const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

// 验证网址
export function isExternal(path: any): boolean {
  return /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(
    path
  )
}

// 验证邮箱
export function isEmail(path: any): boolean {
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(path)
}

// 验证手机
export function isPhone(tel: any): boolean {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(tel)
}

// 验证身份证号
export function isIdCard(id: any): boolean {
  return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    id
  )
}

// 验证固定电话
export function isTel(tel: any): boolean {
  return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(tel)
}

// 验证数字
export function isNum(num: any): boolean {
  return /^[0-9]*$/.test(num)
}

// 验证数字
export function isFloatNum(num: any): boolean {
  return /^(-?\d+)(\.\d+)?$/.test(num)
}

// 验证邮编
export function isCode(num: any): boolean {
  return /[1-9]\d{5}(?!\d)/.test(num)
}

// 验证IP
export function isIP(val: any): boolean {
  return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
    val
  )
}

// 正整数
export function isInteger(num: any): boolean {
  return /^[1-9]\d*$/.test(num)
}

// 英文
export function isEnglish(str: any): boolean {
  return /^[A-Za-z_]+$/.test(str)
}

// 中文
export function isChinese(str: any): boolean {
  return /[\u4E00-\u9FA5]/g.test(str)
}

// 不是浏览器环境
export const isServer = typeof window === 'undefined'

// 是否是对象
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

// 是否是火狐
export const isFirefox = function () {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i)
}

// 是否是字符串
export function isString(val: unknown): val is string {
  return is(val, 'String')
}

// 字母 下划线 数字，并且不能以数字开头
export function isAny(str) {
  return /^[a-zA-Z][0-9a-zA-Z_]{0,}$/.test(str)
}

// 不能以开头
export function noStartWith(str, key) {
  return str && str.toString().startsWith(key)
}

// 小写字母 下划线 数字，并且不能以数字开头
export function isLowerCaseAny(str) {
  return /^[a-z_][0-9a-z_]{0,}$/.test(str)
}

// 时间格式符合 yyyy-MM-dd HH:mm:ss
export function isDateTimeFormat(str) {
  return /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/.test(
    str
  )
}
// 时间格式符合 yyyy-MM-dd
export function isDateFormat(str) {
  return /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])))?$/.test(
    str
  )
}

// 小写字母 下划线 数字，并且不能以数字开头
export function isKeyword(str) {
  const keywords: string[] = [
    'ACCESSIBLE',
    'ADD',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'AS',
    'ASC',
    'ASENSITIVE',
    'BEFORE',
    'BETWEEN',
    'BIGINT',
    'BINARY',
    'BLOB',
    'BOTH',
    'BY',
    'CALL',
    'CASCADE',
    'CASE',
    'CHANGE',
    'CHAR',
    'CHARACTER',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'CONDITION',
    'CONSTRAINT',
    'CONTINUE',
    'CONVERT',
    'CREATE',
    'CROSS',
    'CUBE',
    'CUME_DIST',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURSOR',
    'DATABASE',
    'DATABASES',
    'DAY_HOUR',
    'DAY_MICROSECOND',
    'DAY_MINUTE',
    'DAY_SECOND',
    'DEC',
    'DECIMAL',
    'DECLARE',
    'DEFAULT',
    'DELAYED',
    'DELETE',
    'DENSE_RANK',
    'DESC',
    'DESCRIBE',
    'DETERMINISTIC',
    'DISTINCT',
    'DISTINCTROW',
    'DIV',
    'DOUBLE',
    'DROP',
    'DUAL',
    'EACH',
    'ELSE',
    'ELSEIF',
    'EMPTY',
    'ENCLOSED',
    'ESCAPED',
    'EXCEPT',
    'EXISTS',
    'EXIT',
    'EXPLAIN',
    'N',
    'FETCH',
    'FIRST_VALUE',
    'FLOAT',
    'FLOAT4',
    'FLOAT8',
    'FOR',
    'FORCE',
    'FOREIGN',
    'FROM',
    'FULLTEXT',
    'FUNCTION',
    'GENERATED',
    'GET',
    'GRANT',
    'GROUP',
    'GROUPING',
    'GROUPS',
    'HAVING',
    'HIGH_PRIORITY',
    'HOUR_MICROSECOND',
    'HOUR_MINUTE',
    'HOUR_SECOND',
    'IF',
    'IGNORE',
    'IN',
    'INDEX',
    'INFILE',
    'INNER',
    'INOUT',
    'INSENSITIVE',
    'INSERT',
    'INT',
    'INT1',
    'INT2',
    'INT3',
    'INT4',
    'INT8',
    'INTEGER',
    'INTERVAL',
    'INTO',
    'IO_AFTER_GTIDS',
    'IO_BEFORE_GTIDS',
    'IS',
    'ITERATE',
    'JOIN',
    'JSON_TABLE',
    'KEY',
    'KEYS',
    'KILL',
    'LAG',
    'LAST_VALUE',
    'LATERAL',
    'LEAD',
    'LEADING',
    'LEAVE',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LINEAR',
    'LINES',
    'LOAD',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCK',
    'LONG',
    'LONGBLOB',
    'LONGTEXT',
    'LOOP',
    'LOW_PRIORITY',
    'MASTER_BIND',
    'MASTER_SSL_VERIFY_SERVER_CERT',
    'MATCH',
    'MAXVALUE',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MEDIUMTEXT',
    'MIDDLEINT',
    'MINUTE_MICROSECOND',
    'MINUTE_SECOND',
    'MOD',
    'MODIFIES',
    'NATURAL',
    'NOT',
    'NO_WRITE_TO_BINLOG',
    'NTH_VALUE',
    'NTILE',
    'NULL',
    'NUMERIC',
    'OF',
    'ON',
    'OPTIMIZE',
    'OPTIMIZER_COSTS',
    'OPTION',
    'OPTIONALLY',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OUTFILE',
    'OVER',
    'PARTITION',
    'PERCENT_RANK',
    'PRECISION',
    'PRIMARY',
    'PROCEDURE',
    'PURGE',
    'RANGE',
    'RANK',
    'READ',
    'READS',
    'READ_WRITE',
    'REAL',
    'RECURSIVE',
    'REFERENCES',
    'REGEXP',
    'RELEASE',
    'RENAME',
    'REPEAT',
    'REPLACE',
    'REQUIRE',
    'RESIGNAL',
    'RESTRICT',
    'RETURN',
    'REVOKE',
    'RIGHT',
    'RLIKE',
    'ROW',
    'ROWS',
    'ROW_NUMBER',
    'SCHEMA',
    'SCHEMAS',
    'SECOND_MICROSECOND',
    'SELECT',
    'SENSITIVE',
    'SEPARATOR',
    'SET',
    'SHOW',
    'SIGNAL',
    'SMALLINT',
    'SPATIAL',
    'SPECIFIC',
    'SQL',
    'SQLEXCEPTION',
    'SQLSTATE',
    'SQLWARNING',
    'SQL_BIG_RESULT',
    'SQL_CALC_FOUND_ROWS',
    'SQL_SMALL_RESULT',
    'SSL',
    'STARTING',
    'STORED',
    'STRAIGHT_JOIN',
    'SYSTEM',
    'TABLE',
    'TERMINATED',
    'THEN',
    'TINYBLOB',
    'TINYINT',
    'TINYTEXT',
    'TO',
    'TRAILING',
    'TRIGGER',
    'Y',
    'UNDO',
    'UNION',
    'UNIQUE',
    'UNLOCK',
    'UNSIGNED',
    'UPDATE',
    'USAGE',
    'USE',
    'USING',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    'VALUES',
    'VARBINARY',
    'VARCHAR',
    'VARCHARACTER',
    'VARYING',
    'VIRTUAL',
    'WHEN',
    'WHERE',
    'WHILE',
    'WINDOW',
    'WITH',
    'WRITE',
    'XOR',
    'YEAR_MONTH',
    'ZEROFILL',
    'DROP',
    'UNIQUE',
    'FOR',
    'BETWEEN',
    'IS',
    'NOWAIT',
    'ELSE',
    'INTO',
    'DATE',
    'FROM',
    'IDENTIFIED',
    'ASC',
    'CLUSTER',
    'RAW',
    'RESOURCE',
    'WITH',
    'SET',
    'PRIOR',
    'BY',
    'SELECT',
    'OR',
    'START',
    'DEFAULT',
    'OPTION',
    'SHARE',
    'DECIMAL',
    'INDEX',
    'SIZE',
    'DISTINCT',
    'DESC',
    'GRANT',
    'VARCHAR',
    'FLOAT',
    'TRIGGER',
    'ON',
    'IN',
    'VARCHAR2',
    'COMPRESS',
    'ANY',
    'TABLE',
    'AS',
    'HAVING',
    'ALL',
    'NULL',
    'PUBLIC',
    'INTERSECT',
    'THEN',
    'VIEW',
    'SYNONYM',
    'OF',
    'CHAR',
    'CREATE',
    'ORDER',
    'ALTER',
    'TO',
    'MODE',
    'EXCLUSIVE',
    'AND',
    'REVOKE',
    'LONG',
    'RENAME',
    'NOT',
    'CONNECT',
    'EXISTS',
    'VALUES',
    'GROUP',
    'NUMBER',
    'NOCOMPRESS',
    'INTEGER',
    'LOCK',
    'UNION',
    'MINUS',
    'PCTFREE',
    'UPDATE',
    'INSERT',
    'SMALLINT',
    'LIKE',
    'DELETE',
    'WHERE',
    'CHECK',
    'ALL',
    'ANALYSE',
    'ANALYZE',
    'AND',
    'ANY',
    'ARRAY',
    'AS',
    'ASC',
    'ASYMMETRIC',
    'BOTH',
    'CASE',
    'CAST',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'CONSTRAINT',
    'CREATE',
    'CURRENT_CATALOG',
    'CURRENT_DATE',
    'CURRENT_ROLE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'DEFAULT',
    'DEFERRABLE',
    'DESC',
    'DISTINCT',
    'DO',
    'ELSE',
    'END',
    'EXCEPT',
    'N',
    'FETCH',
    'FOR',
    'FOREIGN',
    'FROM',
    'GRANT',
    'GROUP',
    'HAVING',
    'IN',
    'INITIALLY',
    'INTERSECT',
    'INTO',
    'LATERAL',
    'LEADING',
    'LIMIT',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'NOT',
    'NULL',
    'OFFSET',
    'ON',
    'ONLY',
    'OR',
    'ORDER',
    'PLACING',
    'PRIMARY',
    'REFERENCES',
    'RETURNING',
    'SELECT',
    'SESSION_USER',
    'SOME',
    'SYMMETRIC',
    'TABLE',
    'THEN',
    'TO',
    'TRAILING',
    'Y',
    'UNION',
    'UNIQUE',
    'USER',
    'USING',
    'VARIADIC',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH'
  ]
  const v = str ? str.toString().toLocaleUpperCase() : ''
  return keywords.includes(v)
}
