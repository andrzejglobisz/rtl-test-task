Application is split into two parts scrapper-svc and movies-api. 

To run the project navigate to root directory and run 'yarn run up --mode DEV'. This downloads dependencies and runs docker containers.

For development navigate to each service directory (/services/movies-api and /services/scrapper-svc) and run 'yarn' to get dependencies. Later run 'yarn run dev' to watch for changes in files.

- movies-api runs by default on localhost:4000

- after startup Scrapper checks index of last page with movies that was previously scrapped and saved to DB and starts scrapping from it. If scrapper is already runnning it can't be triggered second time

- GET localhost:4000/shows?page=:pageNo - movies-api returns movies with cast from the database - 250 per page, same as from TVMaze
