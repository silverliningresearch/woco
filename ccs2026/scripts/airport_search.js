var airportList = [];
var airportShortList = [];
/************************************/
function airport_in_list_found(list, item) {
  item = item.toLowerCase();
  
  if (item) {
    if (item !== "") {
      for (i = 0; i < list.length; i++) {
        if (list[i].Show.toLowerCase() === item) {
          $('.rt-btn.rt-btn-next').show(); 
          return true;
        }
      }
    }
  }
  $('.rt-btn.rt-btn-next').hide(); 
  return false;
}

function load_airport_list() {
  var data = JSON.parse(airportRawList);
  
  airportList = [];
  airportList.length = 0;

  for (i = 0; i <data.length; i++) {
    var airport = data[i];
    airport.Show = airport.Airport_Name + ", "  +  airport.City + ", " +  airport.Country + " (" + airport.Airport_Code + ")";

    airportList.push(airport);
  }
  //console.log("airportList: ", airportList);
}

function update_drop_box_airport_list() {
  var input = document.getElementById('inputAirportCodeID').value;
  var searchList = document.getElementById('airportDropBoxList');
  
  searchList.innerHTML = '';
  airportShortList = [];
  airportShortList.length = 0;

  input = input.toLowerCase();

  var count = 0;
  
  //console.log("airportList.length: ", airportList.length);
  for (i = 0; i < airportList.length; i++) {
    let item = airportList[i];
    if (item.Show.toLowerCase().includes(input)) {
      const elem = document.createElement("option");
      elem.value = item.Show;
      searchList.appendChild(elem);
      airportShortList.push(item);
      count++;
    }
    
    if (count > 15) {
      break;
    }
  }

  if (airport_in_list_found(airportList, document.getElementById('inputAirportCodeID').value)) {
    console.log("Found ", document.getElementById('inputAirportCodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('inputAirportCodeID').value);
  }   

}

function select_airport() {
  var selectedairport = document.getElementById('inputAirportCodeID').value;

  api.fn.answers({urlVar20: selectedairport}); 
  api.fn.answers({Q2a_city: selectedairport}); 

  var found = false;

  for (i = 0; i < airportShortList.length; i++) 
  {
    var currentairport = airportShortList[i];
    if (currentairport.Show == selectedairport) 
    {
      //store detail data here
      api.fn.answers({Q2a_airport:   currentairport.Airport_Name + " (" + currentairport.Airport_Code + ")"}); 
      api.fn.answers({Q2a_city:   currentairport.City + ", " + currentairport.Country}); 
      api.fn.answers({Core_Q2a:   currentairport.Airport_Name + " (" + currentairport.Airport_Code + ")"}); 
      
      found = true;

      // //>>>double check if data saved correctly
      // let k = 0;
      // let saved_ok = false;
      // while ((k < 5) && (saved_ok == false)) {
      //   var saved_dest_airport = api.fn.answers().Core_Q2a;
  
      //   if (saved_dest_airport == currentairport.Airport_Name + " (" + currentairport.Airport_Code + ")") 
      //   {
      //     saved_ok = true;
      //     console.log("saved successfully");
      //   }
      //   else {
      //     setTimeout(() => {
      //       console.log("After another 500ms");
      //     }, 500); // delay 500ms
      //   }

      //   k++; 
      // }
      // //<<<double check if data saved correctly
      
      $('.rt-btn.rt-btn-next').show(); 
      break;
    } 
  }    
  
  if (!found) {
    alert("Please select an airport from the search list.");
  }

}

function show_airport_search_box(airportQuestion) {

  airportCurrentQuestion = airportQuestion;
  load_airport_list();

  $('.rt-element.rt-text-container').append(`<input list="airportDropBoxList" onchange="select_airport()"  onkeyup="update_drop_box_airport_list()" name="inputAirportCodeID" id="inputAirportCodeID" >
  <datalist id="airportDropBoxList"> </datalist>`);

  document.getElementById('inputAirportCodeID').value = "";

  if (airport_in_list_found(airportList, document.getElementById('inputAirportCodeID').value)) {
    console.log("Found ", document.getElementById('inputAirportCodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('inputAirportCodeID').value);
  }

  $('#inputAirportCodeID').show(); 

  $('.rt-btn.rt-btn-next').hide(); 
}


function hide_airport_search_box() {
  $('#inputAirportCodeID').hide();
}