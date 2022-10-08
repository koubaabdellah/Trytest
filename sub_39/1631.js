;(function (){
          treedata = (window.treedata || {});
          window.treedata.mode = 0;
          window.treedata.mapping = {'1631' : 'arcmap/latest/manage-data/main' ,'605' : 'arcmap/latest/manage-data/editing' ,'606' : 'arcmap/latest/manage-data/editing-fundamentals' ,'607' : 'arcmap/latest/manage-data/creating-new-features' ,'608' : 'arcmap/latest/manage-data/editing-existing-features' ,'609' : 'arcmap/latest/manage-data/editing-attributes' ,'610' : 'arcmap/latest/manage-data/editing-topology' ,'372' : 'arcmap/latest/manage-data/editing-parcels' ,'1782' : 'arcmap/latest/manage-data/databases' ,'71' : 'arcmap/latest/manage-data/geodatabases' ,'5' : 'arcmap/latest/manage-data/administer-gdb-intro' ,'574' : 'arcmap/latest/manage-data/gdb-architecture' ,'575' : 'arcmap/latest/manage-data/administer-file-gdbs' ,'576' : 'arcmap/latest/manage-data/database-servers' ,'49' : 'arcmap/latest/manage-data/gdbs-in-db2' ,'50' : 'arcmap/latest/manage-data/gdbs-in-informix' ,'51' : 'arcmap/latest/manage-data/gdbs-in-oracle' ,'52' : 'arcmap/latest/manage-data/gdbs-in-postgresql' ,'53' : 'arcmap/latest/manage-data/gdbs-in-sql-server' ,'139' : 'arcmap/latest/manage-data/using-sql-with-gdbs' ,'570' : 'arcmap/latest/manage-data/datatypes' ,'10' : 'arcmap/latest/manage-data/annotations' ,'20' : 'arcmap/latest/manage-data/cad' ,'24' : 'arcmap/latest/manage-data/coverages' ,'34' : 'arcmap/latest/manage-data/dimensions' ,'35' : 'arcmap/latest/manage-data/domains' ,'2283' : 'arcmap/latest/manage-data/feature-classes' ,'43' : 'arcmap/latest/manage-data/feature-datasets' ,'54' : 'arcmap/latest/manage-data/geometric-networks' ,'302' : 'arcmap/latest/manage-data/kml' ,'518' : 'arcmap/latest/manage-data/las-dataset' ,'2' : 'arcmap/latest/manage-data/locators' ,'76' : 'arcmap/latest/manage-data/metadata' ,'86' : 'arcmap/latest/manage-data/netcdf' ,'89' : 'arcmap/latest/manage-data/network-datasets' ,'165' : 'arcmap/latest/manage-data/parcel-fabrics' ,'196' : 'arcmap/latest/manage-data/raster-and-images' ,'96' : 'arcmap/latest/manage-data/relationships' ,'106' : 'arcmap/latest/manage-data/shapefiles' ,'114' : 'arcmap/latest/manage-data/subtypes' ,'115' : 'arcmap/latest/manage-data/tables' ,'117' : 'arcmap/latest/manage-data/terrains' ,'120' : 'arcmap/latest/manage-data/tin' ,'122' : 'arcmap/latest/manage-data/topologies' ,'130' : 'arcmap/latest/manage-data/using-arccatalog' ,'45' : 'arcmap/latest/manage-data/geocoding' ,'69' : 'arcmap/latest/manage-data/linear-referencing' ,'159' : 'arcmap/latest/manage-data/find-a-route' };
          treedata.data = {};
          treedata.data["root"]  = {  
              "parent" : "",
              "children" : ["1631_h0"]
            },treedata.data["root_1631"] = treedata.data["root"],
treedata.data["1631_h0"]  = { 
              "parent" : "root",
              "label" : "Verwalten von Daten",
              "children" : ["1631_h1","1631_h2","1631_h10","1631_h11","1631_h12","1631_h23","1631_h48","1631_h49","1631_h50","1631_h51"]
            }
            ,
treedata.data["1631_h1"]  = { 
              "parent" : "1631_h0",
              "label" : "Einleitung",
              "children" : ["1631_9"]
            }
            ,
treedata.data["1631_9"]  = {
            "parent" : "1631_h1",
            "label" : "Was sind Geodaten?",
            "url" : "/de/arcmap/latest/manage-data/main/what-is-geodata.htm"
            
          },
treedata.data["1631_h2"]  = { 
              "parent" : "1631_h0",
              "label" : "Framework",
              "children" : ["1631_h3","1631_h4","1631_h5","1631_h6","1631_h7","1631_h8","1631_h9"]
            }
            ,
treedata.data["1631_h3"]  = { 
              "parent" : "1631_h2",
              "label" : "Einleitung",
              "linkuri" : "605",
              "linkurl" : "/de/arcmap/latest/manage-data/editing/605.js"
            },
            treedata.data["rootalias_605"] = treedata.data["1631_h3"],
treedata.data["1631_h4"]  = { 
              "parent" : "1631_h2",
              "label" : "Grundlagen der Bearbeitung",
              "linkuri" : "606",
              "linkurl" : "/de/arcmap/latest/manage-data/editing-fundamentals/606.js"
            },
            treedata.data["rootalias_606"] = treedata.data["1631_h4"],
treedata.data["1631_h5"]  = { 
              "parent" : "1631_h2",
              "label" : "Erstellen neuer Features",
              "linkuri" : "607",
              "linkurl" : "/de/arcmap/latest/manage-data/creating-new-features/607.js"
            },
            treedata.data["rootalias_607"] = treedata.data["1631_h5"],
treedata.data["1631_h6"]  = { 
              "parent" : "1631_h2",
              "label" : "Bearbeiten vorhandener Features",
              "linkuri" : "608",
              "linkurl" : "/de/arcmap/latest/manage-data/editing-existing-features/608.js"
            },
            treedata.data["rootalias_608"] = treedata.data["1631_h6"],
treedata.data["1631_h7"]  = { 
              "parent" : "1631_h2",
              "label" : "Bearbeiten von Attributen",
              "linkuri" : "609",
              "linkurl" : "/de/arcmap/latest/manage-data/editing-attributes/609.js"
            },
            treedata.data["rootalias_609"] = treedata.data["1631_h7"],
treedata.data["1631_h8"]  = { 
              "parent" : "1631_h2",
              "label" : "Bearbeiten der Topologie",
              "linkuri" : "610",
              "linkurl" : "/de/arcmap/latest/manage-data/editing-topology/610.js"
            },
            treedata.data["rootalias_610"] = treedata.data["1631_h8"],
treedata.data["1631_h9"]  = { 
              "parent" : "1631_h2",
              "label" : "Bearbeiten von Flurstücken",
              "linkuri" : "372",
              "linkurl" : "/de/arcmap/latest/manage-data/editing-parcels/372.js"
            },
            treedata.data["rootalias_372"] = treedata.data["1631_h9"],
treedata.data["1631_h10"]  = { 
              "parent" : "1631_h0",
              "label" : "Datenbanken",
              "linkuri" : "1782",
              "linkurl" : "/de/arcmap/latest/manage-data/databases/1782.js"
            },
            treedata.data["rootalias_1782"] = treedata.data["1631_h10"],
treedata.data["1631_h11"]  = { 
              "parent" : "1631_h0",
              "label" : "Geodatabases",
              "linkuri" : "71",
              "linkurl" : "/de/arcmap/latest/manage-data/geodatabases/71.js"
            },
            treedata.data["rootalias_71"] = treedata.data["1631_h11"],
treedata.data["1631_h12"]  = { 
              "parent" : "1631_h0",
              "label" : "Verwalten von Geodatabases",
              "children" : ["1631_h13","1631_h14","1631_h15","1631_h16","1631_h17","1631_h18","1631_h19","1631_h20","1631_h21","1631_h22"]
            }
            ,
treedata.data["1631_h13"]  = { 
              "parent" : "1631_h12",
              "label" : "Einleitung",
              "linkuri" : "5",
              "linkurl" : "/de/arcmap/latest/manage-data/administer-gdb-intro/5.js"
            },
            treedata.data["rootalias_5"] = treedata.data["1631_h13"],
treedata.data["1631_h14"]  = { 
              "parent" : "1631_h12",
              "label" : "Architektur einer Geodatabase",
              "linkuri" : "574",
              "linkurl" : "/de/arcmap/latest/manage-data/gdb-architecture/574.js"
            },
            treedata.data["rootalias_574"] = treedata.data["1631_h14"],
treedata.data["1631_h15"]  = { 
              "parent" : "1631_h12",
              "label" : "Verwalten von File- und Personal-Geodatabases",
              "linkuri" : "575",
              "linkurl" : "/de/arcmap/latest/manage-data/administer-file-gdbs/575.js"
            },
            treedata.data["rootalias_575"] = treedata.data["1631_h15"],
treedata.data["1631_h16"]  = { 
              "parent" : "1631_h12",
              "label" : "Verwalten von Geodatabases auf Datenbankservern",
              "linkuri" : "576",
              "linkurl" : "/de/arcmap/latest/manage-data/database-servers/576.js"
            },
            treedata.data["rootalias_576"] = treedata.data["1631_h16"],
treedata.data["1631_h17"]  = { 
              "parent" : "1631_h12",
              "label" : "Geodatabases in Db2",
              "linkuri" : "49",
              "linkurl" : "/de/arcmap/latest/manage-data/gdbs-in-db2/49.js"
            },
            treedata.data["rootalias_49"] = treedata.data["1631_h17"],
treedata.data["1631_h18"]  = { 
              "parent" : "1631_h12",
              "label" : "Geodatabases in Informix",
              "linkuri" : "50",
              "linkurl" : "/de/arcmap/latest/manage-data/gdbs-in-informix/50.js"
            },
            treedata.data["rootalias_50"] = treedata.data["1631_h18"],
treedata.data["1631_h19"]  = { 
              "parent" : "1631_h12",
              "label" : "Geodatabases in Oracle",
              "linkuri" : "51",
              "linkurl" : "/de/arcmap/latest/manage-data/gdbs-in-oracle/51.js"
            },
            treedata.data["rootalias_51"] = treedata.data["1631_h19"],
treedata.data["1631_h20"]  = { 
              "parent" : "1631_h12",
              "label" : "Geodatabases in PostgreSQL",
              "linkuri" : "52",
              "linkurl" : "/de/arcmap/latest/manage-data/gdbs-in-postgresql/52.js"
            },
            treedata.data["rootalias_52"] = treedata.data["1631_h20"],
treedata.data["1631_h21"]  = { 
              "parent" : "1631_h12",
              "label" : "Geodatabases in SQL Server",
              "linkuri" : "53",
              "linkurl" : "/de/arcmap/latest/manage-data/gdbs-in-sql-server/53.js"
            },
            treedata.data["rootalias_53"] = treedata.data["1631_h21"],
treedata.data["1631_h22"]  = { 
              "parent" : "1631_h12",
              "label" : "Verwenden von SQL mit Geodatabases",
              "linkuri" : "139",
              "linkurl" : "/de/arcmap/latest/manage-data/using-sql-with-gdbs/139.js"
            },
            treedata.data["rootalias_139"] = treedata.data["1631_h22"],
treedata.data["1631_h23"]  = { 
              "parent" : "1631_h0",
              "label" : "Datentypen",
              "children" : ["1631_h24","1631_h25","1631_h26","1631_h27","1631_h28","1631_h29","1631_h30","1631_h31","1631_h32","1631_h33","1631_h34","1631_h35","1631_h36","1631_h37","1631_h38","1631_h39","1631_h40","1631_h41","1631_h42","1631_h43","1631_h44","1631_h45","1631_h46","1631_h47"]
            }
            ,
treedata.data["1631_h24"]  = { 
              "parent" : "1631_h23",
              "label" : "Einleitung",
              "linkuri" : "570",
              "linkurl" : "/de/arcmap/latest/manage-data/datatypes/570.js"
            },
            treedata.data["rootalias_570"] = treedata.data["1631_h24"],
treedata.data["1631_h25"]  = { 
              "parent" : "1631_h23",
              "label" : "Annotationen",
              "linkuri" : "10",
              "linkurl" : "/de/arcmap/latest/manage-data/annotations/10.js"
            },
            treedata.data["rootalias_10"] = treedata.data["1631_h25"],
treedata.data["1631_h26"]  = { 
              "parent" : "1631_h23",
              "label" : "CAD",
              "linkuri" : "20",
              "linkurl" : "/de/arcmap/latest/manage-data/cad/20.js"
            },
            treedata.data["rootalias_20"] = treedata.data["1631_h26"],
treedata.data["1631_h27"]  = { 
              "parent" : "1631_h23",
              "label" : "Coverages",
              "linkuri" : "24",
              "linkurl" : "/de/arcmap/latest/manage-data/coverages/24.js"
            },
            treedata.data["rootalias_24"] = treedata.data["1631_h27"],
treedata.data["1631_h28"]  = { 
              "parent" : "1631_h23",
              "label" : "Bemaßungs-Features",
              "linkuri" : "34",
              "linkurl" : "/de/arcmap/latest/manage-data/dimensions/34.js"
            },
            treedata.data["rootalias_34"] = treedata.data["1631_h28"],
treedata.data["1631_h29"]  = { 
              "parent" : "1631_h23",
              "label" : "Domänen",
              "linkuri" : "35",
              "linkurl" : "/de/arcmap/latest/manage-data/domains/35.js"
            },
            treedata.data["rootalias_35"] = treedata.data["1631_h29"],
treedata.data["1631_h30"]  = { 
              "parent" : "1631_h23",
              "label" : "Feature-Classes",
              "linkuri" : "2283",
              "linkurl" : "/de/arcmap/latest/manage-data/feature-classes/2283.js"
            },
            treedata.data["rootalias_2283"] = treedata.data["1631_h30"],
treedata.data["1631_h31"]  = { 
              "parent" : "1631_h23",
              "label" : "Feature-Datasets",
              "linkuri" : "43",
              "linkurl" : "/de/arcmap/latest/manage-data/feature-datasets/43.js"
            },
            treedata.data["rootalias_43"] = treedata.data["1631_h31"],
treedata.data["1631_h32"]  = { 
              "parent" : "1631_h23",
              "label" : "Geometrische Netzwerke",
              "linkuri" : "54",
              "linkurl" : "/de/arcmap/latest/manage-data/geometric-networks/54.js"
            },
            treedata.data["rootalias_54"] = treedata.data["1631_h32"],
treedata.data["1631_h33"]  = { 
              "parent" : "1631_h23",
              "label" : "KML",
              "linkuri" : "302",
              "linkurl" : "/de/arcmap/latest/manage-data/kml/302.js"
            },
            treedata.data["rootalias_302"] = treedata.data["1631_h33"],
treedata.data["1631_h34"]  = { 
              "parent" : "1631_h23",
              "label" : "LAS-Dataset",
              "linkuri" : "518",
              "linkurl" : "/de/arcmap/latest/manage-data/las-dataset/518.js"
            },
            treedata.data["rootalias_518"] = treedata.data["1631_h34"],
treedata.data["1631_h35"]  = { 
              "parent" : "1631_h23",
              "label" : "Locators",
              "linkuri" : "2",
              "linkurl" : "/de/arcmap/latest/manage-data/locators/2.js"
            },
            treedata.data["rootalias_2"] = treedata.data["1631_h35"],
treedata.data["1631_h36"]  = { 
              "parent" : "1631_h23",
              "label" : "Metadaten",
              "linkuri" : "76",
              "linkurl" : "/de/arcmap/latest/manage-data/metadata/76.js"
            },
            treedata.data["rootalias_76"] = treedata.data["1631_h36"],
treedata.data["1631_h37"]  = { 
              "parent" : "1631_h23",
              "label" : "NetCDF",
              "linkuri" : "86",
              "linkurl" : "/de/arcmap/latest/manage-data/netcdf/86.js"
            },
            treedata.data["rootalias_86"] = treedata.data["1631_h37"],
treedata.data["1631_h38"]  = { 
              "parent" : "1631_h23",
              "label" : "Netzwerk-Datasets",
              "linkuri" : "89",
              "linkurl" : "/de/arcmap/latest/manage-data/network-datasets/89.js"
            },
            treedata.data["rootalias_89"] = treedata.data["1631_h38"],
treedata.data["1631_h39"]  = { 
              "parent" : "1631_h23",
              "label" : "Parcel-Fabrics",
              "linkuri" : "165",
              "linkurl" : "/de/arcmap/latest/manage-data/parcel-fabrics/165.js"
            },
            treedata.data["rootalias_165"] = treedata.data["1631_h39"],
treedata.data["1631_h40"]  = { 
              "parent" : "1631_h23",
              "label" : "Raster und Bilder",
              "linkuri" : "196",
              "linkurl" : "/de/arcmap/latest/manage-data/raster-and-images/196.js"
            },
            treedata.data["rootalias_196"] = treedata.data["1631_h40"],
treedata.data["1631_h41"]  = { 
              "parent" : "1631_h23",
              "label" : "Beziehungen und in Beziehung stehende Objekte",
              "linkuri" : "96",
              "linkurl" : "/de/arcmap/latest/manage-data/relationships/96.js"
            },
            treedata.data["rootalias_96"] = treedata.data["1631_h41"],
treedata.data["1631_h42"]  = { 
              "parent" : "1631_h23",
              "label" : "Shapefiles",
              "linkuri" : "106",
              "linkurl" : "/de/arcmap/latest/manage-data/shapefiles/106.js"
            },
            treedata.data["rootalias_106"] = treedata.data["1631_h42"],
treedata.data["1631_h43"]  = { 
              "parent" : "1631_h23",
              "label" : "Subtypes",
              "linkuri" : "114",
              "linkurl" : "/de/arcmap/latest/manage-data/subtypes/114.js"
            },
            treedata.data["rootalias_114"] = treedata.data["1631_h43"],
treedata.data["1631_h44"]  = { 
              "parent" : "1631_h23",
              "label" : "Tabellen",
              "linkuri" : "115",
              "linkurl" : "/de/arcmap/latest/manage-data/tables/115.js"
            },
            treedata.data["rootalias_115"] = treedata.data["1631_h44"],
treedata.data["1631_h45"]  = { 
              "parent" : "1631_h23",
              "label" : "Terrains",
              "linkuri" : "117",
              "linkurl" : "/de/arcmap/latest/manage-data/terrains/117.js"
            },
            treedata.data["rootalias_117"] = treedata.data["1631_h45"],
treedata.data["1631_h46"]  = { 
              "parent" : "1631_h23",
              "label" : "TIN",
              "linkuri" : "120",
              "linkurl" : "/de/arcmap/latest/manage-data/tin/120.js"
            },
            treedata.data["rootalias_120"] = treedata.data["1631_h46"],
treedata.data["1631_h47"]  = { 
              "parent" : "1631_h23",
              "label" : "Topologien",
              "linkuri" : "122",
              "linkurl" : "/de/arcmap/latest/manage-data/topologies/122.js"
            },
            treedata.data["rootalias_122"] = treedata.data["1631_h47"],
treedata.data["1631_h48"]  = { 
              "parent" : "1631_h0",
              "label" : "Katalog",
              "linkuri" : "130",
              "linkurl" : "/de/arcmap/latest/manage-data/using-arccatalog/130.js"
            },
            treedata.data["rootalias_130"] = treedata.data["1631_h48"],
treedata.data["1631_h49"]  = { 
              "parent" : "1631_h0",
              "label" : "Geokodierung",
              "linkuri" : "45",
              "linkurl" : "/de/arcmap/latest/manage-data/geocoding/45.js"
            },
            treedata.data["rootalias_45"] = treedata.data["1631_h49"],
treedata.data["1631_h50"]  = { 
              "parent" : "1631_h0",
              "label" : "Lineare Referenzierung",
              "linkuri" : "69",
              "linkurl" : "/de/arcmap/latest/manage-data/linear-referencing/69.js"
            },
            treedata.data["rootalias_69"] = treedata.data["1631_h50"],
treedata.data["1631_h51"]  = { 
              "parent" : "1631_h0",
              "label" : "Suchen einer Route",
              "linkuri" : "159",
              "linkurl" : "/de/arcmap/latest/manage-data/find-a-route/159.js"
            },
            treedata.data["rootalias_159"] = treedata.data["1631_h51"]
        })()