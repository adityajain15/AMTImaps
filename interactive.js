mapboxgl.accessToken = 'pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilabmedia/cj7jbpfok6b4o2st6sixap58x',
    zoom: 0
  });

const layerTypes = ["Exclusive Economic Zone","Territorial Sea","Continental Shelf","Territorial Baseline"];

d3.selectAll(".option").on("change",function changeEventHandler(event){
    /*var visibility = map.getLayoutProperty(this.id, 'visibility');
    if(visibility === 'visible'){
      map.setLayoutProperty(this.id, 'visibility', 'none');
    }
    else{
      map.setLayoutProperty(this.id, 'visibility', 'visible');
    }*/
    //console.log(this.id);
    var selectedCountry = this.id;
    map.getStyle().layers.map(function(each){
      if(each["source-layer"]==="all_claims-7jhily"&&each["id"]===selectedCountry){
        if(map.getLayoutProperty(each['id'], 'visibility')==='visible'){
          map.setLayoutProperty(each['id'], 'visibility', 'none');
          layerTypes.map(function(layer){
            var filter = map.getFilter(layer);
            filter[1].push(selectedCountry);
            map.setFilter(layer,filter);
          });
        }
        else{
          map.setLayoutProperty(each['id'], 'visibility', 'visible');
          layerTypes.map(function(layer){
            var filter = map.getFilter(layer);
            filter[1].splice(filter[1].indexOf(selectedCountry),1);
            map.setFilter(layer,filter);
          });
        }
        

      }
    });
  

  
  
      
  });

  /*
d3.selectAll(".option").on("change",function changeEventHandler(event){
    var visibility = map.getLayoutProperty(this.id, 'visibility');
    if(visibility === 'visible'){
      map.setLayoutProperty(this.id, 'visibility', 'none');
    }
    else{
      map.setLayoutProperty(this.id, 'visibility', 'visible');
    }
  });


  


  var types = ["Exclusive Economic Zone","Continental Shelf","Territorial Baseline","Territorial Sea"];
  var sources = ["singapore","china","japan"];

  map.on('load', function() {
    map.addSource("singapore",  {
        type: "geojson",
        data: "singapore_claims_1.geojson"
    });
    map.addSource("japan",  {
        type: "geojson",
        data: "japan_claims_1.geojson"
    });
    map.addSource("china",  {
        type: "geojson",
        data: "china_claims_1.geojson"
    });


      for(var j=0;j<sources.length;j++){
        
        map.addLayer({
        "id": sources[j],
        "type": "line",
        "source": sources[j],
        "layout": {
          "line-join": "round",
          "line-cap": "round",
          "visibility": "visible",
        },
        "paint": {
          "line-color": "lightgreen",
          "line-width": 4
        }
        });
      
        map.addLayer({
        "id": "symbols"+sources[j],
        "type": "symbol",
        "source": sources[j],
        "minzoom": 1,
        "layout": {
          "symbol-placement": "line",
          "text-font": ["Open Sans Regular"],
          "text-field": '{name}', 
          "text-size": 14
        },
        "paint":{
          "text-color":"white"
        }
        });
      }
    

  */