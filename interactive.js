mapboxgl.accessToken = 'pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ilabmedia/cj7jbpfok6b4o2st6sixap58x',
    zoom: 0
  });

const layerTypes = ["Exclusive Economic Zone","Territorial Sea","Continental Shelf","Territorial Baseline"];

d3.selectAll(".option").on("change",function changeEventHandler(event){
  var selectedCountry = this.id;
  toggle(selectedCountry);
});

function toggle(selectedCountry){
  map.getStyle().layers.map(function(each){
    if(each["source-layer"]==="all_claims-7jhily"&&each["id"]===selectedCountry){

      if(map.getLayoutProperty(each['id'], 'visibility')==='visible'){
        map.setLayoutProperty(each['id'], 'visibility', 'none');
        layerTypes.map(function(layer){

          var filter = map.getFilter(layer);
          if(filter.length!=2){
            var newFilter = [].push(filter);
            newFilter = newFilter.push(["!in","country"]);
            map.setFilter(layer,newFilter);
          }
          filter[1].push(selectedCountry);
          map.setFilter(layer,filter);

        });
      }
      else{
        map.setLayoutProperty(each['id'], 'visibility', 'visible');
        layerTypes.map(function(layer){
          
          var filter = map.getFilter(layer);
          if(filter.length!=2){
            var newFilter = [].push(filter);
            newFilter.push(["!in","country"]);
            map.setFilter(layer,newFilter);
          }
          filter[1].splice(filter[1].indexOf(selectedCountry),1);
          map.setFilter(layer,filter);
        
        });
      }
    }
  });
}
map.on('style.load', function(){
  Array.prototype.map.call(document.getElementsByClassName('option'), 
  function(option){
    if(!option.checked){
      var selectedCountry = option.id;
      toggle(selectedCountry);
    }
  });
});

