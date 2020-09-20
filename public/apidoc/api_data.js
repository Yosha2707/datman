define({ "api": [
  {
    "type": "post",
    "url": "/api/payment",
    "title": "Add Payment",
    "name": "Payment",
    "group": "Payment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "client_id",
            "description": "<p>This is Client ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ref_no",
            "description": "<p>This is Reference Number.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>This is Total Amount.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>This is Currency i.e USD.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "vat",
            "description": "<p>This is value added tax in percentage i.e 5.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "service_tax",
            "description": "<p>This is service tax in percentage i.e 10.</p>"
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
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"status\": 1,\n      \"message\": \"Payment Done Successfully.\",\n    \"data\": {\n\t\t\t\"_id\": \"\",\n\t\t\t\"client_id\": \"CLIENT ID\",\n\t\t\t\"ref_no\": \"REFRENCE NUMBER\",\n\t\t\t\"total_amount\": \"TOTAL AMOUNT\",\n\t\t\t\"datman_amount\": \"AMOUNT EARNED BY DATMAN\",\n\t\t\t\"client_amount\": \"AMOUNT EARNED BY CLIENT\",\n\t\t\t\"vat\": \"VALUE ADDED TAX AMOUNT\",\n\t\t\t\"service_tax\": \"SERVICE TAX AMOUNT\",\n\t\t\t\"currency\": \"USD\",\n\t\t\t\"createdAt\": \"CREATED DATE TIME\",\n\t\t\t\"updatedAt\": \"UPDATED DATE TIME\",\n\t\t\t\"__v\": 0\n\t\t}\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/PaymentController.js",
    "groupTitle": "Payment"
  }
] });
