if(!docConfig){
    docConfig = {};
}

if(!docConfig.switcher){
  docConfig.switcher = {
    "basepaths": {
	  "10.8" : "arcmap/latest",
	  "10.7" : "arcmap/10.7",
      "10.6" : "arcmap/10.6"
    },

    "switchercases": {
	  "10.8" : "10.8",
	  "10.7" : "10.7",
      "10.6" : "10.6"
    },

    "caseTbl": {
      "__order": {
		"10.8" : 1,
        "10.7" : 2,
        "10.6" : 3
      },

  },

    "switcherdisplay": true,
  };
}

var currentURL = document.location.href;
if(currentURL.match(/(\/arcmap\/latest\/extensions\/arcscene\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/arcscene";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/arcscene";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/3d-analyst";
}else if(currentURL.match(/(\/arcmap\/latest\/extensions\/arcglobe\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/arcglobe";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/arcglobe";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/3d-analyst";
}
else if(currentURL.match(/(\/arcmap\/latest\/install\/location-referencing\/|\/arcmap\/10.7\/install\/location-referencing\/|\/arcmap\/10.6\/install\/location-referencing\/|\/arcmap\/10\.5\/install\/location-referencing\/|\/arcmap\/10\.3\/install\/roads-highways\/|\/arcmap\/10\.4\/install\/roads-highways\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/install/location-referencing";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/install/location-referencing";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/install/location-referencing";

  docConfig.switcher.caseTbl["introduction-to-the-location-referencing-for-desktop-installation-guide"] = ['-','-','-','-','introduction-to-the-esri-roads-and-highways-desktop-install-guide','introduction-to-the-esri-roads-and-highways-desktop-install-guide'];
  docConfig.switcher.caseTbl["arcgis-location-referencing-system-requirements"] = ['-','-','-','-','esri-roads-and-highways-for-desktop-system-requirements','esri-roads-and-highways-for-desktop-system-requirements'];
  docConfig.switcher.caseTbl["installing-location-referencing"] = ['-','-','-','-','installing-roads-and-highways-desktop','installing-roads-and-highways-desktop'];
  docConfig.switcher.caseTbl["installing-location-referencing-silently"] = ['-','-','-','-','installing-esri-roads-and-highways-desktop-silently','installing-esri-roads-and-highways-desktop-silently'];
  docConfig.switcher.caseTbl["uninstalling-location-referencing"] = ['-','-','-','-','uninstalling-esri-roads-and-highways-desktop','uninstalling-esri-roads-and-highways-desktop'];
  docConfig.switcher.caseTbl["introduction-to-the-esri-roads-and-highways-desktop-install-guide"] = ['introduction-to-the-location-referencing-for-desktop-installation-guide','introduction-to-the-location-referencing-for-desktop-installation-guide','introduction-to-the-location-referencing-for-desktop-installation-guide','introduction-to-the-location-referencing-for-desktop-installation-guide','-','-'];
  docConfig.switcher.caseTbl["esri-roads-and-highways-for-desktop-system-requirements"] = ['arcgis-location-referencing-system-requirements','arcgis-location-referencing-system-requirements','arcgis-location-referencing-system-requirements',  'arcgis-location-referencing-system-requirements','-','-'];
  docConfig.switcher.caseTbl["installing-roads-and-highways-desktop"] = ['installing-location-referencing','installing-location-referencing','installing-location-referencing','installing-location-referencing','-','-'];
  docConfig.switcher.caseTbl["installing-esri-roads-and-highways-desktop-silently"] = ['installing-location-referencing-silently','installing-location-referencing-silently','installing-location-referencing-silently','installing-location-referencing-silently','-','-'];
  docConfig.switcher.caseTbl["uninstalling-esri-roads-and-highways-desktop"] = ['uninstalling-location-referencing','uninstalling-location-referencing','uninstalling-location-referencing','uninstalling-location-referencing','-','-'];
  //docConfig.switcher.caseTbl["existing-location-referencing-users"] = ['-','-','x','x'];
  //docConfig.switcher.caseTbl["uninstalling-earlier-releases-of-esri-roads-and-highways-for-desktop"] = ['x','x','x','-'];
}else if(currentURL.match(/(\/arcmap\/latest\/extensions\/|\/arcmap\/10.7\/extensions\/|\/arcmap\/10\.6\/extensions\/|\/arcmap\/10\.5\/extensions\/|\/arcmap\/10\.4\/extensions\/|\/arcmap\/10\.3\/guide-books\/extensions\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions";

  if(currentURL.match(/(\/arcmap\/.*\/extensions\/workflow-manager\/|\/arcmap\/10\.3\/guide-books\/extensions\/workflow-manager\/)/)){

  }else if(currentURL.match(/(\/arcmap\/.*\/extensions\/business-analyst)/)){
    docConfig.switcher.caseTbl["build-territory-network-index"] = ['building-a-territory-network-index','building-a-territory-network-index','building-a-territory-network-index','building-a-territory-network-index','-','x'];
    docConfig.switcher.caseTbl["building-a-territory-network-index"] = ['-','-','-','-','build-territory-network-index','x'];
  }else if(currentURL.match(/(\/arcmap\/.*\/extensions\/network-analyst)/)){

  }else if(currentURL.match(/(\/arcmap\/latest\/extensions\/aviation-charting\/|\/arcmap\/10.7\/extensions\/aviation-charting\/|\/arcmap\/10.6\/extensions\/aviation-charting\/|\/arcmap\/10\.5\/extensions\/aviation-charting\/|\/arcmap\/10\.4\/extensions\/aviation-charting\/|\/arcmap\/10\.3\/guide-books\/extensions\/aviation-charting\/)/)){

}else if(currentURL.match(/(\/arcmap\/.*\/extensions\/data-reviewer\/|\/arcmap\/10\.3\/guide-books\/extensions\/data-reviewer\/|\/arcmap\/latest\/extensions\/data-reviewer-guide\/|\/arcmap\/10.7\/extensions\/data-reviewer-guide\/|\/arcmap\/10.6\/extensions\/data-reviewer-guide\/|\/arcmap\/10\.5\/extensions\/data-reviewer-guide\/)/)){
	docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/data-reviewer";
    docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/data-reviewer";
	docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/data-reviewer";

    if(currentURL.match(/(\/arcmap\/latest\/extensions\/data-reviewer-guide\/admin-dr-postgresql\/|\/arcmap\/10.7\/extensions\/data-reviewer-guide\/admin-dr-postgresql\/|\/arcmap\/10.6\/extensions\/data-reviewer-guide\/admin-dr-postgresql\/|\/arcmap\/10\.5\/extensions\/data-reviewer-guide\/admin-dr-postgresql\/)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/data-reviewer-guide/admin-dr-postgresql";
      docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/data-reviewer-guide/admin-dr-postgresql";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/data-reviewer-guide/admin-dr-postgresql";
    }else
    if(currentURL.match(/(\/admin-dr-oracle\/creating-the-reviewer-workspace-in-an-enterprise-geodatabase\.|\/admin-dr-oracle\/registering-the-reviewer-feature-dataset-and-tables-as-versioned-in-an-enterprise-geodatabase\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/data-reviewer-guide/admin-dr-oracle";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/data-reviewer-guide/admin-dr-oracle";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/data-reviewer-guide/admin-dr-oracle";
    }else if(currentURL.match(/(\/introduction-to-storing-the-data-reviewer-workspace-in-an-enterprise-geodatabase-in-sql-server\.|\/creating-and-configuring-the-reviewer-workspace-in-an-enterprise-geodatabase-in-sql-server\.|\/geodatabase-configuration-keywords-and-disk-configuration-for-the-reviewer-workspace-in-sql-server\.|\/transparent-data-encryption-tde-for-the-reviewer-workspace-in-sql-server\.|\/creating-data-files-for-the-reviewer-workspace-in-sql-server\.|\/adding-a-configuration-keyword-to-the-geodatabase-in-sql-server-for-the-reviewer-workspace\.|\/creating-the-administrator-users-and-connection-in-sql-server-for-the-reviewer-workspace\.|\/creating-the-reviewer-workspace-in-an-enterprise-geodatabase\.|\/verifying-the-filegroup-storage-for-the-reviewer-workspace-in-sql-server\.|\/using-data-compression-for-the-reviewer-workspace-in-sql-server\.|\/registering-the-reviewer-feature-dataset-and-tables-as-versioned-in-an-enterprise-geodatabase\.|\/granting-privileges-to-the-reviewer-workspace-components-in-sql-server\.|\/log-file-tables-configuration-for-the-reviewer-workspace-in-sql-server\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/data-reviewer-guide/admin-dr-sql-server";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/data-reviewer-guide/admin-dr-sql-server";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/data-reviewer-guide/admin-dr-sql-server";
    }else if(currentURL.match(/(\/introduction-to-storing-the-reviewer-workspace-in-a-geodatabase-oracle\.|\/creating-and-configuring-the-reviewer-workspace-in-oracle\.|\/geodatabase-configuration-keywords-and-disk-configuration-for-the-reviewer-workspace-in-oracle\.|\/transparent-data-encryption-tde-for-the-reviewer-workspace-in-oracle\.|\/using-data-compression-for-the-reviewer-workspace-in-oracle\.|\/creating-data-files-for-the-reviewer-workspace-in-oracle\.|\/adding-a-configuration-keyword-to-the-geodatabase-in-oracle-for-the-reviewer-workspace\.|\/creating-the-administrator-users-and-connection-in-oracle-for-the-reviewer-workspace\.|\/creating-the-reviewer-workspace-in-an-enterprise-geodatabase\.|\/verifying-the-tablespace-storage-for-the-reviewer-workspace-in-oracle\.|\/registering-the-reviewer-feature-dataset-and-tables-as-versioned-in-an-enterprise-geodatabase\.|\/granting-privileges-to-the-reviewer-workspace-components-in-oracle\.|\/log-file-tables-configuration-for-the-reviewer-workspace-in-oracle\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/data-reviewer-guide/admin-dr-oracle";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/data-reviewer-guide/admin-dr-oracle";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/data-reviewer-guide/admin-dr-oracle";
    }
  }else if(currentURL.match(/(\/arcmap\/.*\/extensions\/production-mapping\/|\/arcmap\/latest\/extensions\/production-mapping-guide\/|\/arcmap\/10.7\/extensions\/production-mapping-guide\/|\/arcmap\/10.6\/extensions\/production-mapping-guide\/|\/arcmap\/10\.5\/extensions\/production-mapping-guide\/|\/arcmap\/10\.3\/guide-books\/extensions\/production-mapping\/)/)){
	docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping";
    docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping";
	docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping";

    docConfig.switcher.caseTbl["what-s-new-in-cartography-for-production-mapping"] = ['what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','-','-'];
    docConfig.switcher.caseTbl["what-s-new-in-editing-for-production-mapping"] = ['what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','-','-'];
    docConfig.switcher.caseTbl["whats-new-in-product-library-for-production-mapping"] = ['what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','what-s-new-in-esri-production-mapping','-','-'];
    docConfig.switcher.caseTbl["what-s-new-in-esri-production-mapping"] = ['-','-','-','-','what-s-new-in-cartography-for-production-mapping','what-s-new-in-cartography-for-production-mapping'];
    if(currentURL.match(/(\/arcmap\/latest\/extensions\/production-mapping-guide\/admin-pl-postgresql\/|\/arcmap\/10.7\/extensions\/production-mapping-guide\/admin-pl-postgresql\/|\/arcmap\/10.6\/extensions\/production-mapping-guide\/admin-pl-postgresql\/|\/arcmap\/10\.5\/extensions\/production-mapping-guide\/admin-pl-postgresql\/)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pl-postgresql";
      docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pl-postgresql";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pl-postgresql";
    }else if(currentURL.match(/(\/arcmap\/latest\/extensions\/production-mapping-guide\/admin-pm-postgresql\/|\/arcmap\/10.7\/extensions\/production-mapping-guide\/admin-pm-postgresql\/|\/arcmap\/10.6\/extensions\/production-mapping-guide\/admin-pm-postgresql\/|\/arcmap\/10\.5\/extensions\/production-mapping-guide\/admin-pm-postgresql\/)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pm-postgresql";
      docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pm-postgresql";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pm-postgresql";
    }else if(currentURL.match(/(\/admin-pl-sql-express\/registering-product-library-components-as-versioned\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pl-sql-express";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pl-sql-express";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pl-sql-express";
    }else if(currentURL.match(/(\/admin-pl-sql-server\/creating-the-product-library-workspace-in-an-enterprise-geodatabase\.|\/admin-pl-sql-server\/registering-product-library-components-as-versioned\.|\/admin-pl-sql-server\/granting-privileges-to-product-library-components-through-arccatalog\.|\/admin-pl-sql-server\/creating-product-library-users-and-assigning-permissions\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pl-sql-server";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pl-sql-server";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pl-sql-server";
    }else if(currentURL.match(/(\/admin-pl-oracle\/creating-the-product-library-workspace-in-an-enterprise-geodatabase\.|\/admin-pl-oracle\/registering-product-library-components-as-versioned\.|\/admin-pl-oracle\/granting-privileges-to-product-library-components-through-arccatalog\.|\/admin-pl-oracle\/creating-product-library-users-and-assigning-permissions\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pl-oracle";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pl-oracle";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pl-oracle";
    }else if(currentURL.match(/(\/admin-pm-oracle\/creating-the-production-mapping-workspace-in-an-enterprise-geodatabase\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pm-oracle";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pm-oracle";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pm-oracle";
    }else if(currentURL.match(/(\/admin-pm-sql-server\/creating-the-production-mapping-workspace-in-an-enterprise-geodatabase\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pm-sql-server";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pm-sql-server";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pm-sql-server";
    }else if(currentURL.match(/(\/workflow-creating-and-setting-the-product-library-as-a-personal-or-file-geodatabase\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pl-file-personal";
      docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pl-file-personal";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pl-file-personal";
    }else if(currentURL.match(/(\/introduction-to-configuring-the-product-library-in-sql-server-express\.|\/adding-a-database-server-for-the-product-library\.|\/creating-the-product-library-geodatabase-and-setting-up-users-in-sql-server-express\.|\/defining-the-geodatabase-as-a-product-library-in-sql-server-express\.|\/registering-product-library-components-as-versioned\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pl-sql-express";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pl-sql-express";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pl-sql-express";
    }else if(currentURL.match(/(\/introduction-to-configuring-the-product-library-in-sql-server\.|\/creating-and-configuring-the-geodatabase-in-sql-server\.|\/geodatabase-configuration-keywords-and-disk-configuration-in-sql-server\.|\/transparent-data-encryption-tde-\.|\/using-data-compression-for-the-product-library-workspace-in-sql-server\.|\/creating-data-files\.|\/modifying-configuration-keywords-in-sql-server\.|\/creating-the-administrator-geodatabase-user-and-connection\.|\/creating-geodatabase-user-roles\.|\/creating-the-product-library-workspace-in-an-enterprise-geodatabase\.|\/verifying-the-filegroup-storage\.|\/registering-product-library-components-as-versioned\.|\/granting-privileges-to-product-library-components-using-a-script\.|\/granting-privileges-to-product-library-components-through-arccatalog\.|\/log-file-tables-configuration\.|\/creating-the-geodatabase-product-library-users-and-connections\.|\/creating-product-library-users-and-assigning-permissions\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pl-sql-server";
      docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pl-sql-server";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pl-sql-server";
    }else if(currentURL.match(/(\/introduction-to-configuring-the-product-library-in-oracle\.|\/creating-and-configuring-the-geodatabase-in-oracle\.|\/geodatabase-configuration-keywords-and-disk-configuration-in-oracle\.|\/transparent-data-encryption-tde-in-oracle\.|\/using-data-compression-for-the-workspace-in-oracle\.|\/creating-data-files-in-oracle\.|\/modifying-geodatabase-configuration-keywords-in-oracle\.|\/creating-the-administrator-geodatabase-users-and-connection-in-oracle\.|\/creating-geodatabase-user-roles-in-oracle\.|\/creating-the-product-library-workspace-in-an-enterprise-geodatabase\.|\/verifying-the-tablespace-storage\.|\/registering-product-library-components-as-versioned\.|\/granting-privileges-to-product-library-components-in-oracle-using-a-script\.|\/granting-privileges-to-product-library-components-through-arccatalog\.|\/log-file-tables-configuration-in-oracle\.|\/creating-the-geodatabase-product-library-users-and-connections-in-oracle\.|\/creating-product-library-users-and-assigning-permissions\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pl-oracle";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pl-oracle";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pl-oracle";
    }else if(currentURL.match(/(\/introduction-to-storing-a-production-mapping-geodatabase-in-oracle\.|\/creating-and-configuring-the-pm-workspace-in-a-geodatabase-in-oracle\.|\/configuration-keywords-and-disk-configuration-for-the-production-mapping-workspace-in-oracle\.|\/transparent-data-encryption-for-the-production-mapping-workspace-in-oracle\.|\/using-data-compression-for-the-production-mapping-workspace-in-oracle\.|\/creating-data-files-for-the-production-mapping-workspace-in-oracle\.|\/adding-a-configuration-keyword-in-oracle-for-the-production-mapping-workspace\.|\/creating-the-administrator-users-and-connection-in-oracle-for-the-production-mapping-workspace\.|\/creating-the-production-mapping-workspace-in-an-enterprise-geodatabase\.|\/verifying-the-tablespace-storage-for-the-production-mapping-workspace-in-oracle\.|\/granting-privileges-to-the-production-mapping-workspace-components-in-oracle\.|\/log-file-tables-configuration-for-the-production-mapping-workspace-in-oracle\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pm-oracle";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pm-oracle";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pm-oracle";
    }else if(currentURL.match(/(\/creating-the-administrator-users-and-connection-in-sql-server-for-the-production-mapping-workspace\.|\/introduction-to-storing-the-production-mapping-workspace-in-sql-server\.|\/creating-and-configuring-the-pm-workspace-in-sql-server\.|\/configuration-keywords-and-disk-configuration\.|\/transparent-data-encryption-for-the-production-mapping-workspace-in-sql-server\.|\/creating-data-files-for-the-production-mapping-workspace-in-sql-server\.|\/adding-a-geodatabase-configuration-keyword-in-sql-server-for-the-production-mapping-workspace\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pm-sql-server";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pm-sql-server";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pm-sql-server";
    }else if(currentURL.match(/(\/creating-the-production-mapping-workspace-in-an-enterprise-geodatabase\.|\/verifying-the-filegroup-storage-for-the-pm-workspace-in-sql-server\.|\/using-data-compression-for-the-production-mapping-workspace-in-sql-server\.|\/granting-privileges-to-the-production-mapping-workspace-components-in-sql-server\.|\/log-file-tables-configuration-for-the-production-mapping-workspace-in-sql-server\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping-guide/admin-pm-sql-server";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping-guide/admin-pm-sql-server";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping-guide/admin-pm-sql-server";
    }
  }
}
if(mbDir = currentURL.match(/\/arcmap\/.*\/extensions\/maritime-bathymetry-guide\/(sql-express|oracle|sql-server)\//)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-bathymetry-guide/"+mbDir[1];
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-bathymetry-guide/"+mbDir[1];
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-bathymetry-guide/"+mbDir[1];
}
if(currentURL.match(/(\/arcmap\/10.4\/extensions\/maritime-bathymetry\/|\/arcmap\/10.5\/extensions\/maritime-bathymetry\/|\/arcmap\/10.6\/extensions\/maritime-bathymetry\/|\/arcmap\/latest\/extensions\/maritime-bathymetry\/|\/arcmap\/10.3\/guide-books\/extensions\/maritime-bathymetry\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-bathymetry";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-bathymetry";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-bathymetry";

  if(currentURL.match(/\/latest\/|\/10.6\/|\/10\.5\//) && !currentURL.match(/(\/oracle\/|\/sql-express\/|\/sql-server\/)/)){
    docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-bathymetry";
	docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-bathymetry";
	docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-bathymetry";
  }else{
    //maritime-bathymetry-guide/oracle pages
    if(currentURL.match(/(\/adding-a-configuration-keyword-to-the-geodatabase-in-oracle-for-the-bis-workspace\.|\/creating-a-bis-geodatabase\.|\/creating-and-configuring-the-bis-workspace-in-a-geodatabase-in-oracle\.|\/creating-data-files-for-the-bis-workspace-in-oracle\.|\/creating-the-administrator-users-and-connection-in-oracle-for-the-bis-workspace\.|\/geodatabase-configuration-keywords-and-disk-configuration-in-oracle\.|\/granting-privileges-to-the-bis-workspace-components-in-oracle\.|\/introduction-to-configuring-the-bis-in-oracle\.|\/log-file-tables-configuration-for-the-bis-workspace-in-oracle\.|\/preparing-oracle-to-store-xml-columns-for-the-bis-workspace\.|\/transparent-data-encryption-tde-in-oracle\.|\/using-data-compression-for-the-workspace-in-oracle\.|\/verifying-the-tablespace-storage-for-the-bis-workspace-in-oracle\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-bathymetry-guide/oracle";
      docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-bathymetry-guide/oracle";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-bathymetry-guide/oracle";
    //maritime-bathymetry-guide/sql-express pages
    }else if(currentURL.match(/(\/adding-a-database-server-and-creating-the-bis-geodatabase-in-sql-server-express\.|\/creating-and-setting-up-database-users-for-the-bis-in-sql-server-express\.|\/introduction-to-configuring-the-bis-workspace-in-sql-express\.|\/preparing-sql-server-express-to-store-xml-columns-for-the-bis-workspace\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-bathymetry-guide/sql-express";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-bathymetry-guide/sql-express";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-bathymetry-guide/sql-express";
    //maritime-bathymetry-guide/sql-server pages
    }else if(currentURL.match(/(\/adding-a-configuration-keyword-to-the-geodatabase-in-sql-server-for-the-bis-workspace\.|\/creating-a-bis-geodatabase\.|\/creating-and-configuring-a-bis-workspace-in-sql-server\.|\/creating-data-files-for-the-bis-workspace-in-sql-server\.|\/creating-the-administrator-users-and-connection-in-sql-server-for-the-bis-workspace\.|\/geodatabase-configuration-keywords-and-disk-configuration-for-the-bis-workspace-in-sql-server\.|\/granting-privileges-to-the-bis-workspace-components-in-sql-server\.|\/introduction-to-storing-the-bis-workspace-in-sql-server\.|\/log-file-tables-configuration-for-the-bis-workspace-in-sql-server\.|\/preparing-sql-server-to-store-xml-columns-for-the-bis-workspace\.|\/transparent-data-encryption-tde-for-the-bis-workspace-in-sql-server\.|\/using-data-compression-for-the-bis-workspace-in-sql-server\.|\/verifying-the-filegroup-storage-for-the-bis-workspace-in-sql-server\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-bathymetry-guide/sql-server";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-bathymetry-guide/sql-server";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-bathymetry-guide/sql-server";
    }
  }
}
if(mcDir = currentURL.match(/\/arcmap\/.*\/extensions\/maritime-charting-guide\/(.*)\//)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/"+mcDir[1];
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/"+mcDir[1];
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/"+mcDir[1];
}
if(currentURL.match(/\/arcmap\/.*\/manage-data\/gdbs-in-sql-server\//)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/gdbs-in-sql-server";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/gdbs-in-sql-server";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/gdbs-in-sql-server";
}
if(currentURL.match(/\/arcmap\/.*\/manage-data\/using-sql-with-gdbs\//)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/using-sql-with-gdbs";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/using-sql-with-gdbs";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/using-sql-with-gdbs";
}

if(currentURL.match(/\/arcmap\/.*\/manage-data\/gdbs-in-postgresql\//)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/gdbs-in-postgresql";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/gdbs-in-postgresql";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/gdbs-in-postgresql";

}
if(currentURL.match(/\/arcmap\/.*\/manage-data\/gdbs-in-oracle\//)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/gdbs-in-oracle";	
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/gdbs-in-oracle";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/gdbs-in-oracle";
}

if(currentURL.match(/\/arcmap\/.*\/manage-data\/raster-and-images\//)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/raster-and-images";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/raster-and-images";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/raster-and-images";
}
if(currentURL.match(/(\/arcmap\/10.4\/extensions\/maritime-charting\/|\/arcmap\/10.5\/extensions\/maritime-charting\/|\/arcmap\/10.6\/extensions\/maritime-charting\/|\/arcmap\/10.7\/extensions\/maritime-charting\/|\/arcmap\/latest\/extensions\/maritime-charting\/|\/arcmap\/10.3\/guide-books\/extensions\/maritime-charting\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting";

  if(currentURL.match(/\/latest\/|\/10.7\/||\/10.6\/|\/10\.5\//) && !currentURL.match(/(\/admin-nis-oracle\/|\/admin-nis-sql-server\/|\/admin-pl-oracle\/|\/admin-pl-sql-server\/|\/admin-prep-pl\/|\/admin-setup\/|\/carto-advanced\/|\/carto-create\/|\/carto-finish\/|\/carto-maintain\/|\/edit-aml\/|\/edit-dnc\/|\/edit-dnc-enterprise\/|\/edit-enc\/|\/edit-s57\/)/)){
    docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting";
	docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting";
	docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting";
  }else{
    //maritime-bathymetry-guide/admin-nis-oracle pages
    if(currentURL.match(/(\/creating-and-configuring-the-nis-workspace-in-a-geodatabase-in-oracle\.|\/creating-data-files-for-the-nis-workspace-in-oracle\.|\/creating-the-administrator-users-and-connection-for-the-nis-workspace-in-oracle\.|\/creating-the-geodatabase-nis-users-and-connections-in-oracle\.|\/creating-the-nis-workspace-in-an-enterprise-geodatabase\.|\/defining-the-nis-database-as-the-production-workspace\.|\/geodatabase-configuration-keywords-and-disk-configuration-in-oracle\.|\/granting-privileges-to-nis-components-in-oracle-using-a-script\.|\/granting-privileges-to-nis-components-through-arccatalog\.|\/introduction-to-configuring-the-nis-in-oracle\.|\/log-file-tables-configuration-for-the-nis-workspace-in-oracle\.|\/modifying-configuration-keywords-for-the-nis-workspace-in-oracle\.|\/preparing-oracle-to-store-xml-columns-for-the-nis-workspace\.|\/registering-nis-components-as-versioned-and-enable-archiving\.|\/transparent-data-encryption-tde-in-oracle-for-the-nis-workspace\.|\/using-data-compression-for-the-workspace-in-oracle\.|\/verifying-the-tablespace-storage-for-the-nis-workspace\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/admin-nis-oracle";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/admin-nis-oracle";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/admin-nis-oracle";
    //maritime-bathymetry-guide/admin-nis-sql-server pages
    }else if(currentURL.match(/(\/creating-and-configuring-the-nis-workspace-in-an-enterprise-geodatabase-in-sql-server\.|\/creating-data-files-for-the-nis-workspace-in-sql-server\.|\/creating-the-administrator-users-and-connection-for-the-nis-workspace-in-sql-server\.|\/creating-the-geodatabase-nis-users-and-connections\.|\/creating-the-nis-workspace-in-an-enterprise-geodatabase\.|\/defining-the-nis-database-as-the-production-workspace\.|\/granting-privileges-to-nis-components-through-arccatalog\.|\/granting-privileges-to-nis-components-using-a-script\.|\/introduction-to-configuring-the-nis-in-sql-server\.|\/log-file-tables-configuration\.|\/modifying-configuration-keywords-for-the-nis-workspace\.|\/nis-geodatabase-configuration-keywords-and-disk-configuration-in-sql-server\.|\/preparing-sql-server-to-store-xml-columns-for-the-nis-workspace\.|\/registering-nis-components-as-versioned-and-enable-archiving\.|\/transparent-data-encryption-tde-for-the-nis-workspace-in-sql-server\.|\/using-data-compression-for-the-nis-workspace-in-sql-server\.|\/verifying-the-filegroup-storage-for-the-nis-workspace\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/admin-nis-sql-server";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/admin-nis-sql-server";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/admin-nis-sql-server";
    //maritime-bathymetry-guide/admin-pl-oracle pages
    }else if(currentURL.match(/(\/creating-and-configuring-the-geodatabase-in-oracle\.|\/creating-data-files-for-the-nautical-product-library-workspace-in-oracle\.|\/creating-geodatabase-user-roles-in-oracle\.|\/creating-product-library-users-and-assigning-permissions\.|\/creating-the-administrator-geodatabase-users-and-connection-in-oracle\.|\/creating-the-geodatabase-product-library-users-and-connections-in-oracle\.|\/geodatabase-configuration-keywords-and-disk-configuration-in-oracle\.|\/granting-privileges-to-nautical-components-through-arccatalog\.|\/granting-privileges-to-product-library-components-in-oracle-using-a-script\.|\/importing-the-nautical-product-library-schema-in-the-enterprise-geodatabase\.|\/introduction-to-configuring-the-nautical-product-library-in-oracle\.|\/log-file-tables-configuration-in-oracle\.|\/modifying-geodatabase-configuration-keywords-in-oracle\.|\/preparing-oracle-to-store-xml-columns-for-the-workspace\.|\/registering-product-library-components-as-versioned\.|\/transparent-data-encryption-tde-in-oracle\.|\/using-data-compression-for-the-workspace-in-oracle\.|\/verifying-the-tablespace-storage\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/admin-pl-oracle";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/admin-pl-oracle";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/admin-pl-oracle";
    //maritime-bathymetry-guide/admin-pl-sql-server pages
    }else if(currentURL.match(/(\/creating-and-configuring-the-geodatabase-in-sql-server\.|\/creating-data-files\.|\/creating-geodatabase-user-roles\.|\/creating-product-library-users-and-assigning-permissions\.|\/creating-the-administrator-geodatabase-user-and-connection\.|\/creating-the-geodatabase-product-library-users-and-connections\.|\/geodatabase-configuration-keywords-and-disk-configuration-in-sql-server\.|\/granting-privileges-to-nautical-components-through-arccatalog\.|\/granting-privileges-to-product-library-components-using-a-script\.|\/importing-the-nautical-product-library-schema-in-the-enterprise-geodatabase\.|\/introduction-to-configuring-the-nautical-product-library-in-sql-server\.|\/log-file-tables-configuration\.|\/modifying-configuration-keywords-in-sql-server\.|\/preparing-sql-server-to-store-arcsde-xml-columns\.|\/registering-product-library-components-as-versioned\.|\/transparent-data-encryption-tde-\.|\/using-data-compression-for-the-product-library-workspace-in-sql-server\.|\/verifying-the-filegroup-storage\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/admin-pl-sql-server";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/admin-pl-sql-server";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/admin-pl-sql-server";
    //maritime-bathymetry-guide/admin-prep-pl pages
    }else if(currentURL.match(/(\/adding-a-new-series-to-a-product-class\.|\/creating-aoi-polygons-with-feature-builder\.|\/defining-the-nis-workspace\.|\/deleting-an-extraction-query-for-a-product-class\.|\/excluding-tables-and-feature-classes\.|\/loading-aois-to-the-product-library-from-enc-m-covr-features\.|\/setting-extraction-queries-for-product-classes\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/admin-prep-pl";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/admin-prep-pl";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/admin-prep-pl";
    //maritime-bathymetry-guide/admin-setup pages
    }else if(currentURL.match(/(\/configuration-and-arcgis-for-maritime-charting\.|\/configuring-the-scale-bands-xml-file\.|\/enabling-bsb\.|\/geodatabases-and-arcgis-maritime-charting-products\.|\/optimizing-the-nis-database\.|\/optimizing-the-product-library\.|\/workflow-working-with-product-configuration-files\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/admin-setup";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/admin-setup";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/admin-setup";
    //maritime-bathymetry-guide/carto-advanced pages
    }else if(currentURL.match(/(\/adding-a-panel-to-an-existing-chart-product\.|\/adding-channel-tabs-and-tide-tables\.|\/assigning-element-metadata\.|\/bsb\.|\/converting-raster-logos-to-graphics\.|\/creating-a-graphic-notice-to-mariners-chartlet-\.|\/creating-and-populating-a-database-for-an-instance\.|\/creating-bsb-links\.|\/creating-cartographic-limits\.|\/creating-grids-based-on-an-area-of-interest\.|\/creating-grids-for-panels-that-cross-the-180-meridian\.|\/creating-light-sectors\.|\/finding-bsb-notes-or-links\.|\/generating-annotation-masks\.|\/modifying-grids-for-non-north-up-panels\.|\/modifying-the-grid-xml-by-changing-directional-characters\.|\/modifying-the-grid-xml-by-changing-the-coordinate-system\.|\/modifying-zoc-diagram-layer-files\.|\/rotating-symbols-for-non-north-up-charts\.|\/using-free-representations-for-an-overprinting-embankment-on-features-with-acute-curves\.|\/using-free-representations-for-an-overprinting-reef-on-features-with-acute-curves\.|\/viewing-bsb-links\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/carto-advanced";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/carto-advanced";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/carto-advanced";
    //maritime-bathymetry-guide/carto-create pages
    }else if(currentURL.match(/(\/creating-a-chart-product\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/carto-create";
      docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/carto-create";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/carto-create";
    //maritime-bathymetry-guide/carto-finish pages
    }else if(currentURL.match(/(\/adding-database-elements\.|\/automating-chart-finishing\.|\/calculating-magnetic-variation-and-annual-change-for-compass-roses\.|\/changing-the-size-and-position-of-the-compass-rose\.|\/checking-out-a-chart-product-from-the-product-library\.|\/creating-data-points-for-compass-roses\.|\/creating-int2-scale-bars\.|\/creating-zones-of-confidence-diagrams\.|\/displacing-depth-annotation\.|\/editing-chart-annotation\.|\/editing-light-sector-arcs-and-segments\.|\/exporting-a-chart\.|\/hiding-symbols-in-a-chart\.|\/moving-symbols-in-a-chart\.|\/rotating-layered-symbols-in-a-chart\.|\/rotating-representation-symbols-in-a-chart\.|\/setting-the-page-size\.|\/suppressing-line-symbology\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/carto-finish";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/carto-finish";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/carto-finish";
    //maritime-bathymetry-guide/carto-maintain pages
    }else if(currentURL.match(/(\/applying-change-files\.|\/applying-second-edition-updates\.|\/checking-out-a-chart-product-from-the-product-library\.|\/getting-changes-from-the-nis\.|\/selecting-unverified-features\.|\/updating-cartographic-limits\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/carto-maintain";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/carto-maintain";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/carto-maintain";
    //maritime-bathymetry-guide/edit-aml pages
    }else if(currentURL.match(/(\/creating-new-aml-data\.|\/exporting-publishing-and-packaging-your-aml-produc\.|\/introduction-to-additional-military-layers-aml-production\.|\/loading-aml-source-data\.|\/setting-up-the-aml-production-environment\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/edit-aml";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/edit-aml";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/edit-aml";

    //maritime-bathymetry-guide/edit-dnc pages
    }else if(currentURL.match(/(\/about-creating-and-editing-annotation\.|\/adding-a-comment-to-a-correction-for-a-notice-to-mariner\.|\/adding-a-feature-as-a-notice-to-mariner-change\.|\/adding-notes\.|\/ancillary-data-sources\.|\/attributing-dqyarea-features\.|\/changing-the-completion-status-of-a-correction\.|\/changing-the-fields-that-appear-in-the-notice-to-mariners-dialog-box\.|\/changing-the-geographic-coords-of-a-raster\.|\/changing-the-verification-status-of-a-correction\.|\/clearing-the-red-marker-from-the-map-display\.|\/collecting-hydarea-features\.|\/configuring-the-dnc-database-for-validation\.|\/converting-units\.|\/creating-a-sounding-points-plot-workflow\.|\/creating-dqyarea-features-and-cutouts\.|\/data-migration\.|\/data-validation-and-dnc\.|\/deleting-notes\.|\/edgematch\.|\/editing-notes\.|\/exporting-the-notice-to-mariners-file\.|\/exporting-to-vpf-from-a-geodatabase\.|\/feature-collection\.|\/fundamentals-for-georeferencing-a-raster-dataset\.|\/georeferencing-a-raster-to-a-vector\.|\/georeferencing-and-dnc-image-sources\.|\/georeferencing-toolbar-tools\.|\/grouping-dnc-layers-according-to-theme\.|\/importing-vector-product-format-vpf-data\.|\/introduction-to-digital-nautical-chart-dnc-production\.|\/labeling-features-in-the-botcharp-layer\.|\/labeling-features-in-the-soundp-layer\.|\/locating-a-feature-in-a-notice-to-mariner-change\.|\/notes\.|\/notice-to-mariners\.|\/parsing-notice-to-mariners-files\.|\/quality-control\.|\/relocating-a-feature-for-a-notice-to-mariner-change\.|\/removing-duplicate-notes\.|\/selecting-a-feature-in-the-target-layer\.|\/setting-up-the-arcmap-dnc-production-environment\.|\/topology-and-dnc\.|\/unit-conversion\.|\/validating-dnc-topology\.|\/vector-sources\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/edit-dnc";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/edit-dnc";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/edit-dnc";
    //maritime-bathymetry-guide/edit-dnc-enterprise pages
    }else if(currentURL.match(/(\/about-creating-and-editing-annotation\.|\/adding-a-comment-to-a-correction-for-a-notice-to-mariner\.|\/adding-a-feature-as-a-notice-to-mariner-change\.|\/adding-notes\.|\/ancillary-data-sources\.|\/attributing-dqyarea-features\.|\/changing-the-completion-status-of-a-correction\.|\/changing-the-fields-that-appear-in-the-notice-to-mariners-dialog-box\.|\/changing-the-geographic-coords-of-a-raster\.|\/changing-the-verification-status-of-a-correction\.|\/checking-out-a-replica-from-the-dnc-nis\.|\/clearing-the-red-marker-from-the-map-display\.|\/collecting-hydarea-features\.|\/configuration-of-the-dnc-nis-workspace-in-a-geodatabase-in-postgresql\.|\/configuring-the-dnc-database-for-validation\.|\/converting-units\.|\/create-the-administrator-users-and-connection-for-the-dnc-nis-workspace\.|\/creating-a-sounding-points-plot-workflow\.|\/creating-dqyarea-features-and-cutouts\.|\/creating-the-dnc-nis-workspace-in-an-enterprise-geodatabase\.|\/creation-of-the-geodatabase-dnc-nis-users-and-connections\.|\/data-migration-with-a-dnc-nis\.|\/data-validation-and-dnc\.|\/deleting-notes\.|\/dnc-conflation\.|\/dnc-edgematch\.|\/dnc-nis-vector-sources\.|\/editing-notes\.|\/edits-with-dnc-nis-data\.|\/exporting-the-notice-to-mariners-file\.|\/exporting-to-vpf-from-a-geodatabase\.|\/feature-collection\.|\/fundamentals-for-georeferencing-a-raster-dataset\.|\/georeferencing-a-raster-to-a-vector\.|\/georeferencing-and-dnc-image-sources\.|\/georeferencing-toolbar-tools\.|\/granting-privileges-to-dnc-nis-components\.|\/grouping-dnc-layers-according-to-theme\.|\/importing-vector-product-format-vpf-data-to-dnc-nis\.|\/introduction-to-digital-nautical-chart-dnc-enterprise-production\.|\/labeling-features-in-the-botcharp-layer\.|\/labeling-features-in-the-soundp-layer\.|\/locating-a-feature-in-a-notice-to-mariner-change\.|\/notes\.|\/notice-to-mariners\.|\/parsing-notice-to-mariners-files\.|\/posting-changes\.|\/quality-control\.|\/reconciling-a-version\.|\/registering-dnc-nis-components-as-versioned-and-enabling-archiving\.|\/relocating-a-feature-for-a-notice-to-mariner-change\.|\/removing-duplicate-notes\.|\/selecting-a-feature-in-the-target-layer\.|\/synchronizing-edits-to-the-dnc-nis\.|\/topology-and-dnc\.|\/unit-conversion\.|\/validating-dnc-topology\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/edit-dnc-enterprise";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/edit-dnc-enterprise";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/edit-dnc-enterprise";
    //maritime-bathymetry-guide/edit-enc pages
    }else if(currentURL.match(/(\/creating-new-enc-data\.|\/exporting-publishing-and-packaging-your-enc-produc\.|\/introduction-to-electronic-navigational-charts-enc\.|\/loading-enc-source-data\.|\/verifying-your-enc-data\.)/)){
	  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/edit-enc";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/edit-enc";
      docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/edit-enc";
    //maritime-bathymetry-guide/edit-s57 pages
    }else if(currentURL.match(/(\/creating-an-s-57-product|\/editing-multi-scale-data|\/viewing-metadata-for-products|\/workflow-conflating-features-across-scale-bands\.)/)){
      docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/maritime-charting-guide/edit-s57";
	  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/maritime-charting-guide/edit-s57";
	  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/maritime-charting-guide/edit-s57";
    }
  }
}
if(currentURL.match(/(\/guide-books\/extensions\/maritime-charting\/advanced-sql-calculator|\/latest\/extensions\/production-mapping\/advanced-sql-calculator|\/10.7\/extensions\/production-mapping\/advanced-sql-calculator|\/10.6\/extensions\/production-mapping\/advanced-sql-calculator|\/10.4\/extensions\/production-mapping\/advanced-sql-calculator|\/10.5\/extensions\/production-mapping\/advanced-sql-calculator)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/production-mapping";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/production-mapping";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/production-mapping";
}
if(currentURL.match(/(\/arcmap\/.*\/tools\/data-reviewer-toolbox\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/data-reviewer-toolbox";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/data-reviewer-toolbox";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/data-reviewer-toolbox";
  //docConfig.switcher.caseTbl["dat-reviewer-toolbox-license"] = ['-','-','-','-'];
}


if(currentURL.match(/(\/arcmap\/.*\/tools\/workflow-manager-toolbox\/)/)){
  docConfig.switcher.caseTbl["create-jobs"] = ['create-new-jobs','create-new-jobs','create-new-jobs','create-new-jobs','create-new-jobs','-'];
  docConfig.switcher.caseTbl["create-new-jobs"] = ['-','-','-','-','-','create-jobs'];
}

if(currentURL.match(/(\/arcmap\/.*\/tools\/spatial-analyst-toolbox\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/spatial-analyst-toolbox";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/spatial-analyst-toolbox";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/spatial-analyst-toolbox";
  docConfig.switcher.caseTbl["how-zonal-statistics-works"] = ['-','-','-','-','h-how-zonal-statistics-works','h-how-zonal-statistics-works'];
  docConfig.switcher.caseTbl["h-how-zonal-statistics-works"] = ['how-zonal-statistics-works','how-zonal-statistics-works','how-zonal-statistics-works','how-zonal-statistics-works','-','-'];
}

if(currentURL.match(/(\/arcmap\/.*\/tools\/mobile-toolbox\/)/)){
  docConfig.switcher.caseTbl["synchronize-mobile-cache-tool"] = ['x','x','x','x','-','-'];
  docConfig.switcher.caseTbl["mobile-toolbox-license"] = ['x','x','x','x','-','-'];
  docConfig.switcher.caseTbl["create-mobile-cache-tool"] = ['x','x','x','x','-','-'];
  docConfig.switcher.caseTbl["an-overview-of-the-mobile-toolbox"] = ['x','x','x','x','-','-'];
}
if(currentURL.match(/(\/arcmap\/10\.4\/tools\/roads-and-highways-toolbox\/|\/arcmap\/10\.5\/tools\/location-referencing-roads-toolbox\/|\/arcmap\/latest\/tools\/location-referencing-roads-toolbox\/|\/arcmap\/10\.3\/tools\/roads-and-highways-toolbox\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/location-referencing-roads-toolbox";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/location-referencing-roads-toolbox";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/location-referencing-roads-toolbox";
  docConfig.switcher.caseTbl["an-overview-of-the-roads-and-highways-toolbox"] = ['an-overview-of-the-location-referencing-toolbox','an-overview-of-the-location-referencing-toolbox','an-overview-of-the-location-referencing-toolbox','an-overview-of-the-location-referencing-toolbox','an-overview-of-the-location-referencing-toolbox','-'];
  docConfig.switcher.caseTbl["an-overview-of-the-location-referencing-toolbox"] = ['-','-','-','-','-','an-overview-of-the-roads-and-highways-toolbox'];
  docConfig.switcher.caseTbl["location-referencing-toolbox-licensing"] = ['-','-','-','-','-','roads-and-highways-toolbox-license'];
  //docConfig.switcher.caseTbl["generate-events"] = ['-','-','x','x'];
}
if(currentURL.match(/(\/arcmap\/.*\/tools\/location-referencing-pipeline-toolbox\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/location-referencing-pipeline-toolbox";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/location-referencing-pipeline-toolbox";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/location-referencing-pipeline-toolbox";
}
if(currentURL.match(/(\/arcmap\/.*\/tools\/bathymetry-toolbox\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/bathymetry-toolbox";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/bathymetry-toolbox";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/bathymetry-toolbox";
}
if(currentURL.match(/(\/arcmap\/.*\/tools\/defense-mapping-toolbox)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/defense-mapping-toolbox";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/defense-mapping-toolbox";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/defense-mapping-toolbox";
}
if(currentURL.match(/(\/arcmap\/.*\/tools\/nautical-toolbox\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/nautical-toolbox";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/nautical-toolbox";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/nautical-toolbox";
}

if(currentURL.match(/(\/arcmap\/.*\/tools\/production-mapping-toolbox\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/production-mapping-toolbox";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/production-mapping-toolbox";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/production-mapping-toolbox";

  docConfig.switcher.caseTbl["an-overview-of-the-pl-toolset"] = ['an-overview-of-the-product-library-toolset','an-overview-of-the-product-library-toolset','an-overview-of-the-product-library-toolset','an-overview-of-the-product-library-toolset','an-overview-of-the-product-library-toolset','-'];
  docConfig.switcher.caseTbl["an-overview-of-the-product-library-toolset"] = ['-','-','-','-','-','an-overview-of-the-pl-toolset'];
}

//redirects for arcmap/10.3/get-started
if(currentURL.match(/(\/system-requirements\/10.4\/|\/system-requirements\/10.5\/|\/system-requirements\/10.6\/|\/system-requirements\/10.7\/|\/system-requirements\/latest\/|\/10.3\/get-started\/system-requirements\/)/)){
  customVersionLabel = 'ArcGIS';
  docConfig.switcher.basepaths["10.8"] = "system-requirements/latest";
  docConfig.switcher.basepaths["10.7"] = "system-requirements/10.7";
  docConfig.switcher.basepaths["10.6"] = "system-requirements/10.6";

  docConfig.switcher.caseTbl["arcgis-location-referencing-system-requirements"] = ['-','-','-','-','esri-roads-and-highways-for-desktop-system-requirements','esri-roads-and-highways-for-desktop-system-requirements'];
  docConfig.switcher.caseTbl["esri-roads-and-highways-for-desktop-system-requirements"] = ['arcgis-location-referencing-system-requirements','arcgis-location-referencing-system-requirements','arcgis-location-referencing-system-requirements','arcgis-location-referencing-system-requirements','-','-'];

}
if(currentURL.match(/(\/quick-start-guides\/10.4\/|\/quick-start-guides\/10.5\/|\/quick-start-guides\/10.6\/|\/quick-start-guides\/10.7\/|\/quick-start-guides\/latest\/|\/10.3\/get-started\/quick-start-guides\/)/)){
  customVersionLabel = 'ArcGIS';
  docConfig.switcher.basepaths["10.8"] = "quick-start-guides/latest";
  docConfig.switcher.basepaths["10.7"] = "quick-start-guides/10.7";
  docConfig.switcher.basepaths["10.6"] = "quick-start-guides/10.6";
  docConfig.switcher.caseTbl["arcreader-quick-start-guide-no-more-from-10-5-on"] = ['x','x','x','x','-','arcreader-quick-start-guide'];
  docConfig.switcher.caseTbl["arcreader-quick-start-guide"] = ['x','x','x','x','arcreader-quick-start-guide-no-more-from-10-5-on','-'];
  docConfig.switcher.caseTbl["arcgis-enterprise-quick-start-guide"] = ['-','-','-','-','arcgis-server-quick-start-guide','arcgis-for-server-quick-start-guide'];
  docConfig.switcher.caseTbl["arcgis-server-quick-start-guide"] = ['arcgis-enterprise-quick-start-guide','arcgis-enterprise-quick-start-guide','arcgis-enterprise-quick-start-guide','arcgis-enterprise-quick-start-guide','-','arcgis-for-server-quick-start-guide'];
  docConfig.switcher.caseTbl["arcgis-for-server-quick-start-guide"] = ['arcgis-enterprise-quick-start-guide','arcgis-enterprise-quick-start-guide','arcgis-enterprise-quick-start-guide','arcgis-enterprise-quick-start-guide','arcgis-server-quick-start-guide','-'];
  docConfig.switcher.caseTbl["arcgis-location-referencing-quick-start-guide"] = ['-','-','-','-','esri-roads-and-highways-quick-start-guide','esri-roads-and-highways-quick-start-guide'];
  docConfig.switcher.caseTbl["esri-roads-and-highways-quick-start-guide"] = ['arcgis-location-referencing-quick-start-guide','arcgis-location-referencing-quick-start-guide','arcgis-location-referencing-quick-start-guide','arcgis-location-referencing-quick-start-guide','-','-'];
}
if(currentURL.match(/(\/license-manager\/latest\/|\/license-manager\/[\d.]+\/|\/10\.3\/get-started\/license-manager-guide\/|\/quick-start-guides\/latest\/arcgis-license-manager-quick-start-guide|\/system-requirements\/latest\/arcgis-license-manager-system-requirements|\/quick-start-guides\/[\d.]+\/arcgis-license-manager-quick-start-guide|\/system-requirements\/[\d.]+\/arcgis-license-manager-system-requirements|\/arcmap\/10\.3\/get-started\/quick-start-guides\/arcgis-license-manager-quick-start-guide|\/arcmap\/10\.3\/get-started\/system-requirements\/arcgis-license-manager-system-requirements)/)){
  pathname = window.location.pathname
  if(currentURL.match(/(\/license-manager\/)/)){
    var customVersionLabel = 'License Manager';
        var customVersion = (currentURL.match(/(\/latest\/)/))?"2022.0":(currentURL.match(/(\/2021.1\/)/))?"2021.1":(currentURL.match(/(\/2021.0\/)/))?"2021.0":(currentURL.match(/(\/2020.1\/)/))?"2020.1":(currentURL.match(/(\/2020.0\/)/))?"2020.0":(currentURL.match(/(\/2019.2\/)/))?"2019.2":(currentURL.match(/(\/2019.1\/)/))?"2019.1":(currentURL.match(/(\/2019.0\/)/))?"2019.0":(currentURL.match(/(\/2018.1\/)/))?"2018.1":(currentURL.match(/(\/2018\.0\/)/))?"2018.0":(pathname.match(/(\/10\.6\/)/) ? "10.6" : (pathname.match(/(\/10\.5\/)/)) ? "10.5" : (pathname.match(/(\/10\.4\/)/)) ? "10.4" : "10.3");

  }else{
    var customVersion = (currentURL.match(/(\/latest\/)/))?"10.8":(pathname.match(/(\/10\.7\/)/) ? "10.7" :(pathname.match(/(\/10\.6\/)/)) ? "10.6" : (pathname.match(/(\/10\.5\/)/)) ? "10.5" : (pathname.match(/(\/10\.4\/)/)) ? "10.4" : "10.3"),
      customVersionLabel = 'ArcGIS';
  }
 docConfig.switcher.switchercases = {
	  "2022.0": "2022.0",
	  "2021.1": "2021.1",
	  "2021.0": "2021.0",
	  "2020.1": "2020.1",
	  "2020.0": "2020.0",
	  "2019.2": "2019.2",
	  "2019.1": "2019.1",
	  "2019.0": "2019.0",
      "2018.1": "2018.1",
      "2018.0": "2018.0",
      "10.6": "10.6"
    };
  docConfig.switcher.caseTbl["__order"] = {
    "2022.0": 1,
	"2021.1": 2,
	"2021.0": 3,
	"2020.1": 4,
	"2020.0": 5,
	"2019.2": 6,
	 "2019.1": 7,
    "2019.0": 8,
	"2018.1": 9,
    "2018.0": 10,
    "10.6": 11
  };
  docConfig.switcher.caseTbl["using-the-license-manager-with-wts-citrix"] = ['-','-','-','-','-','-','-','using-the-license-manager-with-wts-critix','using-the-license-manager-with-wts-critix','using-the-license-manager-with-wts-critix','using-the-license-manager-with-wts-critix','using-the-license-manager-with-wts-critix','using-the-license-manager-with-wts-critix','using-the-license-manager-with-wts-critix'];
  docConfig.switcher.caseTbl["using-the-license-manager-with-wts-critix"] = ['using-the-license-manager-with-wts-citrix','using-the-license-manager-with-wts-citrix','using-the-license-manager-with-wts-citrix','using-the-license-manager-with-wts-citrix','using-the-license-manager-with-wts-citrix','using-the-license-manager-with-wts-citrix','using-the-license-manager-with-wts-citrix','-','-','-','-','-','-','-'];
  if(currentURL.match(/(\/system-requirements\/|\/arcgis-license-manager-system-requirements)/)){
	docConfig.switcher.basepaths["2022.0"] = "license-manager/latest";
	docConfig.switcher.basepaths["2021.1"] = "license-manager/2021.1";
	docConfig.switcher.basepaths["2021.0"] = "license-manager/2021.0";
	docConfig.switcher.basepaths["2020.1"] = "license-manager/2020.1";
	docConfig.switcher.basepaths["2020.0"] = "license-manager/2020.0";
	docConfig.switcher.basepaths["2019.2"] = "license-manager/2019.2";
	docConfig.switcher.basepaths["2019.1"] = "license-manager/2019.1";  
	docConfig.switcher.basepaths["2019.0"] = "license-manager/2019.0";  
	docConfig.switcher.basepaths["2018.1"] = "license-manager/2018.1";
    docConfig.switcher.basepaths["2018.0"] = "license-manager/2018.0";
    docConfig.switcher.basepaths["10.6"] = "system-requirements/10.6";
  }else if(currentURL.match(/(\/quick-start-guides\/|\/arcgis-license-manager-quick-start-guide)/)){
    docConfig.switcher.basepaths["2022.0"] = "license-manager/latest";
	docConfig.switcher.basepaths["2021.1"] = "license-manager/2021.1";
	docConfig.switcher.basepaths["2021.0"] = "license-manager/2021.0";
	docConfig.switcher.basepaths["2020.1"] = "license-manager/2020.1";
	docConfig.switcher.basepaths["2020.0"] = "license-manager/2020.0";
	docConfig.switcher.basepaths["2019.2"] = "license-manager/2019.2";
	 docConfig.switcher.basepaths["2019.1"] = "license-manager/2019.1";
	docConfig.switcher.basepaths["2019.0"] = "license-manager/2019.0";
	docConfig.switcher.basepaths["2018.1"] = "license-manager/2018.1";
    docConfig.switcher.basepaths["2018.0"] = "license-manager/2018.0";
    docConfig.switcher.basepaths["10.6"] = "quick-start-guides/10.6";
  }else{
	docConfig.switcher.basepaths["2022.0"] = "license-manager/latest";
	docConfig.switcher.basepaths["2021.1"] = "license-manager/2021.1";
	docConfig.switcher.basepaths["2021.0"] = "license-manager/2021.0";
	docConfig.switcher.basepaths["2020.1"] = "license-manager/2020.1";
	docConfig.switcher.basepaths["2020.0"] = "license-manager/2020.0";
	docConfig.switcher.basepaths["2019.2"] = "license-manager/2019.2";
	docConfig.switcher.basepaths["2019.1"] = "license-manager/2019.1";
	docConfig.switcher.basepaths["2019.0"] = "license-manager/2019.0";
    docConfig.switcher.basepaths["2018.1"] = "license-manager/2018.1";
    docConfig.switcher.basepaths["2018.0"] = "license-manager/2018.0";
    docConfig.switcher.basepaths["10.6"] = "license-manager/10.6";
  }
}
if(currentURL.match(/(\/arcmap\/10.4\/get-started\/administer\/|\/arcmap\/10.5\/get-started\/administer\/|\/arcmap\/10.6\/get-started\/administer\/|\/arcmap\/10.7\/get-started\/administer\/|\/arcmap\/latest\/get-started\/administer\/|\/arcmap\/10.3\/get-started\/administering-desktop\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/get-started/administer";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/get-started/administer";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/get-started/administer";
}

if(currentURL.match(/(\/arcmap\/10.3\/get-started\/quick-start-guides\/arcgis-desktop-quick-start-guide|\/arcmap\/10.4\/get-started\/setup\/arcgis-desktop-quick-start-guide|\/arcmap\/10.5\/get-started\/setup\/arcgis-desktop-quick-start-guide|\/arcmap\/10.6\/get-started\/setup\/arcgis-desktop-quick-start-guide|\/arcmap\/10.7\/get-started\/setup\/arcgis-desktop-quick-start-guide|\/arcmap\/latest\/get-started\/setup\/arcgis-desktop-quick-start-guide)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/get-started/setup";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/get-started/setup";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/get-started/setup";
}
if(currentURL.match(/(\/arcmap\/10.4\/get-started\/setup\/arcgis-desktop-system-requirements|\/arcmap\/10.5\/get-started\/setup\/arcgis-desktop-system-requirements|\/arcmap\/10.6\/get-started\/setup\/arcgis-desktop-system-requirements|\/arcmap\/10.7\/get-started\/setup\/arcgis-desktop-system-requirements|\/arcmap\/latest\/get-started\/setup\/arcgis-desktop-system-requirements)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/get-started/setup";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/get-started/setup";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/get-started/setup";
}

//redirects for arcmap/10.3/main
if(currentURL.match(/(\/arcmap\/10.3\/main\/analyze\/|\/arcmap\/10.4\/analyze\/main\/|\/arcmap\/10.5\/analyze\/main\/|\/arcmap\/10.6\/analyze\/main\/|\/arcmap\/10.7\/analyze\/main\/|\/arcmap\/latest\/analyze\/main\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/analyze/main";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/analyze/main";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/analyze/main";
}


if(currentURL.match(/(\/arcmap\/10.4\/get-started\/main\/|\/arcmap\/10.5\/get-started\/main\/|\/arcmap\/10.6\/get-started\/main\/|\/arcmap\/10.7\/get-started\/main\/|\/arcmap\/latest\/get-started\/main\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/get-started/main";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/get-started/main";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/get-started/main";

  docConfig.switcher.caseTbl["about-arcgis-for-desktop-extensions"] = ['-','-','-','-','whats-new-in-arcgis'];
  docConfig.switcher.caseTbl["get-started-with-arcmap"] = ['-','-','-','-','whats-new-in-arcgis'];
}
if(currentURL.match(/(\/arcmap\/10.3\/main\/guide-books\/|\/arcmap\/10.4\/extensions\/main\/|\/arcmap\/10.5\/extensions\/main\/|\/arcmap\/10.6\/extensions\/main\/|\/arcmap\/10.7\/extensions\/main\/|\/arcmap\/latest\/extensions\/main\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/main";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/main";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/main";
}
if(currentURL.match(/(\/arcmap\/10.3\/main\/manage-data\/|\/arcmap\/10.4\/manage-data\/main\/|\/arcmap\/10.5\/manage-data\/main\/|\/arcmap\/10.6\/manage-data\/main\/|\/arcmap\/10.7\/manage-data\/main\/|\/arcmap\/latest\/manage-data\/main\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/main";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/main";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/main";
}
if(currentURL.match(/(\/arcmap\/10.3\/main\/map\/|\/arcmap\/10.4\/map\/main\/|\/arcmap\/10.5\/map\/main\/|\/arcmap\/10.6\/map\/main\/|\/arcmap\/10.7\/map\/main\/|\/arcmap\/latest\/map\/main\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/map/main";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/map/main";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/map/main";
}

if(currentURL.match(/(\/arcmap\/10.3\/main\/tools\/|\/arcmap\/10.4\/tools\/main\/|\/arcmap\/10.5\/tools\/main\/|\/arcmap\/10.6\/tools\/main\/|\/arcmap\/10.7\/tools\/main\/|\/arcmap\/latest\/tools\/main\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/tools/main";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/tools/main";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/tools/main";
}
if(currentURL.match(/(\/arcmap\/10.3\/main\/get-started\/|\/arcmap\/10.4\/get-started\/introduction\/|\/arcmap\/10.5\/get-started\/introduction\/|\/arcmap\/10.6\/get-started\/introduction\/|\/arcmap\/10.7\/get-started\/introduction\/|\/arcmap\/latest\/get-started\/introduction\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/get-started/introduction";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/get-started/introduction";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/get-started/introduction";
  docConfig.switcher.caseTbl["whats-new-in-arcgis-1031"] = ['whats-new-in-arcgis','whats-new-in-arcgis','whats-new-in-arcgis','whats-new-in-arcgis','whats-new-in-arcgis','-'];
  if(currentURL.match(/(about-arcgis-for-desktop-extensions)/)){
    docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/main";
	docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/main";
	docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/main";
  }
}

//redirects for arcmap/10.3/guide-books
if(currentURL.match(/(\/arcmap\/10.3\/guide-books\/customizing-the-ui\/|\/arcmap\/10.4\/get-started\/customizing-the-ui\/|\/arcmap\/10.5\/get-started\/customizing-the-ui\/|\/arcmap\/10.6\/get-started\/customizing-the-ui\/|\/arcmap\/10.7\/get-started\/customizing-the-ui\/|\/arcmap\/latest\/get-started\/customizing-the-ui\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/get-started/customizing-the-ui";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/get-started/customizing-the-ui";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/get-started/customizing-the-ui";
}
if(currentURL.match(/(\/arcmap\/10.4\/manage-data\/find-a-route\/|\/arcmap\/10.5\/manage-data\/find-a-route\/|\/arcmap\/10.6\/manage-data\/find-a-route\/|\/arcmap\/10.7\/manage-data\/find-a-route\/|\/arcmap\/latest\/manage-data\/find-a-route\/|\/arcmap\/10.3\/guide-books\/find-a-route\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/find-a-route";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/find-a-route";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/find-a-route";
}
if(currentURL.match(/(\/arcmap\/10.4\/manage-data\/geocoding\/|\/arcmap\/10.5\/manage-data\/geocoding\/|\/arcmap\/10.6\/manage-data\/geocoding\/|\/arcmap\/10.7\/manage-data\/geocoding\/|\/arcmap\/latest\/manage-data\/geocoding\/|\/arcmap\/10.3\/guide-books\/geocoding\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/geocoding";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/geocoding";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/geocoding";
}
if(currentURL.match(/(\/arcmap\/10.4\/manage-data\/linear-referencing\/|\/arcmap\/10.5\/manage-data\/linear-referencing\/|\/arcmap\/10.6\/manage-data\/linear-referencing\/|\/arcmap\/10.7\/manage-data\/linear-referencing\/|\/arcmap\/latest\/manage-data\/linear-referencing\/|\/arcmap\/10.3\/guide-books\/linear-referencing\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/manage-data/linear-referencing";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/manage-data/linear-referencing";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/manage-data/linear-referencing";
}
if(currentURL.match(/(\/arcmap\/10.4\/map\/projections\/|\/arcmap\/10.5\/map\/projections\/|\/arcmap\/10.6\/map\/projections\/|\/arcmap\/10.7\/map\/projections\/|\/arcmap\/latest\/map\/projections\/|\/arcmap\/10.3\/guide-books\/map-projections\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/map/projections";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/map/projections";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/map/projections";
}
if(currentURL.match(/(\/arcmap\/latest\/get-started\/terms-of-use\/|\/arcmap\/10.7\/get-started\/terms-of-use\/|\/arcmap\/10.6\/get-started\/terms-of-use\/|\/arcmap\/10.5\/get-started\/terms-of-use\/|\/arcmap\/10.4\/get-started\/terms-of-use\/|\/arcmap\/10.3\/guide-books\/terms-of-use\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/get-started/terms-of-use";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/get-started/terms-of-use";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/get-started/terms-of-use";
}
if(currentURL.match(/(\/arcmap\/10.3\/guide-books\/python-addins\/|\/arcmap\/10.4\/analyze\/python-addins\/|\/arcmap\/10.5\/analyze\/python-addins\/|\/arcmap\/10.6\/analyze\/python-addins\/|\/arcmap\/10.7\/analyze\/python-addins\/|\/arcmap\/latest\/analyze\/python-addins\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/analyze/python-addins";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/analyze/python-addins";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/analyze/python-addins";
}
if(currentURL.match(/(\/arcmap\/10.3\/guide-books\/extensions\/roads-and-highways\/|\/arcmap\/10.4\/extensions\/roads-and-highways\/|\/arcmap\/10.5\/extensions\/roads-and-highways\/|\/arcmap\/10.6\/extensions\/roads-and-highways\/|\/arcmap\/10.7\/extensions\/roads-and-highways\/|\/arcmap\/latest\/extensions\/roads-and-highways\/)/)){
  docConfig.switcher.basepaths["10.8"] = "arcmap/latest/extensions/roads-and-highways";
  docConfig.switcher.basepaths["10.7"] = "arcmap/10.7/extensions/roads-and-highways";
  docConfig.switcher.basepaths["10.6"] = "arcmap/10.6/extensions/roads-and-highways";
  //docConfig.switcher.caseTbl["access-privileges-in-the-lrs"] = ['-','-','-','x'];
  docConfig.switcher.caseTbl["adding-or-editing-block-ranges"] = ['x','x','x','x','what-s-new-in-esri-roads-and-highways-for-server','-'];
  docConfig.switcher.caseTbl["adding-site-addresses"] = ['x','x','x','x','what-s-new-in-esri-roads-and-highways-for-server','-'];
  docConfig.switcher.caseTbl["adding-street-names"] = ['x','x','x','x','what-s-new-in-esri-roads-and-highways-for-server','-'];
  docConfig.switcher.caseTbl["configuring-the-address-management-widgets"] = ['x','x','x','x','what-s-new-in-esri-roads-and-highways-for-server','-'];
  docConfig.switcher.caseTbl["roads-and-highways-address-management"] = ['x','x','x','x','what-s-new-in-esri-roads-and-highways-for-server','-'];
  docConfig.switcher.caseTbl["address-management"] = ['x','x','x','x','what-s-new-in-esri-roads-and-highways-for-server','-'];

  docConfig.switcher.caseTbl["preparing-data-for-address-management"] = ['x','x','x','x','what-s-new-in-esri-roads-and-highways-for-server','-'];
  docConfig.switcher.caseTbl["registering-a-stationing-event"] = ['stationing-events','stationing-events','stationing-events','stationing-events','stationing-events','-'];
  docConfig.switcher.caseTbl["registering-an-event-by-route-and-measure"] = ["registering-an-event-within-the-alrs-geodatabase","registering-an-event-within-the-alrs-geodatabase","registering-an-event-within-the-alrs-geodatabase","registering-an-event-within-the-alrs-geodatabase","registering-an-event-within-the-alrs-geodatabase",'-'];
  docConfig.switcher.caseTbl["registering-an-event-within-the-alrs-geodatabase"] = ['-','-','-','-','-','registering-an-event-by-route-and-measure'];

  docConfig.switcher.caseTbl["stationing-events"] = ['-','-','-','-','-','registering-a-stationing-event'];
}

if(currentURL.match(/(\/manage-data\/databases\/)/)){
  docConfig.switcher.caseTbl = {
      "__order": {
		"10.8": 1,
        "10.7": 2,
        "10.6": 3,
        "10.5": 4,
        "10.4": 5,
		"10.3": 6
      },
      //10.3 section

    }
}

if(currentURL.match(/(\/cityengine\/)/)){
  var customVersion = (currentURL.match(/(\/latest\/)/))?"2018.1":(currentURL.match(/(\/2018\.0\/)/))?"2018.0":(currentURL.match(/(\/2017\/)/))?"2017":(currentURL.match(/(\/2016\/)/))?"2016":"2015",
    customVersionLabel = "CityEngine";
  docConfig.switcher.basepaths["2018.1"] = "cityengine/latest";
  docConfig.switcher.basepaths["2018.0"] = "cityengine/2018.0";
  docConfig.switcher.basepaths["2017"] = "cityengine/2017";
  docConfig.switcher.basepaths["2016"] = "cityengine/2016";
  docConfig.switcher.basepaths["2015"] = "cityengine/2015";
  docConfig.switcher.switchercases = {
      "2018.1": "2018.1",
      "2018.0": "2018.0",
      "2017": "2017",
      "2016": "2016",
      "2015": "2015"
    };
  docConfig.switcher.caseTbl = {
      "__order": {
        "2018.1": 1,
        "2018.0": 2,
        "2017": 3,
        "2016": 4,
        "2015": 5
      },
      //2016 section
      "esri-cityengine-2015-2-system-requirements": ['esri-cityengine-system-requirements','esri-cityengine-system-requirements','esri-cityengine-system-requirements','esri-cityengine-system-requirements','-'],
      "esri-cityengine-system-requirements": ['-','-','-','-','esri-cityengine-2015-2-system-requirements'],
      "esri-cityengine-2014-quick-start-guide": ['esri-cityengine-quick-start-guide','esri-cityengine-quick-start-guide','esri-cityengine-quick-start-guide','esri-cityengine-quick-start-guide','-'],
      "esri-cityengine-2014-1": ['esri-cityengine-system-requirements','esri-cityengine-system-requirements','esri-cityengine-system-requirements','esri-cityengine-system-requirements','-'],
      "esri-cityengine-2014-license-manager-quick-start-guide": ['esri-cityengine-license-manager-quick-start-guide','esri-cityengine-license-manager-quick-start-guide','esri-cityengine-license-manager-quick-start-guide','esri-cityengine-license-manager-quick-start-guide','-'],
      "esri-cityengine-2013-2013-sr-quick-start-guide": ['esri-cityengine-quick-start-guide','esri-cityengine-quick-start-guide','esri-cityengine-quick-start-guide','esri-cityengine-quick-start-guide','-'],
      "esri-cityengine-2013-1-system-requirements": ['esri-cityengine-system-requirements','esri-cityengine-system-requirements','esri-cityengine-system-requirements','esri-cityengine-system-requirements','-'],
      "esri-cityengine-license-manager-quick-start-guide-do-not-use": ['esri-cityengine-license-manager-quick-start-guide','esri-cityengine-license-manager-quick-start-guide','esri-cityengine-license-manager-quick-start-guide','esri-cityengine-license-manager-quick-start-guide','-'],
      /*"tutorial-20-local-edits": ['-','-','x','x'],
      "cityengine-2017-0-release-notes": ['-','-','x','x'],
      "cityengine-language-packs": ['-','-','x','x'],
      "installing-a-localized-cityengine-setup": ['-','-','x','x'],
      "installing-cityengine-on-linux-silently": ['-','-','x','x'],*/
    }
    if(currentURL.match(/(\/cityengine\/[^\/]*\/cga\/)/)){
      docConfig.switcher.disable = ["2015"];
    }
}

/*if(currentURL.match(/(\/en\/)/)) {
    var english = true;
}else var english = false;
//Remove 10.8 switcher option for non-English server pages
if(!english){
    var delSwitchers = ["10.8"];
    for(i in delSwitchers){
        if(delSwitchers[i] in docConfig.switcher.switchercases){
            delete docConfig.switcher.switchercases[delSwitchers[i]];
        }
    }
    for(i in docConfig.switcher.basepaths){
        docConfig.switcher.basepaths[i] = docConfig.switcher.basepaths[i].replace("10.7","latest");
    }
}*/
$.whenAll = function(firstParam) {
  var args = arguments,
    sliceDeferred = [].slice,
    i = 0,
    length = args.length,
    count = length,
    rejected,
    deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise) ?
    firstParam :
    jQuery.Deferred();

  function resolveFunc(i, reject) {
    return function(value) {
      rejected |= reject;
      args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
      if (!(--count)) {
        // Strange bug in FF4:
        // Values changed onto the arguments object sometimes end up as undefined values
        // outside the $.when method. Cloning the object into a fresh array solves the issue
        var fn = rejected ? deferred.rejectWith : deferred.resolveWith;
        fn.call(deferred, deferred, sliceDeferred.call(args, 0));
      }
    };
  }

  if (length > 1) {
    for (; i < length; i++) {
      if (args[i] && jQuery.isFunction(args[i].promise)) {
        args[i].promise().then(resolveFunc(i), resolveFunc(i, true));
      } else {
        --count;
      }
    }
    if (!count) {
      deferred.resolveWith(deferred, args);
    }
  } else if (deferred !== firstParam) {
    deferred.resolveWith(deferred, length ? [firstParam] : []);
  }
  return deferred.promise();
};

jQuery(document).ready(function($){
  /*if(!docConfig || !docConfig.switcher){
    return false;
  }*/

  // Temporary condition. Once l10n content is ready for 10.4 we can remove this condition
  /*if(docConfig['localedir'] && docConfig['localedir'] != "en"){
    return;
  }*/
  //exclude version switcher for following pattern.
  if(currentURL.match(/(\/3d\/3d-cities\/|\/analytics\/|\/arcobjects\/|\/documentation\/understanding-gis-book\/|\/arcmap\/10\.3\/get-started\/system-requirements\/esri-cityengine-link|\/system-requirements\/.+\/esri-cityengine-link|\/system-requirements\/.*\/arcgis-pro-links|\/arcmap\/10\.3\/get-started\/system-requirements\/arcgis-pro-links|\/system-requirements\/.*\/arcgis-for-server-links|\/system-requirements\/.*\/arcgis-for-windows-mobile-system-requirements|\/cityengine\/latest\/get-started\/.*release-notes.*|\/cityengine\/latest\/get-started\/what.?s-new-.*-cityengine.*)/)){
    return;
  }

  if(!doc){
    var doc = {};
  }

  function dbg (o) {
    if (true)  console.info (o);
  }

    doc.switcher = (function () {

    var switcherCfg = window.docConfig.switcher,
    pathname = window.location.pathname,
    pathparts = pathname.split ("/"),
    fname = pathparts[pathparts.length-1],
    //plat = $.cookie (switcherCfg.appproduct) || switcherCfg.defaultplatformvalue,
    plat =  pathparts[pathparts.length-2],
    isHome = pathparts.length <= 4, //???
	version = (pathname.match(/(\/latest\/)/)) ? "10.8" : (pathname.match(/(\/10\.7\/)/)) ? "10.7" : (pathname.match(/(\/10\.6\/)/)) ? "10.6" : (pathname.match(/(\/10\.5\/)/)) ? "10.5" : (pathname.match(/(\/10\.4\/)/)) ? "10.4" : "10.3",
	
    //version = (!english && pathname.match(/(\/latest\/)/)) ? "10.7" : (english && pathname.match(/(\/latest\/)/)) ? "10.8" : (pathname.match(/(\/10\.7\/)/)) ? "10.7" : (pathname.match(/(\/10\.6\/)/)) ? "10.6" : (pathname.match(/(\/10\.5\/)/)) ? "10.5" : (pathname.match(/(\/10\.4\/)/)) ? "10.4" : "10.3",
	
    switcherLinkClass = "current";
	
	var archiveUrl = "/en/arcmap/latest/get-started/introduction/archived-arcmap-help.htm";
	if(pathname.match(/(\/10.3\/|\/10.4\/|\/10.5\/)/)){
		var versionRetireMsg = "<div class='alert info trailer-1 archive-note'>{0}</div>"
		window.docConfig.switcher.switcherdisplay = false;
		$(".feedback-footer, .content-area .icon-email").remove();
	}

    return {

      addSwitcherLinks : function(switcherLocation) {
        if(!(isHome) && (switcherCfg.switcherdisplay)){

          version = (customVersion) ? customVersion : version;
          var platK = version+"~"+plat;
          var versionLabel = (customVersionLabel) ? customVersionLabel : 'ArcMap';
          var links = '<div class="trailer-1" id="platforms">' + '<div class="left product">' + versionLabel +' '+ version + '</div>';
          links += '<div class="divider left"> | </div><div class="dropdown-navigation dropdown-wrapper left"><a class="dropdown" href="#"> ' + this.t('other-versions') + '</a>';
          //links += this.generateSwitcherLinks();
          linkData = this.generateSwitcherLinks();
          links += linkData[0];
          //links += '</div></div></div><div class="clear">';
		  
		  links += '</div></div>';
		  links += '<div class="product">&nbsp;|&nbsp;<a href="' + archiveUrl + '" tabindex="2" target="_blank"> ' + this.t('help-archive');
		  links += '</a></div></div><div class="clear">';


          ajaxRequests = [];
          linksNum = linkData[1].length;
          for (i = 0; i <= 14; i++) {
            if (i >= linksNum || linkData[1][i][1] == '#') {
              ajaxRequests.push(null);
            } else {
			  ajaxRequests.push($.ajax(linkData[1][i][1]));
            }
          }
          $.whenAll(ajaxRequests[0], ajaxRequests[1], ajaxRequests[2], ajaxRequests[3], ajaxRequests[4], ajaxRequests[5], ajaxRequests[6], ajaxRequests[7], ajaxRequests[8], ajaxRequests[9], ajaxRequests[10], ajaxRequests[11], ajaxRequests[12], ajaxRequests[13], ajaxRequests[14], $(switcherLocation).after(links)).always(function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
            responses = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14];
            for (i = 0; i < linksNum; i++) {
              if (responses[i] != null) {
                if (responses[i][1] == 'error') {
                  removeClass = 'available';
                  addClass = 'disabled';
                  href = 'javascript:void(0)';

                } else {
                  removeClass = 'disabled';
                  addClass = 'available';
                  href = linkData[1][i][1];
                }
                linkElement = $('#' + linkData[1][i][0]);
                linkElement.attr('href', href);
                if (linkElement.hasClass(removeClass)) {
                  linkElement.removeClass(removeClass);
                }
                linkElement.addClass(addClass);
              }
            }
            $('#platforms').addClass('processed');
          });
              //$(switcherLocation).after (links);

        } else {
          if(versionRetireMsg){
			var latestURL = pathname.replace(version,"latest");
			$(switcherLocation).after(versionRetireMsg.format(this.t("version-retire-msg").format(version,latestURL,archiveUrl)));
			var baseLatestURL = latestURL.substring(0, latestURL.lastIndexOf("/")+1)
			var fallbackTopic = "/{0}/documentation/".format(docConfig['localedir'].toLowerCase());
			$.get( latestURL)
			  .always(function(data, statusText, xhr) {
				if(!xhr || xhr.status != 200){
					$.get( baseLatestURL)
					.always(function(data, statusText, xhr) {
						latestURL = (xhr.status == 200)?baseLatestURL:fallbackTopic
						$(".archive-note").find('a:eq(1)').attr('href', latestURL);
					})
				}
			})
		  }
		  return true;
        }
          },

          generateSwitcherLinks : function() {

        var switcherLinks = "",
          dropDownFlag = false;
          keyL = []
        $.each (switcherCfg.switchercases, function (k, v) {
          keyL.push (k);
        });

        switcherLinks = '<div class="dropdown-content"><div class="dropdown-menu">';
        var versionArray = [];
        keyL.sort().reverse();
        //$.each(switcherCfg.keyorder || keyL, function (idx, val) {
          $.each(keyL, function (idx, val) {

          var k = val,
            v = switcherCfg.switchercases[k]
          // dbg ("generateSwitcherLinks: " + k + " : " + v)

          var url = doc.switcher.getTargetURL(k),
            kArr = k.split(":"),
            switcherLinkStatus = (kArr.length >=2) ? kArr[1] : ""



          k = kArr[0]
          linkId = k.replace(/[^a-z0-9\s]/gi, '');
          if(k.indexOf("~") >= 0){

             var keyArr = k.split("~");

             if(!keyArr[1]) {
               /*if(dropDownFlag) {
                switcherLinks += '</ul><hr>';
                dropDownFlag = false;
              }*/
               // for example key is "desktop."
               switcherLinks += '<h5 style="margin-top:0;">'+v+'</h5><ul>';
               //dropDownFlag = true;
             } else {
               versionArray.push([linkId, url]);
               switcherLinks += '<li><a id="' + linkId + '" data-plat="' + keyArr[1] +'" class="click-dropdown-item ' + switcherLinkClass + '" href="' + url + '">' + v + '</a></li>';
             }
          } else {
            versionArray.push([linkId, url]);
            switcherLinks += '<ul><li><a id="' + linkId + '" data-plat="' + k +'" class="click-dropdown-item ' + switcherLinkClass + '" href="' + url + '">' + v + '</a></li></ul>';
          }
        });
        switcherLinks += '</div>'

        //return switcherLinks;
        return [switcherLinks, versionArray];
          },

      getTargetURL : function (key){
        var kArr = key.split("~"),
        newVersion = kArr[0],
        k = (kArr.length > 1)?kArr[1]:key;
        var versionPath = switcherCfg.basepaths[newVersion],
          prefixBase = (versionPath) ? '/' + doc.switcher.getCurrentLang() + '/' + versionPath : "",
          pathpfx = window.location.pathname.split ("/").slice (0, -1).join ("/"),
          url, fileName;


         //dbg ("getTargetURL: " + k + "=>" + pathpfx + " ?==" + prefixBase + " % " + fname);

        if (pathpfx.indexOf (prefixBase) >=0) {
            switcherLinkClass = "current";
            url = pathpfx + "/" + fname;
            //url = window.location.pathname;

        } else {
          var fnameVal = this.specialCasesLookup(k, fname);

           //dbg ("getTargetURL.specialCasesLookup: " + k + " => " + fnameVal);
          if(fnameVal == "x" || (typeof switcherCfg.disable !== 'undefined' && switcherCfg.disable.indexOf(newVersion) != -1)){
            // disable click
            url = "#";
            switcherLinkClass = "disabled";


          } else {

            //tmp hack to create relative url
            //works: /en/web-adaptor/beta/install/java-linux/welcome-arcgis-web-adaptor-install-guide.htm
            //NOT: /en/collector/windows/collect-data/collect-tutorial.htm
            //url = "../" + key + "/" + fnameVal;
            url = pathpfx.replace(switcherCfg.basepaths[version], switcherCfg.basepaths[newVersion]);
            url +=  "/" + fnameVal;

            switcherLinkClass = "available";
          }
        }
        return url
      },

      //getTargetURL
      specialCasesLookup : function (key,fileName){
        var keyPosition = (switcherCfg.caseTbl && key in switcherCfg.caseTbl['__order']) ? switcherCfg.caseTbl['__order'][key] -1 : -1,
          fnameParts = fileName.split ("."),
          fnameKey = (fnameParts.length == 2)? fnameParts[0] : "",
          fnameVal = "x";

        //dbg ("specialCasesLookup: " +keyPosition + " " + fnameKey);


        if(keyPosition >= 0)  {
          if (fnameKey in switcherCfg.caseTbl) {
            fnameVal = switcherCfg.caseTbl[fnameKey][keyPosition];
            fnameVal =  (fnameVal == "x") ? "x" : ((fnameVal == "-") ? fnameKey+".htm"  : fnameVal+".htm");
          } else {
            fnameVal = fnameKey+".htm";
          }
        } else {
          //not a valid platform choice
          //fnameVal = "x";
          fnameVal = fileName;
        }

        return fnameVal;
      },

      getCurrentLang : function() {
            var localedir = "en";
        if(window.docConfig !== undefined){
          localedir =   docConfig['localedir'].toLowerCase();
        }

        return localedir;
          },

      t : function(dataLang) {
        lg = this.getCurrentLang();

        var dict = (window.localeJsonObj || {});
        return dict[lg][dataLang] || dict['en'][dataLang] || dataLang;
          },

      setJsCookie: function (ckName, ckVal) {
		$.cookie (ckName, ckVal, {expires: 30, path:"/"});
      },



    }; //End of main return

  }) ();



  //Starting point
  var switcherLocation = ".column-17 h1";
  doc.switcher.addSwitcherLinks(switcherLocation);


  $('#platforms .dropdown-menu a').on ("click", function (evt) {
    window.location.href = $(this).attr("href");
  })

})
;
