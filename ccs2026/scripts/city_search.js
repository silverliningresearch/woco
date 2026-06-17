var cityList = [];
var cityShortList = [];
/************************************/
function city_in_list_found(list, item) {
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

function load_city_list() {
  var data = JSON.parse(cityRawList);
  
  cityList = [];
  cityList.length = 0;

  var country = "_all";;  
      
  for (i = 0; i <data.length; i++) {
    var city = data[i];
    var country_json = '"Country"' + ":" + '"' +  city.co + '", ';
    var city_json = '"City_ascii"' + ":" + '"' +  city.city + '", ';

    var show_json = '"Show"' + ":" + '"' +  city.city  + ", " + city.co;

    var str = '{' + country_json + city_json + show_json + '"}';

    cityList.push(JSON.parse(str));
  }
  //console.log("cityList: ", cityList);
}

function update_drop_box_city_list() {
  var input = document.getElementById('inputcityCodeID').value;
  var searchList = document.getElementById('cityDropBoxList');
  
  searchList.innerHTML = '';
  cityShortList = [];
  cityShortList.length = 0;

  input = input.toLowerCase();

  var count = 0;
  
  //console.log("cityList.length: ", cityList.length);
  for (i = 0; i < cityList.length; i++) {
    let item = cityList[i];
    //if (item.Show.toLowerCase().includes(input)) {
    if (item.Show.toLowerCase().indexOf(input)==0) {      
      const elem = document.createElement("option");
      elem.value = item.Show;
      searchList.appendChild(elem);
      cityShortList.push(item);
      count++;
    }
    
    if (count > 15) {
      break;
    }
  }

  if (city_in_list_found(cityList, document.getElementById('inputcityCodeID').value)) {
    console.log("Found ", document.getElementById('inputcityCodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('inputcityCodeID').value);
  }   

}

function select_city() {
  var selectedCity = document.getElementById('inputcityCodeID').value;
  var savedData;
  var found = false;

  api.fn.answers({Q2c_City:  selectedCity});
  api.fn.answers({Core_Q2c:  selectedCity});
  console.log("Saving data...", savedData);
  
  for (i = 0; i < cityShortList.length; i++) 
  {
    var currentCity = cityShortList[i];
    if (currentCity.Show == selectedCity) 
    {
      found = true;

     //>>>double check if data saved correctly
    //  let k = 0;
    //  let saved_ok = false;
    //  while ((k < 5) && (saved_ok == false)) {
    //    var saved_dest_City = api.fn.answers().Core_Q2c;
 
    //    if (saved_dest_City == selectedCity) 
    //    {
    //      saved_ok = true;
    //      console.log("saved successfully");
    //    }
    //    else {
    //      setTimeout(() => {
    //        console.log("After another 200ms");
    //      }, 200); // delay 200ms
    //    }

    //    k++; 
    //  }
     //<<<double check if data saved correctly
      
      break;
    } 
  }    
  
  if (!found) {
    alert("Please search for a larger city.");
  }
  else
  {
    $('.rt-btn.rt-btn-next').show(); 
  }
  console.log("Select city done!");
}

function show_city_search_box(cityQuestion) {

  cityCurrentQuestion = cityQuestion;
  load_city_list();

  $('.rt-element.rt-text-container').append(`<input list="cityDropBoxList" onchange="select_city()"  onkeyup="update_drop_box_city_list()" name="inputcityCodeID" id="inputcityCodeID" >
  <datalist id="cityDropBoxList"> </datalist>`);

  document.getElementById('inputcityCodeID').value = "";

  if (city_in_list_found(cityList, document.getElementById('inputcityCodeID').value)) {
    console.log("Found ", document.getElementById('inputcityCodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('inputcityCodeID').value);
  }
  $('#inputcityCodeID').show(); 

  $('.rt-btn.rt-btn-next').hide(); 
}


function hide_city_search_box() {
  $('#inputcityCodeID').hide();
}