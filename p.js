require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/layers/GeoJSONLayer",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/Home",
    "esri/core/Handles",
"esri/widgets/Feature"
  ], function (
    Map,
    FeatureLayer,
    GeoJSONLayer,
    MapView,
    Legend,
    Expand,
    Home,
    Handles,
    Feature
  ) {


    const layer = new GeoJSONLayer({
      title: "Earthquakes from the last month",
      url:
        "https://raw.githubusercontent.com/dani898908/modulo2_keepcoding/main/nuevo.geojson",
      copyright: "ODS Ciudades de España",
      outFields: ['*'],
      renderer: {
        type: "simple",
        field: "NOMBRE",
        symbol: {
          type: "simple-marker",
          size: 4,
          color: "#69dcff",
          outline: {
            color: "rgba(0, 139, 174, 0.5)",
            width: 5
          }
        }
      },
      popupTemplate: {
        title: "{NOMBRE}",
        outFields: ['*'],
        content:ODSChange,cambiarDatos,
   
        fieldName: "NOMBRE",
      },
    });
    window.onload= function (){
      document.getElementById("resultado").addEventListener("click",cambiarDatos);
   

    }
    // background layer for geographic context
    // projected to Alaska Polar Stereographic
    const baseLayer = new FeatureLayer({
      portalItem: {
        id: "2b93b06dc0dc4e809d3c8db5cb96ba69"
      },
      legendEnabled: false,
      popupEnabled: false,
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [65, 65, 65, 1],
          outline: {
            color: [50, 50, 50, 0.75],
            width: 0.5
          }
        }
      }
    });
    
   
    var app={};
    var llamada = miCallback
    var miCallback= datos=>{
    console.log(datos);
    app.itemI= datos;
    var html= ""
    html += "<h2>GOAL</h2>";
    
    app.itemI.map(item=>{
    
        for (var clave of Object.keys(item)){
             html+="<li>"+item[clave]+"</li>";
         
        }
    })
    document.getElementById('resultado').innerHTML=html;
}
        
        
      

    
    function cambiarDatos(){
    
            console.log("data");
          


    }

    function ODSChange(feature) {
    var div = document.createElement("div");
     div.innerHTML =
  "<a href='#' id='apiBTN'class='button' >INDICADORES</a>\
  <a href='#' id='txBTN'class='button' >INDICADORES</a>";
  return div;
}
    const featureContainer = document.getElementById("features");
    const map = new Map({
        basemap: "dark-gray-vector",
      layers: [ layer]
    });

    const view = new MapView({
    container: "viewDiv",
    zoom: 4.8,
    center: [-15.7254,38.5302], 
      map: map
    });
    
    view.ui.add(
      new Home({
        view: view
      }),
      "top-left"
    );

    const legend = new Legend({
      view: view,
      container: "legendDiv"
    });

    const infoDiv = document.getElementById("infoDiv");
    view.ui.add(
      new Expand({
        view: view,
        content: infoDiv,
        expandIconClass: "esri-icon-layer-list",
        expanded: false
      }),
      "top-left"
    );

  });