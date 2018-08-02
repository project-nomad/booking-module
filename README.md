# Project Nomad: Booking Module

> A recreation of AirBnb's booking module, made with React, Express, MySQL & Styled Components.

## Related Projects

  - https://github.com/project-nomad/review-module
  - https://github.com/project-nomad/listing-description-module
  - https://github.com/project-nomad/image-carousel-module

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

### Installing Dependencies & Getting Started

From within the root directory:

```sh
npm install -g webpack
npm install
npm run react-dev
mysql.server start
mysql -u root < sample-data/schema.sql
node sample-data/generator.js
npm run start-server
```

Navigate to http://localhost:3001/listings/1/ in your browser.  Any id from 1 - 100 is valid!
