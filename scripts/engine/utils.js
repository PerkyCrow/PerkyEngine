
export function getUrlExt (url) {
    let withoutArgs = url.split('?').shift()
    return withoutArgs.split('.').pop().toLowerCase()
}


export function filterKeys (object, keys = []) {
    let filtered = {}

    for (let key of keys) {
        if (key in object) {
            filtered[key] = object[key]
        }
    }

    return filtered
}


export function interpolate (start, end, ratio) {
    return start + (end - start) * ratio
}


export const lerp = interpolate


export function clamp (value, min, max) {
    return Math.max(min, Math.min(max, value))
}


export function normalize (value, min, max) {
    return (value - min) / (max - min)
}


export function remap (value, sourceMin, sourceMax, destMin, destMax) { // eslint-disable-line max-params
    return destMin + ((destMax - destMin) * normalize(value, sourceMin, sourceMax))
}


export function smoothstep (value, start, end) {
    const ratio = clamp(normalize(value, start, end), 0, 1)
    return easeInOut(ratio)
}


export function linear (t) {
    return t
}


export function easeIn (t) {
    return t * t
}


export function easeOut (t) {
    return t * (2 - t)
}


export function easeInOut (t) {
    return t * t * (3 - 2 * t)
}


export function easeInCubic (t) {
    return t * t * t
}


export function easeOutCubic (t) {
    return (--t) * t * t + 1
}


export function easeInOutCubic (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}


export function easeInElastic (t) {
    return (0.04 - 0.04 / t) * Math.sin(25 * t) + 1
}


export function easeOutElastic (t) {
    return 0.04 * t / (--t) * Math.sin(25 * t)
}


export function easeInOutElastic (t) {
    return (t -= 0.5) < 0 ? (0.02 + 0.01 / t) * Math.sin(50 * t) : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1
}


export function easeInBounce (t) {
    return 1 - easeOutBounce(1 - t)
}


export function easeOutBounce (t) {
    if (t < 1 / 2.75) {
        return 7.5625 * t * t
    } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
    }
}


export function easeInOutBounce (t) {
    return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2
}


export const easingFunctions = {
    linear,
    easeIn,
    easeOut,
    easeInOut,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
    easeInElastic,
    easeOutElastic,
    easeInOutElastic,
    easeInBounce,
    easeOutBounce,
    easeInOutBounce
}


export function randomBetween (min, max) {
    return min + Math.random() * (max - min)
}


export function randomIntBetween (min, max) {
    return Math.floor(randomBetween(min, max))
}


export function randomPick (array) {
    return array[randomIntBetween(0, array.length)]
}


export function oneChanceIn (chance) {
    return randomIntBetween(0, chance) === 0
}


export function weightedChoice (choices) {
    const totalWeight = choices.reduce((total, choice) => total + choice.weight, 0)

    let random = Math.random() * totalWeight

    for (let choice of choices) {
        random -= choice.weight

        if (random <= 0) {
            return choice.value
        }
    }

    return choices[choices.length - 1].value
}


export function sum (numbers) {
    return numbers.reduce((previous, current) => previous + current, 0)
}


export function pluck (array, key) {
    return array.map(item => item[key])
}


export function compact (array) {
    return array.filter(element => element !== null && typeof element !== 'undefined')
}


export function formatNumber (number) {
    return number.toLocaleString(undefined, {})
}


export function numberToRoman (number) {
    let roman = ''
    let i

    let romanNumList = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    }

    for (i in romanNumList) {
        while (number >= romanNumList[i]) {
            roman += i
            number -= romanNumList[i]
        }
    }

    return roman
}


export function compileText (text, data = {}) {
    let compiled = text

    Object.keys(data).forEach(key => {
        compiled = compiled.replace(new RegExp(`{{${key}}}`, 'g'), data[key])
    })

    return compiled
}


export function distanceTo ({x: xA, y: yA}, {x: xB, y: yB}) {
    const dx = xB - xA
    const dy = yB - yA

    return Math.sqrt(dx * dx + dy * dy)
}
