// Source: Toxilibs (toxicode.fr)

/* eslint-disable no-magic-numbers */
import alea from './embedded_extlibs/alea'

const allLetters = 'abcdefghijklmnopqrstuvwxyz'
const allUnmistakableLetters = 'defghijkmnpqrtuvwxyz'

const chars = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ${allLetters}`
const unmistakableChars = `${allUnmistakableLetters}23456789`

const lettersCount = allLetters.length
const unmistakableLettersCount = allUnmistakableLetters.length
const charsCount = chars.length



function getNewRandomAPI (initSeed) {
    let random = alea(initSeed)

    let currentSeed = initSeed

    // by default we use alea.min. Very fast (faster than the native), good quality
    // an alternative is xor4096. Quite fast (1.3 x slower than native), excellent quality
    // https://github.com/davidbau/seedrandom/tree/released/lib

    function setSeed (seed = generateSeed()) {
        currentSeed = seed
        random.setSeed(seed)
        return seed
    }

    function getSeed () {
        return currentSeed
    }


    function getState () {
        return random.state()
    }


    function setState (state) {
        random.setState(state)
    }


    function fork () {
        return getNewRandomAPI(getState())
    }


    function createNew (seed = generateSeed()) {
        return getNewRandomAPI(seed)
    }

    //****************************** BOOLEAN

    function oneChanceIn (chances) {
        return random() < 1 / chances
    }



    //****************************** NUMBERS

    function between (min, max) {
        return min + (max - min) * random()
    }


    //warning : min and max must be integers
    function intBetween (min, max) {
        return Math.floor(between(min, max + 1))
    }




    //****************************** LETTERS

    function letter () {
        return allLetters[intBetween(0, lettersCount - 1)]
    }


    function letters (count) {
        let s = ''
        for (let i = 0; i < count; i++) {
            s += letter()
        }
        return s
    }


    function unmistakableLetter () {
        return allUnmistakableLetters[intBetween(0, unmistakableLettersCount - 1)]
    }


    function unmistakableLetters (count) {
        let s = ''
        for (let i = 0; i < count; i++) {
            s += unmistakableLetter()
        }
        return s
    }



    //****************************** HASH & SEED



    function unmistakableHash (length = 10) {
        let result = ''
        for (let i = 0; i < length; i++) {
            result += unmistakableChars[intBetween(0, unmistakableChars.length - 1)]
        }
        return result
    }



    function hash (length = 10) {
        let result = ''

        for (let i = 0; i < length; i++) {
            result += chars[intBetween(0, charsCount - 1)]
        }
        return result
    }


    //****************************** ARRAYS

    function pick (...choices) {
        if (choices.length === 1) {
            choices = choices[0]
        }
        return choices[intBetween(0, choices.length - 1)]
    }


    function shuffleArray (array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(random() * (i + 1))
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }









    //****************************** GAUSSIAN RANDOM

    // 67% chances of being between value - variance and value + variance
    // Algo : polar form of the Box-Muller transformation
    // http://www.design.caltech.edu/erik/Misc/Gaussian.html

    // FIXME: maybe replace with Ziggurat algorithm or the Marsaglia polar method
    function around (value, variance) {

        let x1
        let x2
        let w = 2
        while (w >= 1) {
            x1 = 2 * random() - 1
            x2 = 2 * random() - 1
            w = x1 * x1 + x2 * x2
        }

        w = Math.sqrt(-2 * Math.log(w) / w)
        return value + x1 * w * variance

    }





    //****************************** WEIGHTED RANDOM


    // choices = [['apple', 2], ['banana', 1], ['peach', 10]]
    //        or  ['apple', 2], ['banana', 1], ['peach', 10]
    function weightedChoice (...choices) { //eslint-disable-line consistent-return
        if (choices.length === 1) {
            choices = choices[0]
        }

        let partialSums = []
        let weightSum = 0

        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i]
            weightSum += choice[1]
            partialSums.push(weightSum)
        }

        if (weightSum === 0) {
            throw new Error('impossible choice !')
        }

        let rand = random() * weightSum

        for (let i = 0; i < partialSums.length; i++) {
            if (rand < partialSums[i]) {
                return choices[i][0]
            }
        }
    }


    function getFastWeightedChooser (choices) {
        let labels = []
        let partialWeightSums = []
        let weightSum = 0
        choices.forEach(([label, weight]) => {
            labels.push(label)
            weightSum += weight
            partialWeightSums.push(weightSum)
        })

        return function fastWeightedChoice () { //eslint-disable-line consistent-return
            let rand = random() * weightSum
            for (let i = 0; i < partialWeightSums.length; i++) {
                if (rand < partialWeightSums[i]) {
                    return labels[i]
                }
            }
        }
    }



    let fairRandoms = {}

    //FIXME add more params to fine tune (but perhaps the only relevant is decayWeightPower ?)
    function fairChoice (choices, params = {}) {
        let {
            name = 'default'
        } = params
        let history = fairRandoms[name]

        let value
        if (history) {
            let stats = weightedStats(history)
            let balancedChoices = balanceWeights(stats, choices)
            value = weightedChoice(balancedChoices)
            history.push(value)
        } else {
            let index = intBetween(0, choices.length - 1)
            value = choices[index]
            fairRandoms[name] = [value]
        }

        return value
    }


    //FIXME add to doc
    function fairChoiceInt (min, max, params) {
        let choices = []
        for (let i = min; i <= max; i++) {
            choices.push(i)
        }
        return fairChoice(choices, params)
    }


    function resetFairChoice (name) {
        delete fairRandoms[name]
    }


    function resetAllFairChoices () {
        fairRandoms = {}
    }


    let decayWeightPower = -0.3

    function weightedStats (history) {
        let count = history.length
        let stats = {}
        for (let i = 1; i <= count; i++) {
            let value = history[count - i]
            stats[value] = (stats[value] || 0) + Math.pow(i, decayWeightPower)
        }
        return stats
    }



    function balanceWeights (stats, choices) {
        let balancedChoices = []

        //FIXME optimize when choices is very long
        let weightSum = 0

        for (let i = 0; i < choices.length; i++) {
            weightSum += stats[choices[i]] || 0
        }

        if (weightSum === 0) {
            weightSum = 1
        }

        let idealWeight = weightSum / choices.length
        for (let i = 0; i < choices.length; i++) {
            let choice = choices[i]
            let delta = ((stats[choice] || 0) - idealWeight)
            balancedChoices.push([
                choice,
                Math.max(0, idealWeight - delta) //FIXME find better formula
            ])
        }
        return balancedChoices
    }



    function randomAPI () {
        return random()
    }


    function overrideAroundWithEqual () { //useful in tests
        randomAPI.around = (value) => value
    }


    randomAPI.reset = setSeed
    randomAPI.setSeed = setSeed
    randomAPI.getSeed = getSeed
    randomAPI.getState = getState
    randomAPI.setState = setState
    randomAPI.generateSeed = generateSeed
    randomAPI.hash = hash

    randomAPI.oneChanceIn = oneChanceIn

    randomAPI.around = around

    randomAPI.overrideAroundWithEqual = overrideAroundWithEqual

    randomAPI.between = between
    randomAPI.intBetween = intBetween

    randomAPI.letter = letter
    randomAPI.letters = letters
    randomAPI.unmistakableLetter = unmistakableLetter
    randomAPI.unmistakableLetters = unmistakableLetters

    randomAPI.unmistakableHash = unmistakableHash

    randomAPI.shuffleArray = shuffleArray
    randomAPI.pick = pick

    randomAPI.weightedChoice = weightedChoice
    randomAPI.getFastWeightedChooser = getFastWeightedChooser

    randomAPI.fairChoice = fairChoice
    randomAPI.fairChoiceInt = fairChoiceInt
    randomAPI.resetFairChoice = resetFairChoice
    randomAPI.resetAllFairChoices = resetAllFairChoices


    randomAPI.createNew = createNew
    randomAPI.fork = fork


    return randomAPI

}


function generateSeed (length = 10) {
    let seed = ''

    for (let i = 0; i < length; i++) {
        seed += chars[Math.floor(Math.random() * charsCount)]
    }
    return seed
}



export default getNewRandomAPI(generateSeed())
