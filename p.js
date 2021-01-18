require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/layers/GeoJSONLayer",
    "esri/views/MapView",
    "esri/widgets/Home",
    "esri/core/Handles"

  ], function (
    Map,
    FeatureLayer,
    GeoJSONLayer,
    MapView,
    Home,
    Handles,
  
  ) {

    let handles = new Handles();

    handles.remove(); // removes handles from default group
    
    handles.remove("layer");
    const layer = new GeoJSONLayer({
      title: "Earthquakes from the last month",
      url:
        "https://raw.githubusercontent.com/dani898908/modulo2_keepcoding/main/nuevo.geojson",
      copyright: "ODS Ciudades de España",
      outFields: ['*'],
      popupTemplate: {
        title: "{name}",
        lastEditInfoEnabled: false,
      
      },
      renderer: {
        type: "simple",
        field: "NOMBRE",
        symbol: {
          type: "simple-marker",
          size: 5,
          color: "#69dcff",
          outline: {
            color: "rgba(0, 139, 174, 0.5)",
            width: 5
          }
        }
      },
      popupTemplate: {
        title: " Informe cumplimiento ODS {NOMBRE}",
        outFields: ['*'],
        actions: [
          {
            id: "find-brewery",
            image:
              "https://raw.githubusercontent.com/UNStats-SDGs/sdgs-data/master/images/en/TGG_Icon_Color_3.png",
            title: "Más Info"
          }
        ],
        content: [ 
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "Ods_1",
                label: "No Poverty"
              },
              {
                fieldName: "Ods_2",
                label: "Zero Hunger"
              },
              {
                fieldName: "Ods_3",
                label: "Good Health and Well-being"
              },
              {
                fieldName: "Ods_4",
                label: "Quality Education"
              },
              {
                fieldName: "Ods_5",
                label: "Gender Equality"
              },
              {
                fieldName: "Ods_6",
                label: "Clean Water and Sanitation"
              }
            ]
          }
        ],cambiar
      },
      visible: true,
    });
    window.onload= function (){
      document.getElementById("ruta").addEventListener("click",cambiar);
     
    }
  
    function cambiar(feature){
     if(layer.visible === true){
       return layer.visible = false;
     }else{
       return layer.visible= true;
     }
      
    }
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
            width: 1
          }
        }
      }
    });
    const map = new Map({
        basemap: "dark-gray-vector",
      layers: [  baseLayer,layer]
    });

    const view = new MapView({
      container: "viewDiv",
      zoom: 4.8,
      center: [-15.7254,38.5302], 
      map: map,
      highlightOptions: {
        color: "orange"
      }
    });
    view.ui.add("imgLogo", "top-left");
  
    view.when().then(function () {
      view.on("click", function (event) {
          // Remove any existing highlighted features
          handles.removeAll();
          const featureContainer = document.getElementById("features");
         
          // Clears the parent div's content
          app.itemI.map(item=>{
          featureContainer.innerHTML += "<img height='50px'src='"+item.img+"'></img>";
          for (var clave of Object.keys(item)){
            featureContainer.innerHTML+="<ol>"+item[clave]+"</ol>";
            }
              })
        
      });
    });
  

  });