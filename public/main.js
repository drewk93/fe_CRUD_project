$(document).ready(function(){
    const $planeBtn = $('#planeBtn')
    const $manuBtn = $('manuBtn')
    
    $planeBtn.on('click', getPlane);


    function getPlane() {
        console.log("getPlane Working")
        const url = "http://localhost:3000/planes"

        $.get(url, (data) => {
            data.forEach((item, index) => {
                console.log(item);
            })
        })
    }

})