$(document).ready(function(){
    const $planeBtn = $('#planeBtn')
    const $manuBtn = $('#manuBtn')
    const $createPlaneBtn = $('#createPlaneBtn');
    const $createManuBtn = $('#createManuBtn')

    $planeBtn.on('click', getPlane);
    $manuBtn.on('click', getManu)
    $createPlaneBtn.on('click', createPlane);
    $createManuBtn.on('click', createManufacturer)

    // READ FUNCTIONS

    function getPlane() {
        console.log("getPlane Working");
        const url = "http://localhost:3000/planes";
      
        $.ajax({
          url,
          type: "GET",
          success: function (data) {
            data.forEach((item, index) => {
              console.log(item);
            });
          },
          error: function (xhr, status, error) {
            console.error("Error fetching planes:", error);
          },
        });
      }
      
      function getManu() {
        console.log("getManu Working");
        const url = "http://localhost:3000/manufacturers";
      
        $.ajax({
          url,
          type: "GET",
          success: function (data) {
            data.forEach((item, index) => {
              console.log(item);
            });
          },
          error: function (xhr, status, error) {
            console.error("Error fetching manufacturers:", error);
          },
        });
      }

      // CREATE FUNCTIONS

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

      
  function createManufacturer() {
    console.log('createManufacturer Working');
    const url = 'http://localhost:3000/manufacturers';

    const newManufacturer = {
      name: $('#manuName').val(), // Replace with your desired values
      country: $('#manuCountry').val(), // Replace with your desired values
    };

    $.ajax({
      url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newManufacturer),
      success: function (data) {
        console.log('Manufacturer created:', data);
      },
      error: function (xhr, status, error) {
        console.error('Error creating manufacturer:', error);
      },
    });
  }

  


})