var msConfig ={
  "esriProductName": "drone2map",
  "filtercfg": {
    "default": [
      {
        "k": "collection",
        "l": "collection",
        "v": [
          {
            "k": "all",
            "q": {
              "r": "search-collection:help|search-collection:blogs",
              "p": ""
            }
          },
          {
            "k": "help",
            "q": {
              "r": "search-collection:help",
              "p": ""
            }
          },
          {
            "k": "blogs",
            "q": {
              "r": "search-collection:blogs",
              "p": ""
            }
          }
        ]
      },
      {
        "k": "product",
        "l": "product",
        "v": [
          {
            "k": "drone2map",
            "q": {
              "r": "",
              "p": "product:drone2map"
            }
          }
        ]
      }
    ]
  },
  "switchercfg": {
    "customVersionLabel": " ",
    "basepaths": {
      "2022.1": "drone2map/latest/",
	  "latest": "drone2map/latest/",
      "2.3": "drone2map/2.3/"
    },
    "switchercases": {
      "latest": "2022.1",
      "2.3": "2.3"
    },
    "caseTbl": {
      "__order": {
        "2022.1": 1,
        "2.3": 2
      }
    }
  },
  "latestVersion": "2022.1"
}