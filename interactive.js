mapboxgl.accessToken = 'pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilabmedia/cj8g9mlin10pm2rlq13w831gb',
    zoom: 0
  });

const layerTypes = ["Exclusive Economic Zone","Territorial Sea","Continental Shelf","Territorial Baseline"];
const countries = ["India",
"Bangladesh",
"Brunei",
"Thailand",
"Cambodia",
"Democratic People's Republic of Korea (North Korea)",
"Indonesia",
"Japan",
"People's Republic of China",
"Republic of China (Taiwan)",
"Singapore",
"Sri Lanka",
"Vietnam"];


d3.selectAll(".option").on("change",function changeEventHandler(event){
  toggleCountry(this.id);
});

d3.selectAll(".line").on("change",function changeEventHandler(event){
  toggleLayer(this.id);
});

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

function toggleCountry(selected){
  console.log(selected);
  var layer = map.getStyle().layers.filter(function(each){return each["id"]===selected})[0];
  
  if(layer['layout']['visibility']==="visible"){
    map.setLayoutProperty(layer['id'], 'visibility', 'none');
    filterChange("Labels",selected,true);
    layerTypes.map(function(theLayer){
      filterChange(theLayer,selected,true);
    });
  }
  else{
    map.setLayoutProperty(layer['id'], 'visibility', 'visible');
    filterChange("Labels",selected,false);
    layerTypes.map(function(theLayer){
      filterChange(theLayer,selected,false);
    });
  }
}

function toggleLayer(selected){
  var layer = map.getStyle().layers.filter(function(each){return each["id"]===selected})[0];
  
  if(layer['layout']['visibility']==="visible"){
    map.setLayoutProperty(layer['id'], 'visibility', 'none');
    countries.map(function(theCountry){
      filterChange(theCountry,selected,false);
    });
  }
  else{
    map.setLayoutProperty(layer['id'], 'visibility', 'visible');
    //filterChange("Labels",selected,false);
    countries.map(function(theCountry){
      filterChange(theCountry,selected,true);
    });
  }
}
/*
  map.getStyle().layers.map(function(each){
    if(each["source-layer"]==="all_claims-7jhily"&&each["id"]===selected){
      if(map.getLayoutProperty(each['id'], 'visibility')==='visible'){
        map.setLayoutProperty(each['id'], 'visibility', 'none');

        if(isLine){
          filterChange("Labels",selected,true);
          countries.map(function(country){
            filterChange(country,selected,true);
          });
        }
        else{
          filterChange("Labels",selected,true);
          layerTypes.map(function(layer){
            filterChange(layer,selected,true);
          });
        }
      }
      else{
        map.setLayoutProperty(each['id'], 'visibility', 'visible');

        if(isLine){
          filterChange("Labels",selected,false);
          countries.map(function(country){
            filterChange(country,selected,false);
          });
        }
        else{
          filterChange("Labels",selected,false);
          layerTypes.map(function(layer){
            filterChange(layer,selected,false);
          });
        }


   
        }
      }
  });
}*/

map.on('style.load', function(){
  Array.prototype.map.call(document.getElementsByClassName('option'), 
  function(option){
    if(!option.checked){
      var selectedCountry = option.id;
      toggleCountry(selectedCountry);
    }
  });

  
});

