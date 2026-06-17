var arrival_airportRawList;
var arrival_airportList = [];
var arrival_airportShortList = [];
/************************************/
function getToDate() {
  var d = new Date();
      
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month,year].join('-');
}

function arrival_airport_in_list_found(list, item) {
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

function load_arrival_airport_list() {
  arrival_airportRawList = JSON.parse(arrival_airport);
  
  arrival_airportList = arrival_airportRawList;
  
  // arrival_airportList = arrival_airportRawList.filter(
  //   (thing, index, self) =>
  //     index ===
  //     self.findIndex((t) => t.Show === thing.Show )
  // );
  
  //console.log("arrival_airportList: ", arrival_airportList);
}

function update_drop_box_arrival_airport_list() {
  var input = document.getElementById('input_arrival_airport_CodeID').value;
  var searchList = document.getElementById('arrival_airportDropBoxList');
  
  searchList.innerHTML = '';
  arrival_airportShortList = [];
  arrival_airportShortList.length = 0;

  input = input.toLowerCase();

  var count = 0;
  for (i = 0; i < arrival_airportList.length; i++) {
    let arrival_airport = arrival_airportList[i];
    var today = getToDate();
    
    //if (today == arrival_airport.Date)
    { 
      if (arrival_airport.Show.toLowerCase().includes(input)) {
        const elem = document.createElement("option");
        elem.value = arrival_airport.Show;
        searchList.appendChild(elem);
        arrival_airportShortList.push(arrival_airport);
        count++;
      }
    }
    
    if (count > 30) {
      break;
    }
  }

  if (arrival_airport_in_list_found(arrival_airportList, document.getElementById('input_arrival_airport_CodeID').value)) {
    console.log("Found ", document.getElementById('input_arrival_airport_CodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('input_arrival_airport_CodeID').value);
  }  
  
  console.log("search arrival_airport done!");
}

function select_arrival_airport() {
  var selected_arrival_airport = document.getElementById('input_arrival_airport_CodeID').value;
  var found = false;
 //$('.rt-btn.rt-btn-next').hide(); 

  api.fn.answers({Core_Q1a1:   selected_arrival_airport}); //Airport name

  for (i = 0; i < arrival_airportShortList.length; i++) {
    var current_arrival_airport = arrival_airportShortList[i];
    if (current_arrival_airport.Show == selected_arrival_airport) { 
      //store detail data here
      api.fn.answers({Core_Q1a1:   current_arrival_airport.Show}); //Airport name
      api.fn.answers({Q1a1:   current_arrival_airport.Show}); //Airport name
         
      console.log("current_arrival_airport: ", selected_arrival_airport);

      // //>>>double check if data saved correctly
      // let k = 0;
      // let saved_ok = false;
      // while ((k < 5) && (saved_ok == false)) {
      //   var saved_arrival_airport = api.fn.answers().Core_Q1a1;
  
      //   if (saved_arrival_airport == selected_arrival_airport) 
      //   {
      //     saved_ok = true;
      //     console.log("saved successfully");
      //   }
      //   else {
      //     setTimeout(() => {
      //       console.log("After another 200ms");
      //     }, 200); // delay 200ms
      //   }

      //   k++; 
      // }
      // //<<<double check if data saved correctly

      found = true;
      $('.rt-btn.rt-btn-next').show(); 
      break;
    }
  }
  if (!found) {
    alert("Please select a arrival_airport number from the list.");
  }
}

function show_arrival_airport_search_box() {
  load_arrival_airport_list();

  $('.rt-element.rt-text-container').append(`<input list="arrival_airportDropBoxList" onchange="select_arrival_airport()"  onkeyup="update_drop_box_arrival_airport_list()" name="input_arrival_airport_CodeID" id="input_arrival_airport_CodeID" >
  <datalist id="arrival_airportDropBoxList"> </datalist>`);
 
  var currentValue  = api.fn.answers().Q1a1_ext;
  if (currentValue) {
    if (currentValue !== "") {
      document.getElementById('input_arrival_airport_CodeID').value = currentValue;
    }
  }

  if (arrival_airport_in_list_found(arrival_airportList, document.getElementById('input_arrival_airport_CodeID').value)) {
    console.log("Found ", document.getElementById('input_arrival_airport_CodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('input_arrival_airport_CodeID').value);
  }
  $('#input_arrival_airport_CodeID').show(); 
}


function hide_arrival_airport_search_box() {
  $('#input_arrival_airport_CodeID').hide();
}