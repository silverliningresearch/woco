var arrival_airlineRawList;
var arrival_airlineList = [];
var arrival_airlineShortList = [];
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

function arrival_airline_in_list_found(list, item) {
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

function load_arrival_airline_list() {
  arrival_airlineRawList = JSON.parse(arrival_airline);

  arrival_airlineList = arrival_airlineRawList;
  //remove duplicate 
  // arrival_airlineList = arrival_airlineRawList.filter(
  //   (thing, index, self) =>
  //     index ===
  //     self.findIndex((t) => t.Show === thing.Show )
  // );
  
  //console.log("arrival_airlineList: ", arrival_airlineList);
}

function update_drop_box_arrival_airline_list() {
  var input = document.getElementById('input_arrival_airline_CodeID').value;
  var searchList = document.getElementById('arrival_airlineDropBoxList');
  
  searchList.innerHTML = '';
  arrival_airlineShortList = [];
  arrival_airlineShortList.length = 0;

  input = input.toLowerCase();

  var count = 0;
  for (i = 0; i < arrival_airlineList.length; i++) {
    let arrival_airline = arrival_airlineList[i];
    var today = getToDate();
    
    //if (today == arrival_airline.Date)
    { 
      if (arrival_airline.Show.toLowerCase().includes(input)) {
        const elem = document.createElement("option");
        elem.value = arrival_airline.Show;
        searchList.appendChild(elem);
        arrival_airlineShortList.push(arrival_airline);
        count++;
      }
    }
    
    if (count > 30) {
      break;
    }
  }

  if (arrival_airline_in_list_found(arrival_airlineList, document.getElementById('input_arrival_airline_CodeID').value)) {
    console.log("Found ", document.getElementById('input_arrival_airline_CodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('input_arrival_airline_CodeID').value);
  }  
  
  console.log("search arrival_airline done!");
}

function select_arrival_airline() {
  var selected_arrival_airline = document.getElementById('input_arrival_airline_CodeID').value;
  var found = false;
 //$('.rt-btn.rt-btn-next').hide(); 

 api.fn.answers({Core_Q1a2:   selected_arrival_airline}); //airline name

  for (i = 0; i < arrival_airlineShortList.length; i++) {
    var current_arrival_airline = arrival_airlineShortList[i];
    if (current_arrival_airline.Show == selected_arrival_airline) { 
      //store detail data here
      api.fn.answers({Core_Q1a2:   current_arrival_airline.Show}); //airline name
      api.fn.answers({Q1a2:   current_arrival_airline.Show}); //airline name
         
      console.log("current_arrival_airline: ", current_arrival_airline);
      found = true;

      // //>>>double check if data saved correctly
      // let k = 0;
      // let saved_ok = false;
      // while ((k < 5) && (saved_ok == false)) {
      //   var saved_arrival_airline = api.fn.answers().Core_Q1a2;
  
      //   if (saved_arrival_airline == selected_arrival_airline) 
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

      $('.rt-btn.rt-btn-next').show(); 
      break;
    }
  }
  if (!found) {
    alert("Please select a arrival_airline number from the list.");
  }
}

function show_arrival_airline_search_box() {
  load_arrival_airline_list();

  $('.rt-element.rt-text-container').append(`<input list="arrival_airlineDropBoxList" onchange="select_arrival_airline()"  onkeyup="update_drop_box_arrival_airline_list()" name="input_arrival_airline_CodeID" id="input_arrival_airline_CodeID" >
  <datalist id="arrival_airlineDropBoxList"> </datalist>`);
 
  var currentValue  = api.fn.answers().Q1a1_ext;
  if (currentValue) {
    if (currentValue !== "") {
      document.getElementById('input_arrival_airline_CodeID').value = currentValue;
    }
  }

  if (arrival_airline_in_list_found(arrival_airlineList, document.getElementById('input_arrival_airline_CodeID').value)) {
    console.log("Found ", document.getElementById('input_arrival_airline_CodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('input_arrival_airline_CodeID').value);
  }
  $('#input_arrival_airline_CodeID').show(); 
}


function hide_arrival_airline_search_box() {
  $('#input_arrival_airline_CodeID').hide();
}