require ([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/tasks/support/Query"
   
], function (
    Map,
    MapView,
    GeoJSONLayer,
    Query,
) {

    /* Geojson Comarcas */
    const layerComarcas = new GeoJSONLayer({
        url:
            "https://raw.githubusercontent.com/Carlos29Blanco/Carlos29Blanco/develop/comarcasSimply.geojson",
            copyright: "Influenza Aviar",
            title: "Comarcas",
            outFields: ['*'],
            renderer: {
              type: "simple", // autocasts as new SimpleRenderer()
              symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [ 51, 51, 51, 0.01 ],
                outline: {
                color: [ 51, 200, 200, 0.5 ],
                  width: 0.1
                }
              }
            },
         supportsQuery: true,
         popupTemplate: {
           title: "Comarca",
           actions: [{
            id: "comarca-boton",
            className: "fas fa-crow",
            }],
            content: [
              {
                type: "fields",
                fieldInfos: [
 
                  {
                    fieldName: "comarca",
                    label: "Comarca",
                    visible: true
                  },
                  {
                    fieldName: "province",
                    label: "Provincia",
                    visible: true
                  }
                ]
              }
            ]
          },

        });


     /* Alertas */ 
     let layerAlertas = new GeoJSONLayer({
          url:
          "https://raw.githubusercontent.com/Carlos29Blanco/Carlos29Blanco/develop/alertasPeorCaso.geojson",
         
        copyright: "Influenza Aviar",
        title: "Alertas",
        outFields: ['*'],
        visible: false,
        /* popupTemplate : template, */
        // set the CSVLayer's timeInfo based on the date field
        // establece el timeInfo de CSVLayer según el campo de fecha
        timeInfo: {
          startField: "startDate", // name of the date field  // nombre del campo de fecha
          interval: {
            // set time interval to one day
            // establecer el intervalo de tiempo en un día
            unit: "days",
            value: 7
          }
        },
        renderer: {
          type: "simple",
          field: "cases",
          symbol: {
            type: "simple-marker",
            color: "red",
            outline: null
          },
          visualVariables: [
            {
              type: "size",
              field: "number_of_cases",
              stops: [
                {
                  value: 10,
                  size: "5px"
                },
                {
                  value: 50,
                  size: "10px"
                },
                {
                  value: 100,
                  size: "20px"
                }
              ]
            },
            {
              type: "color",
              field: "riskLevel",
              stops: [{
                  value: 0,
                  color: [ 51, 200, 200, 0.01 ],
                  label: "0"
                },{
                  value: 1,
                  color: "#f5b8b8",
                  label: "1"
                },{
                  value: 2,
                  color: "#fc9292",
                  label: "2"
                },
                {
                  value: 3,
                  color: "#fc6262",
                  label: "3"
                },
                {
                  value: 4,
                  color: "#f73131",
                  label: "4"
                },
                {
                  value: 5,
                  color: "#990000",
                  label: "5"
                }
              ]
            }
          ]
        },
      });

    /* Rutas*/
    const layerRutaM = new GeoJSONLayer({
      url:
        "https://raw.githubusercontent.com/Carlos29Blanco/Carlos29Blanco/develop/rutas_Normal.geojson",
        copyright: "Influenza Aviar",
        title: "Rutas migratodias",
        outFields: ['*'],
        supportsQuery: true,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "simple-fill", // autocasts as new SimpleFillSymbol()

              outline: {
                color: [ 220, 220, 220 ],
                width: 0.5
              }
            }
     },
     popupTemplate: {
       title: "Ruta migratoria"
     },
     visible: true,
    });


    /* Mostrar los layers en el mapa */

    const map = new Map ({
        basemap: "dark-gray-vector",
        layers: [layerComarcas, layerRutaM, layerAlertas]
    });

    const view = new MapView({
        map: map,
        container: "viewDiv",
        zoom: 3.6,
        center: [40.68, 41.68],         
        highlightOptions: {
          color: "orange"
        }
    });





/*     let queryComarca = new Query(); 
      queryComarca.where = "comarca_sg = 'SP02008'";

      layer.queryExtent().then(function(results){
        // go to the extent of the results satisfying the query
        view.goTo(results.extent);
      });
 */


/* 

    view.on("click", function (event) {
      // Search for graphics at the clicked location. View events can be used
      // as screen locations as they expose an x,y coordinate that conforms
      // to the ScreenPoint definition.
      view.hitTest(event).then(function (response) {
        if (response.results.length) {
          let graphic = response.results.filter(function (result) {
            // check if the graphic belongs to the layer of interest
            return result.graphic.layer === layerComarcas;
          })[0].graphic;



    
        }
      });
    }); */


 /*    layerRutaM.queryExtent().then(function(results){ 
      // go to the extent of the results satisfying the query
      view.goTo(results.extent);
    }); */

    view.when(function () {
      var popup = view.popup;
      popup.viewModel.on("trigger-action", function (event) {
        if (event.action.id === "comarca-boton") {
          
          var attributesC = popup.selectedFeature.attributes;
          var id_Comarcas = attributesC.comarca_sg;
          console.log(id_Comarcas);

          var query =  new Query();
          /* query.where = "idComarcas = ' '"; */

          layerRutaM.queryFeatures(query)
          .then(function(response){
            var idrutas = response.features[0].attributes;
            console.log(idrutas.idComarcas);
          });
        }
      });
    });


    
});


