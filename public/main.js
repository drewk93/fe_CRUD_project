$(document).ready(function(){
    // READ
    const $planeBtn = $('#planeBtn')
    const $manuBtn = $('#manuBtn')
    const $fetchResults = $('#fetchResults')
    // CREATE
    const $postPlaneBtn = $('#postPlaneBtn');
    const $postManuBtn = $('#postManuBtn')
    // UPDATE
    const $patchPlaneBtn = $("#patchPlaneBtn")
    const $patchManuBtn = $("#patchManuBtn")
    // DELETE
    const $deletePlaneBtn  = $('#deletePlaneBtn')
    
    
    


    // READ
    $planeBtn.on('click', getPlane);
    $manuBtn.on('click', getManu)
    // CREATE
    $postPlaneBtn.on('click', postPlane);
    $postManuBtn.on('click', postManufacturers)
    // DELETE
    $deletePlaneBtn.on('click', deletePlane)
    // UPDATE
    $patchPlaneBtn.on('click', patchPlane)
    $patchManuBtn.on('click', patchManu)


    // READ FUNCTIONS

    function getPlane() {
        console.log("getPlane Working");
        $fetchResults.empty();
    
        const url = "http://localhost:3000/planes";
    
        $.ajax({
            url,
            type: "GET",
            success: function (data) {
                data.forEach((item, index) => {
                    
                    console.log(item)
                    $fetchResults.append(`<li class='plane-item'><b>id:</b> ${item.id} <b> model:</b> ${item.model} <b>tail number:</b> ${item.tail_number}</li>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching planes:", error);
            },
        });
    }
      
      function getManu() {
        console.log("getManu Working");
        $fetchResults.empty()

        const url = "http://localhost:3000/manufacturers";
      
        $.ajax({
          url,
          type: "GET",
          success: function (data) {
            data.forEach((item, index) => {
              console.log(item);
              $fetchResults.append(`<li class='manufacturer-item'><b>id:</b> ${item.id} <b> name:</b> ${item.name} <b>country:</b> ${item.country}</li>`);
            });
          },
          error: function (xhr, status, error) {
            console.error("Error fetching manufacturers:", error);
          },
        });
      }

      // CREATE FUNCTIONS

    function postPlane() {
        console.log('postPlane Working');
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
            console.log('Plane posted:', data);
          },
          error: function (xhr, status, error) {
            console.error('Error creating plane:', error);
          },
        });
      }


      
  function postManufacturers() {
    console.log('postManufacturers Working');
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
        console.log('Manufacturer posted:', data);
      },
      error: function (xhr, status, error) {
        console.error('Error creating manufacturer:', error);
      },
    });
  }

  // PATCH/UPDATE FUNCTIONS

  function patchPlane() {
    console.log('patchPlane Working');
    const idToPatch = $('#planeIdToPatch').val();
    const url = `http://localhost:3000/planes/${idToPatch}`;
    const patchedPlane = {
      id: idToPatch,
      model: $('#patchedPlaneModel').val(),
      tail_number: $('#patchedPlaneTailNumber').val(),
      manufacturer_id: $('#patchedPlaneManufacturerId').val(),
    };
  
    try {
      const response = $.ajax({
        url,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(patchedPlane),
      });
    } catch (error) {
      console.error('Error updating plane:', error);
      console.log('Failed to patch plane:', patchedPlane)
    }
  }

  function patchManu() {
    console.log('patchPlane Working');
    const idToPatch = $('#manuIdToPatch').val()
    const url = `http://localhost:3000/manufacturers/${idToPatch}`;
    const patchedManu = {
        id: idToPatch,
        name: $('#patchedManuName').val(),
        country: $('#patchedManuCountry').val()
    }

    try {
        const response = $.ajax({
            url,
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(patchedManu),
        });
    } catch (error){
        console.error('Error updating manu:', error)
        console.error('Failed to patch plane:', patchedManu );
    }
  }


    // DELETE FUNCTIONS
 function deletePlane() {
        console.log('deletePlane Working');
        const $planeIdToDelete = $('#planeIdToDelete').val()
        const url = `http://localhost:3000/planes/${$planeIdToDelete}`;

        try {
        $.ajax({
            url,
            type: 'DELETE',
            success: function (data) {
                console.log('Plane deleted:', data);
            },
            error: function (xhr, status, error) {
                console.error('Error deleting plane:', error);
            },
        });
        }catch (error){
            console.error('Error deleting plane:', error)
          
        }
    }

})