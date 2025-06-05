/**
 * 时间格式化选项接口
 */
export interface TimeFormatOptions {
    /**
     * 是否使用24小时制，默认为 true
     * - true: 24小时制 (00-23)
     * - false: 12小时制 (01-12 AM/PM)
     */
    use24Hour?: boolean;

    /**
     * 时区，可以是以下格式：
     * - IANA时区名称，如 'Asia/Shanghai'
     * - UTC偏移量，如 '+08:00'
     * - 'local': 使用本地时区（默认值）
     * - 'UTC': 使用UTC时间
     */
    timezone?: string;

    /**
     * 日期分隔符，默认为 '-'
     */
    dateSeparator?: string;

    /**
     * 时间分隔符，默认为 ':'
     */
    timeSeparator?: string;

    /**
     * 是否显示毫秒，默认为 true
     */
    showMilliseconds?: boolean;
    
    /**
     * 日期格式，默认为 'YYYY-MM-DD HH:mm:ss.SSS'
     * 可选值: 'full' (完整格式), 'date' (仅日期), 'time' (仅时间)
     */
    format?: 'full' | 'date' | 'time';
}

/**
 * 获取当前时间的格式化字符串，支持时区和自定义格式
 * 增强的跨浏览器兼容性版本
 * 
 * 格式：YYYY-MM-DD HH:mm:ss.SSS
 * 默认格式示例：2024-03-15 14:30:25.789
 * 
 * 特点：
 * 1. 增强的跨浏览器兼容性
 * 2. 兼容旧版浏览器的时区处理
 * 3. 更健壮的错误处理
 * 4. 支持自定义格式
 * 
 * 使用示例：
 * ```typescript
 * // 默认格式（本地时区，24小时制）
 * const time1 = now();
 * console.log(time1); // 2024-03-15 14:30:25.789
 * 
 * // 仅显示日期部分
 * const dateOnly = now({ format: 'date' });
 * console.log(dateOnly); // 2024-03-15
 * 
 * // 仅显示时间部分
 * const timeOnly = now({ format: 'time' });
 * console.log(timeOnly); // 14:30:25.789
 * 
 * // 使用12小时制
 * const time2 = now({ use24Hour: false });
 * console.log(time2); // 2024-03-15 02:30:25.789 PM
 * 
 * // 指定上海时区
 * const time3 = now({ timezone: 'Asia/Shanghai' });
 * console.log(time3); // 2024-03-15 20:30:25.789
 * 
 * // 自定义格式
 * const time4 = now({
 *   dateSeparator: '/',
 *   timeSeparator: '-',
 *   showMilliseconds: false
 * });
 * console.log(time4); // 2024/03/15 14-30-25
 * ```
 * 
 * @param options 格式化选项
 * @return {string} 返回格式化后的时间字符串
 */
export function now(options: TimeFormatOptions = {}): string {
    const {
        use24Hour = true,
        timezone = 'local',
        dateSeparator = '-',
        timeSeparator = ':',
        showMilliseconds = true,
        format = 'full'
    } = options;

    // 创建Date对象
    const date = new Date();
    
    try {
        // 根据时区和指定格式返回时间
        return formatDateWithTimezone(
            date,
            {
                use24Hour,
                timezone,
                dateSeparator,
                timeSeparator,
                showMilliseconds,
                format
            }
        );
    } catch (error) {
        // 错误处理：如果格式化失败，使用备用方案
        console.warn(`时间格式化错误: ${error instanceof Error ? error.message : String(error)}, 使用备用格式`);
        return getFallbackTimeString(date, use24Hour, dateSeparator, timeSeparator, showMilliseconds, format);
    }
}

/**
 * 根据时区格式化日期
 * 采用多种策略处理时区，以提高兼容性
 */
function formatDateWithTimezone(date: Date, options: Required<TimeFormatOptions>): string {
    const {
        use24Hour,
        timezone,
        dateSeparator,
        timeSeparator,
        showMilliseconds,
        format
    } = options;

    // 本地时区直接格式化
    if (timezone === 'local') {
        return formatDateByParts(date, use24Hour, dateSeparator, timeSeparator, showMilliseconds, format, false);
    }
    
    // UTC时间直接使用UTC方法
    if (timezone === 'UTC') {
        return formatDateByParts(date, use24Hour, dateSeparator, timeSeparator, showMilliseconds, format, true);
    }

    // 处理特定时区
    // 首先尝试使用Intl API (最现代的方法)
    try {
        if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
            return formatDateUsingIntl(date, timezone, use24Hour, dateSeparator, timeSeparator, showMilliseconds, format);
        }
    } catch (e) {
        // Intl可能不支持某些时区，继续尝试其他方法
        console.warn(`Intl.DateTimeFormat不支持时区"${timezone}"或者在当前环境不可用`);
    }

    // 备用方法1：解析UTC偏移量（如+08:00）
    if (/^[+-]\d{2}:\d{2}$/.test(timezone)) {
        try {
            return formatDateWithUTCOffset(date, timezone, use24Hour, dateSeparator, timeSeparator, showMilliseconds, format);
        } catch (e) {
            console.warn(`使用UTC偏移量"${timezone}"格式化失败`);
        }
    }

    // 备用方法2：回退到本地时间但添加时区警告
    console.warn(`不支持的时区"${timezone}"，回退到本地时间`);
    return formatDateByParts(date, use24Hour, dateSeparator, timeSeparator, showMilliseconds, format, false);
}

/**
 * 使用Intl.DateTimeFormat格式化日期（最现代的方法，但可能不支持所有环境）
 */
function formatDateUsingIntl(
    date: Date,
    timezone: string,
    use24Hour: boolean,
    dateSeparator: string,
    timeSeparator: string,
    showMilliseconds: boolean,
    format: 'full' | 'date' | 'time'
): string {
    // 使用Intl.DateTimeFormat处理时区和格式
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: format !== 'time' ? 'numeric' : undefined,
        month: format !== 'time' ? '2-digit' : undefined,
        day: format !== 'time' ? '2-digit' : undefined,
        hour: format !== 'date' ? '2-digit' : undefined,
        minute: format !== 'date' ? '2-digit' : undefined,
        second: format !== 'date' ? '2-digit' : undefined,
        hour12: !use24Hour
    });
    
    // 获取格式化后的各部分
    const parts = formatter.formatToParts(date);
    const values: { [key: string]: string } = {};
    parts.forEach(part => {
        values[part.type] = part.value;
    });

    // 根据需要的格式构建结果
    let result = '';
    
    // 添加日期部分
    if (format !== 'time') {
        const year = values.year || String(date.getFullYear());
        const month = values.month || padZero(date.getMonth() + 1);
        const day = values.day || padZero(date.getDate());
        
        result += [year, month, day].join(dateSeparator);
    }
    
    // 添加时间部分
    if (format !== 'date') {
        let hour = values.hour || '';
        if (use24Hour && values.dayPeriod) {
            // 转换为24小时制
            hour = String(convert12To24(hour, values.dayPeriod));
        }
        
        const minute = values.minute || padZero(date.getMinutes());
        const second = values.second || padZero(date.getSeconds());
        
        const timeStr = [
            padZero(hour || '0'),
            padZero(minute || '0'),
            padZero(second || '0')
        ].join(timeSeparator);
        
        // 如果既有日期又有时间，添加空格分隔
        if (format === 'full') {
            result += ' ';
        }
        
        result += timeStr;
        
        // 添加毫秒
        if (showMilliseconds) {
            result += '.' + padZero(date.getMilliseconds(), 3);
        }
        
        // 添加AM/PM（如果使用12小时制）
        if (!use24Hour && values.dayPeriod) {
            result += ' ' + values.dayPeriod;
        }
    }

    return result;
}

/**
 * 使用UTC偏移量格式化日期
 * 例如："+08:00" 表示 UTC+8 时区
 */
function formatDateWithUTCOffset(
    date: Date,
    utcOffset: string,
    use24Hour: boolean,
    dateSeparator: string,
    timeSeparator: string,
    showMilliseconds: boolean,
    format: 'full' | 'date' | 'time'
): string {
    // 解析UTC偏移量
    const match = utcOffset.match(/^([+-])(\d{2}):(\d{2})$/);
    if (!match) {
        throw new Error(`无效的UTC偏移量: ${utcOffset}`);
    }
    
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);
    const offsetMinutes = sign * (hours * 60 + minutes);
    
    // 获取当前UTC时间戳，并应用偏移
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset();
    const targetTime = localTime + (localOffset + offsetMinutes) * 60000;
    
    // 创建目标时区的日期对象
    const targetDate = new Date(targetTime);
    
    // 使用本地方法格式化，但使用调整后的日期对象
    return formatDateByParts(targetDate, use24Hour, dateSeparator, timeSeparator, showMilliseconds, format, false);
}

/**
 * 根据日期的各个部分进行格式化
 */
function formatDateByParts(
    date: Date,
    use24Hour: boolean,
    dateSeparator: string,
    timeSeparator: string,
    showMilliseconds: boolean,
    format: 'full' | 'date' | 'time',
    useUTC: boolean
): string {
    let result = '';
    
    // 获取日期各部分
    const getDatePart = (partFunc: () => number) => partFunc.call(date);
    
    // 根据是否使用UTC选择适当的方法
    const getYear = useUTC ? getDatePart.bind(null, date.getUTCFullYear) : getDatePart.bind(null, date.getFullYear);
    const getMonth = useUTC ? getDatePart.bind(null, date.getUTCMonth) : getDatePart.bind(null, date.getMonth);
    const getDate = useUTC ? getDatePart.bind(null, date.getUTCDate) : getDatePart.bind(null, date.getDate);
    const getHours = useUTC ? getDatePart.bind(null, date.getUTCHours) : getDatePart.bind(null, date.getHours);
    const getMinutes = useUTC ? getDatePart.bind(null, date.getUTCMinutes) : getDatePart.bind(null, date.getMinutes);
    const getSeconds = useUTC ? getDatePart.bind(null, date.getUTCSeconds) : getDatePart.bind(null, date.getSeconds);
    const getMilliseconds = useUTC ? getDatePart.bind(null, date.getUTCMilliseconds) : getDatePart.bind(null, date.getMilliseconds);
    
    // 添加日期部分
    if (format !== 'time') {
        result = [
            padZero(getYear(), 4),
            padZero(getMonth() + 1),
            padZero(getDate())
        ].join(dateSeparator);
    }
    
    // 添加时间部分
    if (format !== 'date') {
        let hours = getHours();
        const ampm = hours >= 12 ? ' PM' : ' AM';
        
        if (!use24Hour) {
            hours = convert24To12(hours);
        }
        
        const timeStr = [
            padZero(hours),
            padZero(getMinutes()),
            padZero(getSeconds())
        ].join(timeSeparator);
        
        // 如果既有日期又有时间，添加空格分隔
        if (format === 'full') {
            result += ' ';
        }
        
        result += timeStr;
        
        // 添加毫秒
        if (showMilliseconds) {
            result += '.' + padZero(getMilliseconds(), 3);
        }
        
        // 添加AM/PM（如果使用12小时制）
        if (!use24Hour) {
            result += ampm;
        }
    }
    
    return result;
}

/**
 * 备用的时间字符串生成器，用于最大兼容性
 */
function getFallbackTimeString(
    date: Date,
    use24Hour: boolean,
    dateSeparator: string,
    timeSeparator: string,
    showMilliseconds: boolean,
    format: 'full' | 'date' | 'time'
): string {
    // 最简单的备用方案，使用内置方法组合
    let result = '';
    
    // 日期部分
    if (format !== 'time') {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        result = `${year}${dateSeparator}${padZero(month)}${dateSeparator}${padZero(day)}`;
    }
    
    // 时间部分
    if (format !== 'date') {
        let hours = date.getHours();
        const ampm = hours >= 12 ? ' PM' : ' AM';
        
        if (!use24Hour) {
            hours = convert24To12(hours);
        }
        
        const timeStr = `${padZero(hours)}${timeSeparator}${padZero(date.getMinutes())}${timeSeparator}${padZero(date.getSeconds())}`;
        
        // 添加分隔
        if (format === 'full') {
            result += ' ';
        }
        
        result += timeStr;
        
        // 添加毫秒
        if (showMilliseconds) {
            result += '.' + padZero(date.getMilliseconds(), 3);
        }
        
        // 添加AM/PM（如果使用12小时制）
        if (!use24Hour) {
            result += ampm;
        }
    }
    
    return result;
}

/**
 * 把24小时制转换为12小时制
 */
function convert24To12(hour: number): number {
    if (hour === 0) return 12;
    if (hour > 12) return hour - 12;
    return hour;
}

/**
 * 把12小时制转换为24小时制
 */
function convert12To24(hour: string, period?: string): number {
    let hourNum = parseInt(hour, 10);
    
    // 处理NaN情况
    if (isNaN(hourNum)) {
        return 0;
    }
    
    // 确保小时值在有效范围内
    hourNum = Math.max(0, Math.min(23, hourNum));
    
    if (period === 'PM' && hourNum !== 12) {
        hourNum += 12;
    } else if (period === 'AM' && hourNum === 12) {
        hourNum = 0;
    }
    
    return hourNum;
}

/**
 * 数字补零
 * 更加健壮的实现，可处理各种输入类型
 */
function padZero(value: string | number, length: number = 2): string {
    // 确保value是字符串
    const strValue = String(value);
    
    // 如果值为NaN或无效，返回占位符
    if (value === null || value === undefined || (typeof value === 'number' && isNaN(value))) {
        return '0'.repeat(length);
    }
    
    return strValue.padStart(length, '0');
} 