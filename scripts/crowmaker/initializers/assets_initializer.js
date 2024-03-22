import assets from 'engine/assets'

assets.add({
    name: 'crow_body_01',
    path: 'images/crowmaker/crow_body_01.png',
    type: 'texture'
})



for (let i = 1; i <= 3; i++) {
    assets.add({
        name: `crow_left_eye_0${i}`,
        path: `images/crowmaker/crow_left_eye_0${i}.png`,
        type: 'texture'
    })

    assets.add({
        name: `crow_right_eye_0${i}`,
        path: `images/crowmaker/crow_right_eye_0${i}.png`,
        type: 'texture'
    })
}

assets.add({
    name: 'crow_beak_01',
    path: 'images/crowmaker/crow_beak_01.png',
    type: 'texture'
})

