//get Mapbox style using the API
mapboxgl.accessToken = 'pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilabmedia/cj94fqpttim2v2rmi7yk0ie0i',
    zoom: 3.3,
    center: [110,25]
  });

//Arrays that list out different types of Claims and Claimants
var layerTypes = ["Exclusive Economic Zone","Territorial Sea","Continental Shelf","Territorial Baseline"];
var countries = ["India","Bangladesh","Brunei","Thailand","Cambodia","Democratic People's Republic of Korea (North Korea)","Indonesia","Japan","People's Republic of China","Republic of China (Taiwan)","Singapore","Sri Lanka","Vietnam","South Korea","Maldives","Malaysia","Myanmar","Philippines"];

//Add navigation controls
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');


//Function that runs when the style has been loaded
map.on('style.load', function(){
  Array.prototype.map.call(document.getElementsByClassName('option'),
  function(option){
    if(!option.checked){
      var selectedCountry = option.id;
      toggleCountry(selectedCountry);
    }
  });
});

//Attach event handlers on all Country checkboxes
d3.selectAll(".option").on("change",function changeEventHandler(event){
  toggleCountry(this.id);
});

//Function for toggling claimants, attached to checkbox event handlers
function toggleCountry(selected){
  var layer = map.getStyle().layers.filter(function(each){return each["id"]===selected})[0];

  if(layer['layout']['visibility']==="visible"){
    map.setLayoutProperty(layer['id'], 'visibility', 'none');
    labelChange("Labels",selected,true,true);
    layerTypes.map(function(theLayer){
      filterChange(theLayer,selected,true);
    });
  }
  else{
    map.setLayoutProperty(layer['id'], 'visibility', 'visible');
    labelChange("Labels",selected,true,false);
    layerTypes.map(function(theLayer){
      filterChange(theLayer,selected,false);
    });
  }
}

//Attach event handlers on all Layer checkboxes
d3.selectAll(".line").on("change",function changeEventHandler(event){
  toggleLayer(this.id);
});

//Function for toggling claims, attached to checkbox event handlers
function toggleLayer(selected){
  var layer = map.getStyle().layers.filter(function(each){return each["id"]===selected})[0];

  if(layer['layout']['visibility']==="visible"){
    map.setLayoutProperty(layer['id'], 'visibility', 'none');
    labelChange("Labels",selected,false,true);
    countries.map(function(theCountry){
      filterChange(theCountry,selected,false);
    });
  }
  else{
    map.setLayoutProperty(layer['id'], 'visibility', 'visible');
    labelChange("Labels",selected,false,false);
    countries.map(function(theCountry){
      filterChange(theCountry,selected,true);
    });
  }
}

//Function for the 'Select no claims button'
function lineSelectNone(){
  var allLines = document.querySelectorAll('.line');
  for(var i=0;i<allLines.length;i++){
    if(allLines[i].checked){
      allLines[i].checked=false;
      toggleLayer(allLines[i].id);
    }
  }
  var nineDash = document.querySelector('#NineDash');
  if(nineDash.checked){
    nineDash.checked=false;
    filterChange("People's Republic of China","Nine-Dash/U-Shaped Line",false);
    filterChange("Republic of China (Taiwan)","Nine-Dash/U-Shaped Line",false);
  }
}

//Function for the 'Select all claims button'
function lineSelectAll(){
  var allLines = document.querySelectorAll('.line');
  for(var i=0;i<allLines.length;i++){
    if(!allLines[i].checked){
      allLines[i].checked=true;
      toggleLayer(allLines[i].id);
    }
  }
  var nineDash = document.querySelector('#NineDash');
  if(!nineDash.checked){
    nineDash.checked=true;
    filterChange("People's Republic of China","Nine-Dash/U-Shaped Line",true);
    filterChange("Republic of China (Taiwan)","Nine-Dash/U-Shaped Line",true);
  }
}

//Function for the 'Select no claimants button'
function countrySelectNone(){
  var allCountries = document.querySelectorAll('.option');
  for(var i=0;i<allCountries.length;i++){
    if(allCountries[i].checked){
      allCountries[i].checked=false;
      toggleCountry(allCountries[i].id);
    }
  }
}

//Function for the 'Select all claimants button'
function countrySelectAll(){
  var allCountries = document.querySelectorAll('.option');
  for(var i=0;i<allCountries.length;i++){
    if(!allCountries[i].checked){
      allCountries[i].checked=true;
      toggleCountry(allCountries[i].id);
    }
  }
}

//Event handler for the Nine-Dash Line checbox
d3.select("#NineDash").on("change",function changeEventHandler(event){
  if(this.checked){
    filterChange("People's Republic of China","Nine-Dash/U-Shaped Line",true);
    filterChange("Republic of China (Taiwan)","Nine-Dash/U-Shaped Line",true);
  }
  else{
    filterChange("People's Republic of China","Nine-Dash/U-Shaped Line",false);
    filterChange("Republic of China (Taiwan)","Nine-Dash/U-Shaped Line",false);
  }
});

//Core logic of the toggle functions. Adds and removes the string of a selected layer from another layer's filter property (An array)
function filterChange(layer, selected,addFlag){
  var filter = map.getFilter(layer);

  filter.forEach(function(element,index){
    var theString = element[0];
    if(theString.includes("in")){
      if(addFlag){
        if(selected==="Territorial Baseline"){
          filter[index].push("Territorial Baselines");
        }
        filter[index].push(selected);
      }
      else{
        if(selected==="Territorial Baseline"){
          filter[index].splice(filter[index].indexOf("Territorial Baselines"),1);
        }
        filter[index].splice(filter[index].indexOf(selected),1);
      }
      map.setFilter(layer,filter);
    }
  });
}

//Similar to filterChange, but for line labels
function labelChange(layer,selected,isCountry,addFlag){
  var arr = map.getFilter(layer);

  if(addFlag){
    if(isCountry){
      arr[2][1].push(selected);
    }
  else{
      arr[2][2].splice(arr[2][2].indexOf(selected),1);
    }
  }
  else{
    if(isCountry){
      arr[2][1].splice(arr[2][1].indexOf(selected),1);
    }
    else{
      arr[2][2].push(selected);
    }
  }
  map.setFilter(layer,arr);
}
