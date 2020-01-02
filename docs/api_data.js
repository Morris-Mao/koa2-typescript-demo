define({ "api": [
  {
    "type": "get",
    "url": "/create",
    "title": "Create A Fruit",
    "name": "Create",
    "group": "Fruit",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of Fruit.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of Fruit.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "source/controllers/fruit.ts",
    "groupTitle": "Fruit"
  }
] });
