# metadata_scraper
This is an express application that scrapes metadata from websites.

Major functionalities -

Scrapes metadata of website

Uses caching for faster performance

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



Unit Test Cases

