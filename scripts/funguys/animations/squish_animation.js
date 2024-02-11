
export default function useSquishAnimation (node) {

    node.squish = node.create('AnimationSequence', {
        tracks: [{
            label: 'scaleY',
            getter: () => node.scale.y,
            change: value => {
                node.scale.y = value
            },
            steps: [{
                duration: 0.25,
                easing: 'easeOut',
                target: 0.5
            }, {
                duration: 0.25,
                easing: 'easeInOut',
                target: 1.25
            }, {
                duration: 0.75,
                easing: 'easeOut',
                target: 1
            }]
        }, {
            label: 'scaleX',
            getter: () => node.scale.x,
            change: value => {
                node.scale.x = value
            },
            steps: [{
                duration: 0.25,
                easing: 'easeOut',
                target: 1.5
            }, {
                duration: 0.25,
                easing: 'easeInOut',
                target: 0.75
            }, {
                duration: 0.75,
                easing: 'easeOut',
                target: 1
            }]
        }]
    })

}
