Commands:
----
- Start dev server
    - npm run start
    
- Build (to dist folder)
    - npm run build
    
- Run tests
    - npm run test
    
- Run lint
    - npm run tslint.
        
- Run production server
    - npm run prod    


About 
----
- Example URLS to test:
    - localhost:3000/api/images?filename=fjord&width=100&height=100
    - localhost:3000/api/images?filename=fjord&width=100&height=100
    - localhost:3000/api/images?filename=fjord&width=100&height=100
    

- Handles only .jpg files.  .jpeg, .JPG, .png etc are not supported
- Returns 200 status code if image is served from cache and 201 otherwise (new image created)
- Returns 500 if parameters are incorrect, or it image iss not found
- I have removed prettier from the config - I am using only tslint. 
 
Notable files for review:

- a
- b
 
- Middleware:
    - src\routes\middleware\logger.ts
    - src\routes\middleware\validator.ts
   
    
- Testing:
    
    







