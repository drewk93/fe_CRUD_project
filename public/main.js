$(document).ready(function(){
    const $planeBtn = $('#planeBtn')
    const $manuBtn = $('#manuBtn')
    const $createPlaneBtn = $('#createPlaneBtn');

    $planeBtn.on('click', getPlane);
    $manuBtn.on('click', getManu)
    $createPlaneBtn.on('click', createPlane);

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


    function createPlane() {
        console.log('createPlane Working');
        const url = 'http://localhost:3000/planes';
    
        const newPlane = {
            model: $('#planeModel').val(),
            tail_number: $('#planeTailNumber').val(),
            manufacturer_id: $('#planeManufacturerId').val(),
        };
    
        $.ajax({
          url,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(newPlane),
          success: function (data) {
            console.log('Plane created:', data);
          },
          error: function (xhr, status, error) {
            console.error('Error creating plane:', error);
          },
        });
      }

})