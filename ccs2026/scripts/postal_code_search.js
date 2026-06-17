var postalCodeList;
var rawList = [];
var postalCodeShortList = [];

function find_postal_code(list, item) {
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
  //$('.rt-btn.rt-btn-next').hide(); 
  return false;
}

function load_postal_code() {
  console.log("load_postal_code started...");
  
  var rawList = JSON.parse(postalCodeDenmark);
  
  var country = api.fn.answers().Core_Q8;
  console.log("country:", country);
  
  if (country && (country.includes('Denmark') ||country.includes('Danmark') )) {
    rawList = JSON.parse(postalCodeDenmark);
  }
  else if (country && (country.includes('Sweden') || country.includes('Sverige'))) {
    rawList = JSON.parse(postalCodeSweden);
  }
  else { //default value
    rawList = JSON.parse(postalCodeDenmark);
  }
  
  postalCodeList = [];
  postalCodeList.length = 0;
  for (i = 0; i < rawList.length; i++) {
    var item = rawList[i];
    postalCodeList.push(item);
  }
  console.log("load_postal_code done!");
}

function update_postal_code_search_box() {
  var input = document.getElementById('inputPostalCodeID').value;
  var list = document.getElementById('postalCodehtmlList');
  
  list.innerHTML = '';
  input = input.toLowerCase();

  postalCodeShortList = [];
  postalCodeShortList.length = 0;

  var count = 0;
  if (input.length>0) {
    for (i = 0; i < postalCodeList.length; i++) {
      let postcalCode = postalCodeList[i];

      if (postcalCode.Show.toLowerCase().includes(input)) {
        const elem = document.createElement("option");
        elem.value = postcalCode.Show;
        list.appendChild(elem);
        postalCodeShortList.push(postcalCode);
        count++;
      }

      if ((count > 30)) {
        break;
      }
    }
  }
  
  if (find_postal_code(postalCodeList, document.getElementById('inputPostalCodeID').value)) {
    console.log("Found ", document.getElementById('inputPostalCodeID').value);
  }
  else{
    console.log("not found ", document.getElementById('inputPostalCodeID').value);
  }
}

function select_postal_code() {
  var selectedPostalCode = document.getElementById('inputPostalCodeID').value;
  
  api.fn.answers({Q8a_postal_code_show:  selectedPostalCode});
  api.fn.answers({Core_Q8a:  selectedPostalCode});

  for (i = 0; i < postalCodeShortList.length; i++) {
    var currentPostalCode = postalCodeShortList[i];

    if (currentPostalCode.Show == selectedPostalCode) { 
      console.log("selectedPostalCode: ", currentPostalCode);
      api.fn.answers({Core_Q8a:  currentPostalCode.Code});
    }
  }

  if (find_postal_code(postalCodeList, document.getElementById('inputPostalCodeID').value)) {
    console.log("Select found ", document.getElementById('inputPostalCodeID').value);
  }
  else{
    console.log("Select not found ", document.getElementById('inputPostalCodeID').value);
    alert("Please select a postal code from the list.");
  }
}

function show_postal_code_search_box() {
    load_postal_code();  

    $('.rt-element.rt-text-container').append(`<input list="postalCodehtmlList"  onchange="select_postal_code()"  onkeyup="update_postal_code_search_box()" name="inputPostalCodeID" id="inputPostalCodeID" autocomplete="off">
    <datalist id="postalCodehtmlList"> </datalist>    `  );
    
    var currentValue  = api.fn.answers().Q8a_postal_code_show;
    if (currentValue) {
      if (currentValue !== "") {
        document.getElementById('inputPostalCodeID').value = currentValue;
      }
    }

    if (find_postal_code(postalCodeList, document.getElementById('inputPostalCodeID').value)) {
      console.log("Found ", document.getElementById('inputPostalCodeID').value);
    }
    else{
      console.log("not found ", document.getElementById('inputPostalCodeID').value);
    }

    $('.rt-btn.rt-btn-next').hide(); 
    $('#inputPostalCodeID').show(); 
}

function hide_postal_code_search_box() {
  $('#inputPostalCodeID').hide();
}

