import Animation from './animation'


export default class AnimationSequence extends Animation {

    constructor (params = {}) {
        super(params)

        this.duration = 0
        this.tracks = []

        registerEvents(this)

        if (Array.isArray(params.tracks)) {
            const tracks = Array.from(params.tracks)
            tracks.forEach(track => this.addTrack(track))
        }
    }


    addTrack (params = {}) {
        if (typeof params.change === 'function' && typeof params.getter === 'function') {
            return this.create('AnimationPropertyTrack', params)
        }

        return this.create('AnimationTrack', params)
    }


    addPropertyTrack (params) {
        return this.create('AnimationPropertyTrack', params)
    }


    play (params) {
        const play = super.play(params)

        if (play) {
            this.tracks.forEach(track => track.play(params))
        }

        return play
    }


    syncDuration () {
        const track = getLongestTrack(this.tracks)
        this.duration = track ? track.duration : 0
    }

}



function registerEvents (sequence) {

    function syncDuration () {
        sequence.syncDuration()
    }


    sequence.on('attached:child', (track) => {
        if (track.isAnimationTrack) {
            sequence.tracks.push(track)
            sequence.emit('added:track', track)

            track.on('changed:duration', syncDuration)
            syncDuration()
        }
    })


    sequence.on('detached:child', (track) => {
        if (track.isAnimationTrack) {
            const index = sequence.tracks.indexOf(track)

            if (index !== -1) {
                sequence.tracks.splice(index, 1)
                sequence.emit('removed:track', track)

                track.off('changed:duration', syncDuration)
                syncDuration()
            }
        }
    })

}


function getLongestTrack (tracks) {
    return Array.from(tracks).sort((a, b) => b.duration - a.duration).shift()
}
