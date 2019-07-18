import boto3
import json
import os
import decimal
import requests

def lambda_handler(event, context):
    print('EVENT:')
    print(event)
    data = json.loads(event['body'])
    print('DATA:')
    print(data)
    hostname = data['hostname']
    role = data['role']
    management_subnet = data['management_subnet']
    data_subnet = data['data_subnet']
 
    response = {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin":"*"},
            "body": json.dumps(
                {"Status": "Success",
                 "hostname" : hostname,
                },
            )
        }
    return response
