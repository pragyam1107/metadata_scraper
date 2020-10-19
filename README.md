# metadata_scraper
This is an express application that scrapes metadata from websites.

Major functionalities -

Scrapes metadata of website

Uses caching for faster performance

The application is already hosten on heroku

It can be tested using postman.

POST https://metadatascraper1.herokuapp.com/application/json

Sample request:
{
    
    "url": "https://andrejgajdos.com/how-to-create-a-link-preview/"
}

Sample Response: 

{

    "status": "success",
    
    "message": {
    
        "title": "How to Create a Link Preview: The Definite Guide [Implementation and Demo Included] | Andrej Gajdos",
        
        "description": "The whole strategy of creating link previews, including implementation using open-source libraries in node.js. The whole solution is released as npm package.",
        
        "images": "https://andrejgajdos.com/wp-content/uploads/2019/11/generating-link-preview.png"
    }
    
}



Features

This supports all types of websites that have or don't have og tags.

To learn more about og tags check out:

http://ogp.me/

It uses caching for faster user experience.
