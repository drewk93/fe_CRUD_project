$(document).ready(function(){
    // READ
    const $planeBtn = $('#planeBtn');
    const $manuBtn = $('#manuBtn');
    const $fetchResults = $('#fetchResults');
    const $fetchOnePlaneBtn = $('#fetchOnePlaneBtn');
    const $fetchOneManuBtn = $('#fetchOneManuBtn');
    // CREATE
    const $postPlaneBtn = $('#postPlaneBtn');
    const $postManuBtn = $('#postManuBtn');
    // UPDATE
    const $patchPlaneBtn = $("#patchPlaneBtn");
    const $patchManuBtn = $("#patchManuBtn");
    // DELETE
    const $deletePlaneBtn  = $('#deletePlaneBtn');
    const $deleteManuBtn = $('#deleteManuBtn');
    
    const $statusContainer = $('#statusContainer');
    


    // READ
    $fetchOnePlaneBtn.on('click', getOnePlane)
    $fetchOneManuBtn.on('click',getOneManu)
    $planeBtn.on('click', getPlane);
    $manuBtn.on('click', getManu)
    // CREATE
    $postPlaneBtn.on('click', postPlane);
    $postManuBtn.on('click', postManufacturers)
    // DELETE
    $deletePlaneBtn.on('click', deletePlane)
    $deleteManuBtn.on('click', deleteManu)
    // UPDATE
    $patchPlaneBtn.on('click', patchPlane)
    $patchManuBtn.on('click', patchManu)


    // READ FUNCTIONS

    function getOnePlane() {
        $statusContainer.empty();
        $fetchResults.empty();
    
        const planeId = $('#planeIdToFetch').val();

        if (!planeId || planeId.trim() === '') {
            $statusContainer.append('<p>Please enter a valid Plane ID.</p>');
            return; // Exit the function if manuId is empty
        }
    
        const url = `http://localhost:3000/planes/${planeId}`;
    
        try {
            $.ajax({
                url,
                type: "GET",
                success: function (data) {
                    $statusContainer.append(`<p>SUCCESS! Fetched Plane with ID ${planeId}</p>`);
                    console.log(data);
                    $fetchResults.append(`<li class='plane-item'><b>id:</b> ${data.id} <b> model:</b> ${data.model} <b>tail number:</b> ${data.tail_number} <b>manufacturer id</b> ${data.manufacturer_id}</li>`);
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 404) {
                        $statusContainer.append(`<p>Plane with ID ${planeId} not found.</p>`);
                    }}
            });
        } catch (error) {
            console.error(`Error fetching plane with ID ${planeId}:`, error);
            $statusContainer.append(`<p>Error fetching plane with ID ${planeId}!</p>`);
        }
    }

    function getOneManu() {
        $statusContainer.empty();
        $fetchResults.empty();
        const manuId = $('#manuIdToFetch').val();
        if (!manuId || manuId.trim() === '') {
            $statusContainer.append('<p>Please enter a valid Manufacturer ID.</p>');
            return; // Exit the function if manuId is empty
        }
    
        const url = `http://localhost:3000/manufacturers/${manuId}`;
    
        try {
            $.ajax({
                url,
                type: "GET",
                success: function (data) {
                    $statusContainer.append(`<p>SUCCESS! Fetched Manufacturer with ID ${manuId}</p>`);
                    console.log(data);
                    $fetchResults.append(`<li class='manufacturer-item'><b>id:</b> ${data.id} <b> name:</b> ${data.name} <b>country:</b> ${data.country}</li>`);
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 404) {
                        $statusContainer.append(`<p>Manufacturer with ID ${manuId} not found.</p>`);
                    }}
            });
        } catch (error) {
            console.error(`Error fetching manufacturer with ID ${manuId}:`, error);
            $statusContainer.append(`<p>Error fetching manufacturer with ID ${manuId}!</p>`);
        }
    }

    function getPlane() {
        $statusContainer.empty();
        $fetchResults.empty();
        const url = "http://localhost:3000/planes";
    
        try {
            $.ajax({
                url,
                type: "GET",
                success: function (data) {
                    $statusContainer.append(`<p>SUCCESS! Fetched Planes!</p>`);
                    data.forEach((item, index) => {
                        console.log(item);
                        $fetchResults.append(`<li class='plane-item'><b>id:</b> ${item.id} <b> model:</b> ${item.model} <b>tail number:</b> ${item.tail_number} <b>manufacturer id:</b> ${item.manufacturer_id}</li>`);
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching planes:', error);
            $statusContainer.append(`<p>Error fetching planes! </p>`);
        }
    }
    function getManu() {
        $statusContainer.empty();
        $fetchResults.empty();
        const url = "http://localhost:3000/manufacturers";
    
        try {
            $.ajax({
                url,
                type: "GET",
                success: function (data) {
                    $statusContainer.append(`<p>SUCCESS! Fetched Manufacuters!</p>`);
                    data.forEach((item, index) => {
                        console.log(item);
                        $fetchResults.append(`<li class='manufacturer-item'><b>id:</b> ${item.id} <b> name:</b> ${item.name} <b>country:</b> ${item.country}</li>`);
                    });
                }      
            });
        } catch (error) {
            console.error('Error fetching manufacturers:', error);
            $statusContainer.append(`<p>Error fetching manufacturers!</p>`);
        }
    }
      // CREATE FUNCTIONS

    function postPlane() {


        $statusContainer.empty()
        const url = 'http://localhost:3000/planes';

        const newPlane = {
            model: $('#planeModel').val(),
            tail_number: $('#planeTailNumber').val(),
            manufacturer_id: $('#planeManufacturerId').val(),
        };
        try {
            $.ajax({
            url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newPlane),
            success: function (data) {
                console.log('Plane posted:', data);
                $statusContainer.append(`<p>SUCCESS! Posted Plane!</p>`);
            }
            });
        }catch (error){
            console.error('Error posting plane:', error);
            console.error('Failed to post plane:', newPlane)
            $statusContainer.append(`<p>Failed to post Plane!</p>`); $statusContainer.append(`<p>Failed to post Plane!</p>`);
            }
    }
  function postManufacturers() {
    $statusContainer.empty()
    const url = 'http://localhost:3000/manufacturers';

    const newManufacturer = {
      name: $('#manuName').val(), // Replace with your desired values
      country: $('#manuCountry').val(), // Replace with your desired values
    };
    try {
            $.ajax({
            url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newManufacturer),
            success: function (data) {
                console.log('Manufacturer posted:', data);
                $statusContainer.append(`<p>SUCCESS! Posted Manufacturer!</p>`);
            },
        });
    } catch (error){
        console.error('Error posting manufacturer:', error);
        console.error('Failed to post manufacturer:', newManufacturer);
        $statusContainer.append(`<p>Failed to post Manu!</p>`); 
    }
  }

  // PATCH/UPDATE FUNCTIONS

  function patchPlane() {
    $statusContainer.empty()
    const idToPatch = $('#planeIdToPatch').val();
    const url = `http://localhost:3000/planes/${idToPatch}`;
    const patchedPlane = {
      id: idToPatch,
      model: $('#patchedPlaneModel').val(),
      tail_number: $('#patchedPlaneTailNumber').val(),
      manufacturer_id: $('#patchedPlaneManufacturerId').val(),
    };
  
    try {
      $.ajax({
        url,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(patchedPlane),
        success: function (data) {
            console.log('Plane patched:', data);
            $statusContainer.append(`<p>SUCCESS! Patched Plane</p>`);
        }
      });
    } catch (error) {
      console.error('Error updating plane:', error);
      $statusContainer.append(`<p>Error unable to patch plane!</p>`);
    }
  }
  function patchManu() {
    $statusContainer.empty()
    const idToPatch = $('#manuIdToPatch').val();
    const url = `http://localhost:3000/manufacturers/${idToPatch}`;
    const patchedManu = {
        id: idToPatch,
        name: $('#patchedManuName').val(),
        country: $('#patchedManuCountry').val()
    }

    try {
        $.ajax({
            url,
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(patchedManu),
            success: function (data) {
                console.log('Manufacturer patched:', data);
                $statusContainer.append(`<p>SUCCESS! Patched Manufacturer</p>`);
            }
        });
    } catch (error) {
        console.error('Error updating manufacturer:', error);
        $statusContainer.append(`<p>Error unable to patch manufacturer!</p>`);
    }
}
    // DELETE FUNCTIONS
 function deletePlane() {
        $statusContainer.empty()
        const $planeIdToDelete = $('#planeIdToDelete').val()
        const url = `http://localhost:3000/planes/${$planeIdToDelete}`;

        try {
            $.ajax({
                url,
                type: 'DELETE',
                success: function (data) {
                    console.log('Plane deleted:', data);
                    $statusContainer.append(`<p>SUCCESS! Deleted Plane </p>`);
                }
            });
        }catch (error){
            console.error('Error deleting plane:', error)
            $statusContainer.append(`<p>Error deleting plane!</p>`);
        }
    }
    function deleteManu(){
    $statusContainer.empty()
    const $manuIdToDelete = $('#manuIdToDelete').val()
    const url = `http://localhost:3000/manufacturers/${$manuIdToDelete}`;

    try {
        $.ajax({
            url,
            type: 'DELETE',
            success: function (data){
                console.log('Manu deleted:', data)
                $statusContainer.append(`<p>SUCCESS! Deleted Manu:</p>`);
            }
        })
    }catch(error){
        console.error('Error deleting manu:', error)
        $statusContainer.append(`<p>Error deleting manu! </p>`);
    }

    }


})