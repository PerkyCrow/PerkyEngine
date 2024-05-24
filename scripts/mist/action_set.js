import ActionSet from '../libs/action_set'
import {indexSorter} from '../libs/utils'


export default function (game) {

    const {board, workshop, lab, arsenal, vault, random} = game
    const actionSet = new ActionSet()
    const api = actionSet.getApi()
    const {set} = api


    set('start', (flow) => {
        if (!game.started) {

            game.started = true
            if (['win', 'lose'].includes(game.ended)) {
                flow.enqueue(game.ended)
            } else if (!game.saved) {
                flow.enqueue('addCluster')
                flow.enqueue('addCluster')
            }


            return true
        }

        return false
    })


    set('addCluster', (flow, params) => {
        if (game.ended) {
            return false
        }

        const build = lab.buildCluster(params, game)

        return workshop.addCluster(build)
    })


    set('rotateCluster', () => {
        const {currentCluster} = workshop

        if (currentCluster) {
            currentCluster.rotate()
        }

        return currentCluster
    })


    set('moveCluster', (flow, direction) => {
        const {currentCluster} = workshop
        if (direction && currentCluster) {
            if (direction === 'left') {
                currentCluster.moveLeft()
            } else if (direction === 'right') {
                currentCluster.moveRight()
            }
            return true
        }

        return false
    })


    set('dropCluster', (flow) => {
        const {currentCluster} = workshop

        const reagents = currentCluster.forBoard(board)

        for (let reagent of reagents) {
            if (!board.setReagent(reagent)) {
                return false
            }
        }

        flow.enqueue('chargeSkill', {name: 'madness'})
        flow.enqueue('applyRules')
        flow.enqueue('addCluster')

        return currentCluster
    })



    set('applyGravity', (flow, direction = 'down') => {
        return board.applyGravity(direction)
    })


    set('applyRules', async (flow) => {
        flow.enqueue('applyRulesRecursive')
        flow.enqueue('overflow')

        return true
    })


    set('applyRulesRecursive', async (flow) => {
        flow.enqueue('applyGravity')
        flow.enqueue('applyNextMerge')

        return true
    })


    set('overflow', (flow) => {
        if (board.overflowed) {
            flow.enqueue('lose', {overflowed: true})
            return true
        }

        return false
    })


    set('lose', (flow) => {
        game.lost = true
        flow.enqueue('end')

        return true
    })


    set('win', (flow) => {
        game.won = true
        flow.enqueue('end')

        return true
    })


    set('end', async (flow) => {
        await flow.triggerHooks('beforeEnd')
        game.ended = game.won ? 'win' : 'lose'

        return true
    })


    set('applyNextMerge', async (flow, {mergeLength = 3} = {}) => {
        const reagents = board.getNextMerge(mergeLength, lab)

        if (reagents) {
            flow.enqueue('mergeReagents', reagents)

            return reagents
        }

        return false
    })



    set('mergeReagents', async (flow, reagents = []) => {
        const {digest} = flow
        const {length} = reagents

        if (length) {

            const first = reagents.shift()
            const merge = {reagents, first, length}

            digest.merges = digest.merges || []
            digest.merges.push({name: first.name, length})

            flow.enqueue('evolveReagents', [first])
            flow.enqueue('clearReagents', reagents)

            flow.enqueue('chargeSkill', {
                name:   'ruin',
                charges: Math.max(length - 2, 1)
            })
    
            const chainsCount = Math.max(digest.merges.length - 1, 0)
    
            if (chainsCount > 0) {
                flow.enqueue('chargeSkill', {
                    name:   'contagion',
                    charges: Math.max(length - 2, 1)
                })
            }

            flow.enqueue('applyRulesRecursive')

            return merge
        }

        return false
    })


    set('removeReagents', (flow, reagents = []) => {
        const removed = []

        for (let reagent of reagents) {
            if (board.removeReagent(reagent)) {
                removed.push(reagent)
            }
        }

        if (removed.length) {
            return removed
        }

        return false
    })


    set('clearReagents', (flow, reagents = []) => {
        const cleared = []

        for (let reagent of reagents) {
            if (board.removeReagent(reagent)) {
                cleared.push(reagent)
            }
        }

        return cleared.length ? cleared : null
    })


    set('evolveReagents', async (flow, reagents = [], evolutionName) => {
        const evolved = []

        for (let reagent of reagents) {
            const reagentEvolutionName = evolutionName || lab.evolutionFor(reagent.name)

            if (board.evolveReagent(reagent, reagentEvolutionName)) {
                await flow.immediate('unlockReagent', reagentEvolutionName)
                evolved.push(reagent)
            }
        }

        return evolved.length ? evolved : null
    })


    set('unlockReagent', (flow, reagentName) => {
        return lab.unlock(reagentName)
    })


    set('chargeSkill', (flow, {name, charges = 1} = {}) => {
        if (arsenal.chargeSkill(name, charges)) {

            return arsenal.getSkill(name)
        }

        return false
    })


    set('activateSkill', (flow, skillName) => {
        if (typeof skillName === 'object') {
            skillName = skillName.name
        }
        if (arsenal.activateSkill(skillName)) {
            flow.enqueue(skillName)
            return arsenal.getSkill(skillName)
        }

        return false
    })


    set('ruin', (flow) => {
        const reagents = board.getReagents({random, count: 3})

        if (reagents.length > 0) {
            flow.enqueue('removeReagents', reagents)
            flow.enqueue('applyRules')
        }

        return true
    })


    set('contagion', (flow) => {
        const reagents = board.getReagents({
            sort:  indexSorter(lab.reagents),
            count: 3
        })

        if (reagents.length > 0) {
            flow.enqueue('evolveReagents', reagents)
            flow.enqueue('applyRules')
        }

        return true
    })


    set('digestAction', async (flow, {actionName}) => {
        const gameDigest = game.digest
        const digest = flow.digest

        const {merges = []} = digest

        digest.mergesCount = merges.length
        digest.chainsCount = Math.max(digest.mergesCount - 1, 0)
        digest[actionName] = 1


        for (let key in digest) {
            if (typeof digest[key] === 'number') {
                gameDigest[key] = gameDigest[key] || 0
                gameDigest[key] += digest[key]
            }
        }

        gameDigest.score = gameDigest.score || 0

        if (digest.mergesCount > 0) {
            const mergeScore = merges.reduce((score, merge) => {
                const index = lab.indexFor(merge.name) + 1
                return score + Math.ceil(Math.pow(index, 1.1) * merge.length)
            }, 0)

            const newScore = mergeScore * (digest.mergesCount + (digest.chainsCount + 1))
            gameDigest.score += newScore * 10
        }

        digest.action = actionName
        flow.enqueue('checkObjective')

        game.saved = true

        return digest
    })


    set('checkObjective', async (flow) => {
        if (lab.unlockedCount >= lab.count) {
            flow.enqueue('win')

            return true
        }

        return false
    })

    set('madness', async (flow) => {
        flow.enqueue('addCluster')
    })


    arsenal.skills.forEach((skill) => {
        set(skill.id, async (flow) => {
            const result = await skill.trigger(flow, game)

            if (result) {
                const artifacts = vault.getArtifacts({
                    skill: skill.id,
                    type:  'trigger'
                })

                artifacts.forEach(artifact => flow.enqueue(artifact.id))
            }

            return result
        })
    })


    vault.artifacts.forEach((artifact) => {
        set(artifact.id, async (flow) => {
            await artifact.trigger(flow, game)
        })
    })


    // initMadness(game, api)




    // removeNeglected: {
    //     after: ['updateBoard', 'updateWorkshop'],
    //     trigger (game) {
    //         const {lab} = game
    //         const neglected = Array.from(lab.neglected).reverse()
    //         for (let name of neglected) {
    //             lab.clear(name)
    //         }
    //         return neglected.length ? neglected : null
    //     }
    // },


    // updateLab: {
    //     after: ['updateWorkshop'],
    //     trigger (game) {
    //         const {lab, board} = game
    //         const neglected = Array.from(lab.neglected).reverse()
    //         let updated = false
    //         for (let name of neglected) {
    //             if (!board.has(name)) {
    //                 lab.clear(name)
    //                 updated = true
    //             }
    //         }
    //         return updated
    //     }
    // },


    // updateWorkshop: {
    //     trigger (game) {
    //         const {workshop, lab} = game
    //         const updated = []
    //         workshop.forEachReagent(reagent => {
    //             if (lab.isCleared(reagent.name)) {
    //                 reagent.name = game.weightedChoice(lab.choices)
    //                 updated.push(reagent.name)
    //             }
    //         })
    //         return updated.length ? updated : null
    //     }
    // },


    // updateBoard: {
    //     after: ['applyRules'],
    //     async trigger (game) {
    //         const {board, lab} = game
    //         const reagents = board.filter(reagent => lab.isCleared(reagent.name))
    //         return await this.trigger('removeReagents', {reagents})
    //     }
    // }



    return actionSet
}


