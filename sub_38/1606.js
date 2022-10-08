;(function (){
          treedata = (window.treedata || {});
          window.treedata.mode = 0;
          window.treedata.mapping = {'1606' : 'arcmap/10.4/get-started/main' ,'1607' : 'arcmap/10.4/get-started/introduction' ,'1608' : 'arcmap/10.4/get-started/setup' ,'167' : 'arcmap/10.4/get-started/installation-guide' ,'3' : 'arcmap/10.4/get-started/administer' ,'340' : 'arcmap/10.4/get-started/customizing-the-ui' ,'1604' : 'arcmap/10.4/get-started/terms-of-use' };
          treedata.data = {};
          treedata.data["root"]  = {  
              "parent" : "",
              "children" : ["1606_h0"]
            },treedata.data["root_1606"] = treedata.data["root"],
treedata.data["1606_h0"]  = { 
              "parent" : "root",
              "label" : "Erstellen von Apps",
              "children" : ["1606_149","1606_h1","1606_h2","1606_h4","1606_h5","1606_h6"]
            }
            ,
treedata.data["1606_149"]  = {
            "parent" : "1606_h0",
            "label" : "Erste Schritte mit ArcMap",
            "url" : "/de/arcmap/10.4/get-started/main/get-started-with-arcmap.htm"
            ,"homepage": true
          },
treedata.data["1606_h1"]  = { 
              "parent" : "1606_h0",
              "label" : "Einführung in ArcMap und ArcCatalog",
              "linkuri" : "1607",
              "linkurl" : "/de/arcmap/10.4/get-started/introduction/1607.js"
            },
            treedata.data["rootalias_1607"] = treedata.data["1606_h1"],
treedata.data["1606_h2"]  = { 
              "parent" : "1606_h0",
              "label" : "Einrichten von ArcMap und ArcCatalog",
              "children" : [{"graft":true, "linkuri": "1608", "linkurl": "/de/arcmap/10.4/get-started/setup/1608.js", "toc": "None"},"1606_h3"]
            },treedata.data["rootalias_1608"] = treedata.data["1606_h2"]
            ,
treedata.data["1606_h3"]  = { 
              "parent" : "1606_h2",
              "label" : "Installationsanweisungen",
              "linkuri" : "167",
              "linkurl" : "/de/arcmap/10.4/get-started/installation-guide/167.js"
            },
            treedata.data["rootalias_167"] = treedata.data["1606_h3"],
treedata.data["1606_h4"]  = { 
              "parent" : "1606_h0",
              "label" : "Verwalten von ArcMap und ArcCatalog",
              "linkuri" : "3",
              "linkurl" : "/de/arcmap/10.4/get-started/administer/3.js"
            },
            treedata.data["rootalias_3"] = treedata.data["1606_h4"],
treedata.data["1606_h5"]  = { 
              "parent" : "1606_h0",
              "label" : "Anpassen der Benutzeroberfläche",
              "linkuri" : "340",
              "linkurl" : "/de/arcmap/10.4/get-started/customizing-the-ui/340.js"
            },
            treedata.data["rootalias_340"] = treedata.data["1606_h5"],
treedata.data["1606_h6"]  = { 
              "parent" : "1606_h0",
              "label" : "Nutzungsbedingungen",
              "linkuri" : "1604",
              "linkurl" : "/de/arcmap/10.4/get-started/terms-of-use/1604.js"
            },
            treedata.data["rootalias_1604"] = treedata.data["1606_h6"]
        })()