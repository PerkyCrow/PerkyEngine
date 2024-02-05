import Animation from './animation'
import AnimationTrack from './animation_track'


export default class AnimationSequence extends Animation {

    initialize () {
        this.tracks = []

        if (Array.isArray(this.constructor.tracks)) {
            const tracks = Array.from(this.constructor.tracks)
            tracks.forEach(track => this.addTrack(track))
        }
    }


    get duration () {
        const longest = Array.from(this.tracks).sort((a, b) => b.duration - a.duration).shift()
        return longest ? longest.duration : 0
    }


    set duration (duration) {
        super.duration = duration
    }


    addTrack (track = {}) {
        track = Object.assign({}, track, {parent: this})

        if (!(track instanceof AnimationTrack)) {
            track = new AnimationTrack(track)
        }

        this.tracks.push(track)

        return track
    }


    start (params) {
        this.tracks.forEach(track => track.play(params))
    }


    update (deltaTime) {
        this.tracks.forEach(track => track.tick(deltaTime))
    }

}
