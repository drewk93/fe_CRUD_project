$(document).ready(function(){
    const $planeBtn = $('#planeBtn')
    const $manuBtn = $('#manuBtn')
    
    $planeBtn.on('click', getPlane);
    $manuBtn.on('click', getManu)

    function getPlane() {
        console.log("getPlane Working")
        const url = "http://localhost:3000/planes"

        $.get(url, (data) => {
            data.forEach((item, index) => {
                console.log(item);
            })
        })
    }

    function getManu(){
        console.log("getManu Working")
        const url = "http://localhost:3000/manufacturers"

        $.get(url,(data) => {
            data.forEach((item, index) =>{
                console.log(item)
            })
        })
    }

})