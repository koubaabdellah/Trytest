;(function (){
          treedata = (window.treedata || {});
          window.treedata.mode = 0;
          window.treedata.mapping = {'1336' : 'geoevent/10.7/process-event-data' };
          treedata.data = {};
          treedata.data["root"]  = {  
              "parent" : "",
              "children" : ["1336_h0","1336_h2","1336_h5"]
            },treedata.data["root_1336"] = treedata.data["root"],
treedata.data["1336_h0"]  = { 
              "parent" : "root",
              "label" : "Connect to Data",
              "children" : ["1336_21","1336_31","1336_h1"]
            }
            ,
treedata.data["1336_21"]  = {
            "parent" : "1336_h0",
            "label" : "Overview of input connectors",
            "url" : "/en/geoevent/10.7/process-event-data/overview-of-input-connectors.htm"
            
          },
treedata.data["1336_31"]  = {
            "parent" : "1336_h0",
            "label" : "Available input connectors",
            "url" : "/en/geoevent/10.7/process-event-data/input-connectors.htm"
            
          },
treedata.data["1336_h1"]  = { 
              "parent" : "1336_h0",
              "label" : "Input connectors",
              "children" : ["1336_67","1336_80","1336_78","1336_79","1336_69","1336_70","1336_82","1336_77","1336_81","1336_75","1336_73","1336_74","1336_83","1336_85","1336_84","1336_72","1336_68","1336_71"]
            }
            ,
treedata.data["1336_67"]  = {
            "parent" : "1336_h1",
            "label" : "Poll an ArcGIS Server for Features",
            "url" : "/en/geoevent/10.7/process-event-data/poll-an-arcgis-server-for-features.htm"
            
          },
treedata.data["1336_80"]  = {
            "parent" : "1336_h1",
            "label" : "Poll an External Website for GeoJSON",
            "url" : "/en/geoevent/10.7/process-event-data/poll-an-external-website-for-geojson.htm"
            
          },
treedata.data["1336_78"]  = {
            "parent" : "1336_h1",
            "label" : "Poll an External Website for JSON",
            "url" : "/en/geoevent/10.7/process-event-data/poll-an-external-website-for-json.htm"
            
          },
treedata.data["1336_79"]  = {
            "parent" : "1336_h1",
            "label" : "Poll an External Website for XML",
            "url" : "/en/geoevent/10.7/process-event-data/poll-an-external-website-for-xml.htm"
            
          },
treedata.data["1336_69"]  = {
            "parent" : "1336_h1",
            "label" : "Receive Features on a REST Endpoint",
            "url" : "/en/geoevent/10.7/process-event-data/receive-features-on-a-rest-endpoint.htm"
            
          },
treedata.data["1336_70"]  = {
            "parent" : "1336_h1",
            "label" : "Receive GeoJSON on a REST Endpoint",
            "url" : "/en/geoevent/10.7/process-event-data/receive-geojson-on-a-rest-endpoint.htm"
            
          },
treedata.data["1336_82"]  = {
            "parent" : "1336_h1",
            "label" : "Receive GeoJSON on a WebSocket",
            "url" : "/en/geoevent/10.7/process-event-data/receive-geojson-on-a-websocket.htm"
            
          },
treedata.data["1336_77"]  = {
            "parent" : "1336_h1",
            "label" : "Receive JSON on a REST Endpoint",
            "url" : "/en/geoevent/10.7/process-event-data/receive-json-on-a-rest-endpoint.htm"
            
          },
treedata.data["1336_81"]  = {
            "parent" : "1336_h1",
            "label" : "Receive JSON on a WebSocket",
            "url" : "/en/geoevent/10.7/process-event-data/receive-json-on-a-websocket.htm"
            
          },
treedata.data["1336_75"]  = {
            "parent" : "1336_h1",
            "label" : "Receive RSS",
            "url" : "/en/geoevent/10.7/process-event-data/receive-rss.htm"
            
          },
treedata.data["1336_73"]  = {
            "parent" : "1336_h1",
            "label" : "Receive Text from a TCP Socket",
            "url" : "/en/geoevent/10.7/process-event-data/receive-text-from-a-tcp-socket.htm"
            
          },
treedata.data["1336_74"]  = {
            "parent" : "1336_h1",
            "label" : "Receive Text from a UDP Socket",
            "url" : "/en/geoevent/10.7/process-event-data/receive-text-from-a-udp-socket.htm"
            
          },
treedata.data["1336_83"]  = {
            "parent" : "1336_h1",
            "label" : "Receive XML on a REST Endpoint",
            "url" : "/en/geoevent/10.7/process-event-data/receive-xml-on-a-rest-endpoint.htm"
            
          },
treedata.data["1336_85"]  = {
            "parent" : "1336_h1",
            "label" : "Subscribe to an External WebSocket for GeoJSON",
            "url" : "/en/geoevent/10.7/process-event-data/subscribe-to-an-external-websocket-for-geojson.htm"
            
          },
treedata.data["1336_84"]  = {
            "parent" : "1336_h1",
            "label" : "Subscribe to an External WebSocket for JSON",
            "url" : "/en/geoevent/10.7/process-event-data/subscribe-to-an-external-websocket-for-json.htm"
            
          },
treedata.data["1336_72"]  = {
            "parent" : "1336_h1",
            "label" : "Watch a Folder for New CSV Files",
            "url" : "/en/geoevent/10.7/process-event-data/watch-a-folder-for-new-csv-files.htm"
            
          },
treedata.data["1336_68"]  = {
            "parent" : "1336_h1",
            "label" : "Watch a Folder for New GeoJSON Files",
            "url" : "/en/geoevent/10.7/process-event-data/watch-a-folder-for-new-geojson-files.htm"
            
          },
treedata.data["1336_71"]  = {
            "parent" : "1336_h1",
            "label" : "Watch a Folder for New JSON Files",
            "url" : "/en/geoevent/10.7/process-event-data/watch-a-folder-for-new-json-files.htm"
            
          },
treedata.data["1336_h2"]  = { 
              "parent" : "root",
              "label" : "Analyze and Process Data",
              "children" : ["1336_4","1336_23","1336_h3","1336_26","1336_h4","1336_25","1336_28"]
            }
            ,
treedata.data["1336_4"]  = {
            "parent" : "1336_h2",
            "label" : "Overview of GeoEvent Services",
            "url" : "/en/geoevent/10.7/process-event-data/overview-of-geoevent-services.htm"
            
          },
treedata.data["1336_23"]  = {
            "parent" : "1336_h2",
            "label" : "Creating a GeoEvent Service",
            "url" : "/en/geoevent/10.7/process-event-data/creating-a-geoevent-service.htm"
            
          },
treedata.data["1336_h3"]  = { 
              "parent" : "1336_h2",
              "label" : "Filters",
              "children" : ["1336_32","1336_58","1336_40","1336_60","1336_44","1336_54"]
            }
            ,
treedata.data["1336_32"]  = {
            "parent" : "1336_h3",
            "label" : "What are filters?",
            "url" : "/en/geoevent/10.7/process-event-data/filters.htm"
            
          },
treedata.data["1336_58"]  = {
            "parent" : "1336_h3",
            "label" : "Attribute filters",
            "url" : "/en/geoevent/10.7/process-event-data/attribute-filters.htm"
            
          },
treedata.data["1336_40"]  = {
            "parent" : "1336_h3",
            "label" : "Spatial filters",
            "url" : "/en/geoevent/10.7/process-event-data/spatial-filters.htm"
            
          },
treedata.data["1336_60"]  = {
            "parent" : "1336_h3",
            "label" : "Property filters",
            "url" : "/en/geoevent/10.7/process-event-data/property-filters.htm"
            
          },
treedata.data["1336_44"]  = {
            "parent" : "1336_h3",
            "label" : "Create filters using tags",
            "url" : "/en/geoevent/10.7/process-event-data/create-filters-using-tags.htm"
            
          },
treedata.data["1336_54"]  = {
            "parent" : "1336_h3",
            "label" : "Create filters using regular expressions",
            "url" : "/en/geoevent/10.7/process-event-data/create-filters-using-regular-expressions.htm"
            
          },
treedata.data["1336_26"]  = {
            "parent" : "1336_h2",
            "label" : "Adding filters to GeoEvent Services",
            "url" : "/en/geoevent/10.7/process-event-data/adding-a-filter-to-a-geoevent-service.htm"
            
          },
treedata.data["1336_h4"]  = { 
              "parent" : "1336_h2",
              "label" : "Processors",
              "children" : ["1336_30","1336_61","1336_62","1336_48","1336_56","1336_49","1336_53","1336_64","1336_63","1336_65","1336_41","1336_46","1336_50","1336_47","1336_57","1336_39","1336_45","1336_51","1336_37","1336_52","1336_55","1336_66","1336_38","1336_59","1336_42","1336_43"]
            }
            ,
treedata.data["1336_30"]  = {
            "parent" : "1336_h4",
            "label" : "What are processors?",
            "url" : "/en/geoevent/10.7/process-event-data/processors.htm"
            
          },
treedata.data["1336_61"]  = {
            "parent" : "1336_h4",
            "label" : "Add XYZ Values Processor",
            "url" : "/en/geoevent/10.7/process-event-data/add-xyz-values-processor.htm"
            
          },
treedata.data["1336_62"]  = {
            "parent" : "1336_h4",
            "label" : "Bearing Calculator Processor",
            "url" : "/en/geoevent/10.7/process-event-data/bearing-calculator-processor.htm"
            
          },
treedata.data["1336_48"]  = {
            "parent" : "1336_h4",
            "label" : "Buffer Creator Processor",
            "url" : "/en/geoevent/10.7/process-event-data/buffer-creator-processor.htm"
            
          },
treedata.data["1336_56"]  = {
            "parent" : "1336_h4",
            "label" : "Convex Hull Processor",
            "url" : "/en/geoevent/10.7/process-event-data/convex-hull-creator-processor.htm"
            
          },
treedata.data["1336_49"]  = {
            "parent" : "1336_h4",
            "label" : "Difference Creator Processor",
            "url" : "/en/geoevent/10.7/process-event-data/difference-creator-processor.htm"
            
          },
treedata.data["1336_53"]  = {
            "parent" : "1336_h4",
            "label" : "Envelope Creator Processor",
            "url" : "/en/geoevent/10.7/process-event-data/envelope-creator-processor.htm"
            
          },
treedata.data["1336_64"]  = {
            "parent" : "1336_h4",
            "label" : "Event Joiner Processor",
            "url" : "/en/geoevent/10.7/process-event-data/event-joiner-processor.htm"
            
          },
treedata.data["1336_63"]  = {
            "parent" : "1336_h4",
            "label" : "Event Volume Controller Processor",
            "url" : "/en/geoevent/10.7/process-event-data/event-volume-controller-processor.htm"
            
          },
treedata.data["1336_65"]  = {
            "parent" : "1336_h4",
            "label" : "Feature to Point Processor",
            "url" : "/en/geoevent/10.7/process-event-data/feature-to-point-processor.htm"
            
          },
treedata.data["1336_41"]  = {
            "parent" : "1336_h4",
            "label" : "Field Calculator Processor",
            "url" : "/en/geoevent/10.7/process-event-data/field-calculator-processor.htm"
            
          },
treedata.data["1336_46"]  = {
            "parent" : "1336_h4",
            "label" : "Field Calculator (Regular Expression) Processor",
            "url" : "/en/geoevent/10.7/process-event-data/field-calculator-regular-expression-processor.htm"
            
          },
treedata.data["1336_50"]  = {
            "parent" : "1336_h4",
            "label" : "Field Enricher (Feature Service) Processor",
            "url" : "/en/geoevent/10.7/process-event-data/field-enricher-feature-service-processor.htm"
            
          },
treedata.data["1336_47"]  = {
            "parent" : "1336_h4",
            "label" : "Field Enricher (File) Processor",
            "url" : "/en/geoevent/10.7/process-event-data/field-enricher-file-processor.htm"
            
          },
treedata.data["1336_57"]  = {
            "parent" : "1336_h4",
            "label" : "Field Mapper Processor",
            "url" : "/en/geoevent/10.7/process-event-data/field-mapper-processor.htm"
            
          },
treedata.data["1336_39"]  = {
            "parent" : "1336_h4",
            "label" : "Field Reducer Processor",
            "url" : "/en/geoevent/10.7/process-event-data/field-reducer-processor.htm"
            
          },
treedata.data["1336_45"]  = {
            "parent" : "1336_h4",
            "label" : "GeoTagger Processor",
            "url" : "/en/geoevent/10.7/process-event-data/geotagger-processor.htm"
            
          },
treedata.data["1336_51"]  = {
            "parent" : "1336_h4",
            "label" : "Incident Detector Processor",
            "url" : "/en/geoevent/10.7/process-event-data/incident-detector-processor.htm"
            
          },
treedata.data["1336_37"]  = {
            "parent" : "1336_h4",
            "label" : "Intersector Processor",
            "url" : "/en/geoevent/10.7/process-event-data/intersector-processor.htm"
            
          },
treedata.data["1336_52"]  = {
            "parent" : "1336_h4",
            "label" : "No Operation Processor",
            "url" : "/en/geoevent/10.7/process-event-data/no-operation-processor.htm"
            
          },
treedata.data["1336_55"]  = {
            "parent" : "1336_h4",
            "label" : "Projector Processor",
            "url" : "/en/geoevent/10.7/process-event-data/projector-processor.htm"
            
          },
treedata.data["1336_66"]  = {
            "parent" : "1336_h4",
            "label" : "Range Fan  Calculator Processor",
            "url" : "/en/geoevent/10.7/process-event-data/range-fan-calculator-processor.htm"
            
          },
treedata.data["1336_38"]  = {
            "parent" : "1336_h4",
            "label" : "Simplifier Processor",
            "url" : "/en/geoevent/10.7/process-event-data/simplifier-processor.htm"
            
          },
treedata.data["1336_59"]  = {
            "parent" : "1336_h4",
            "label" : "Symmetric Difference Creator Processor",
            "url" : "/en/geoevent/10.7/process-event-data/symmetric-difference-creator-processor.htm"
            
          },
treedata.data["1336_42"]  = {
            "parent" : "1336_h4",
            "label" : "Track Gap Detector Processor",
            "url" : "/en/geoevent/10.7/process-event-data/track-gap-detector-processor.htm"
            
          },
treedata.data["1336_43"]  = {
            "parent" : "1336_h4",
            "label" : "Union Creator Processor",
            "url" : "/en/geoevent/10.7/process-event-data/union-creator-processor.htm"
            
          },
treedata.data["1336_25"]  = {
            "parent" : "1336_h2",
            "label" : "Adding  processors to GeoEvent Services",
            "url" : "/en/geoevent/10.7/process-event-data/adding-a-processor-to-a-geoevent-service.htm"
            
          },
treedata.data["1336_28"]  = {
            "parent" : "1336_h2",
            "label" : "Publishing GeoEvent Services",
            "url" : "/en/geoevent/10.7/process-event-data/publishing-a-geoevent-service.htm"
            
          },
treedata.data["1336_h5"]  = { 
              "parent" : "root",
              "label" : "Send Updates and Alerts",
              "children" : ["1336_20","1336_29","1336_h6","1336_33"]
            }
            ,
treedata.data["1336_20"]  = {
            "parent" : "1336_h5",
            "label" : "Overview of output connectors",
            "url" : "/en/geoevent/10.7/process-event-data/overview-of-output-connectors.htm"
            
          },
treedata.data["1336_29"]  = {
            "parent" : "1336_h5",
            "label" : "Available output connectors",
            "url" : "/en/geoevent/10.7/process-event-data/output-connectors.htm"
            
          },
treedata.data["1336_h6"]  = { 
              "parent" : "1336_h5",
              "label" : "Output connectors",
              "children" : ["1336_87","1336_88","1336_101","1336_93","1336_102","1336_91","1336_99","1336_100","1336_96","1336_97","1336_98","1336_95","1336_86","1336_89","1336_90","1336_92","1336_94"]
            }
            ,
treedata.data["1336_87"]  = {
            "parent" : "1336_h6",
            "label" : "Add a Feature",
            "url" : "/en/geoevent/10.7/process-event-data/add-a-feature.htm"
            
          },
treedata.data["1336_88"]  = {
            "parent" : "1336_h6",
            "label" : "Add a Feature to a Spatiotemporal Big Data Store",
            "url" : "/en/geoevent/10.7/process-event-data/add-a-feature-to-a-spatiotemporal-big-data-store.htm"
            
          },
treedata.data["1336_101"]  = {
            "parent" : "1336_h6",
            "label" : "Publish Text to a UDP Socket",
            "url" : "/en/geoevent/10.7/process-event-data/publish-text-to-a-udp-socket.htm"
            
          },
treedata.data["1336_93"]  = {
            "parent" : "1336_h6",
            "label" : "Push GeoJSON to an External Website",
            "url" : "/en/geoevent/10.7/process-event-data/push-geojson-to-an-external-website.htm"
            
          },
treedata.data["1336_102"]  = {
            "parent" : "1336_h6",
            "label" : "Push GeoJSON to an External WebSocket",
            "url" : "/en/geoevent/10.7/process-event-data/push-geojson-to-an-external-websocket.htm"
            
          },
treedata.data["1336_91"]  = {
            "parent" : "1336_h6",
            "label" : "Push JSON to an External Website",
            "url" : "/en/geoevent/10.7/process-event-data/push-json-to-an-external-website.htm"
            
          },
treedata.data["1336_99"]  = {
            "parent" : "1336_h6",
            "label" : "Push JSON to an External WebSocket",
            "url" : "/en/geoevent/10.7/process-event-data/push-json-to-an-external-websocket.htm"
            
          },
treedata.data["1336_100"]  = {
            "parent" : "1336_h6",
            "label" : "Push Text to and External TCP Socket",
            "url" : "/en/geoevent/10.7/process-event-data/push-text-to-an-external-tcp-socket.htm"
            
          },
treedata.data["1336_96"]  = {
            "parent" : "1336_h6",
            "label" : "Send a Text Message",
            "url" : "/en/geoevent/10.7/process-event-data/send-a-text-message.htm"
            
          },
treedata.data["1336_97"]  = {
            "parent" : "1336_h6",
            "label" : "Send an Email",
            "url" : "/en/geoevent/10.7/process-event-data/send-an-email.htm"
            
          },
treedata.data["1336_98"]  = {
            "parent" : "1336_h6",
            "label" : "Send an Instant Message",
            "url" : "/en/geoevent/10.7/process-event-data/send-an-instant-message.htm"
            
          },
treedata.data["1336_95"]  = {
            "parent" : "1336_h6",
            "label" : "Send Features to a Stream Service",
            "url" : "/en/geoevent/10.7/process-event-data/send-features-to-a-stream-service.htm"
            
          },
treedata.data["1336_86"]  = {
            "parent" : "1336_h6",
            "label" : "Update a Feature",
            "url" : "/en/geoevent/10.7/process-event-data/update-a-feature.htm"
            
          },
treedata.data["1336_89"]  = {
            "parent" : "1336_h6",
            "label" : "Update a Feature in a Spatiotemporal Big Data Store",
            "url" : "/en/geoevent/10.7/process-event-data/update-a-feature-in-a-spatiotemporal-big-data-store.htm"
            
          },
treedata.data["1336_90"]  = {
            "parent" : "1336_h6",
            "label" : "Write to a CSV File",
            "url" : "/en/geoevent/10.7/process-event-data/write-to-a-csv-file.htm"
            
          },
treedata.data["1336_92"]  = {
            "parent" : "1336_h6",
            "label" : "Write to a GeoJSON File",
            "url" : "/en/geoevent/10.7/process-event-data/write-to-a-geojson-file.htm"
            
          },
treedata.data["1336_94"]  = {
            "parent" : "1336_h6",
            "label" : "Write to a JSON File",
            "url" : "/en/geoevent/10.7/process-event-data/write-to-a-json-file.htm"
            
          },
treedata.data["1336_33"]  = {
            "parent" : "1336_h5",
            "label" : "Stream services",
            "url" : "/en/geoevent/10.7/process-event-data/stream-services.htm"
            
          }
        })()