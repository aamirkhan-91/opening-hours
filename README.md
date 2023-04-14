# opening-hours

## Quickstart

#### Installation

```bash
npm install
```

#### Start a development server

```bash
npm run dev
```

**OR**

#### Generate and serve a production build

```bash
npm run build # Generate build
npm run start # Start server to serve production build
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Usage

#### Input files

Input files are stored inside a folder called `restaurant-data` in the root project folder. There are four files already stored in the folder as seed data. Any additional restaurants that are added via the [suggest feature](#suggest-new-restaurant) will also be populated in this folder.

Please note that I added 3 additional fields to the schema to fulfil the use-cases I envisioned for the application.
These fields are

- id --- _to uniquely identify the different restaurants_
- name --- _A human readable name for the restaurant_
- image --- _A link to a logo for the restaurant_

A file's name must be the same as its id. This will happen automatically for any files added via the Suggest Feature, but will have to be ensured for manually added files.

The opening hours data itself is stored in a field called `openingHours` and follows the same schema as provided in the assignment statement.

### Viewing the opening hours

Restaurants with valid data will show up in the sidebar. Clicking on a restaurant will open up its details in the main viewport to the right. Restaurants can also be filtered by name using the search-bar at the top.

### Suggest new Restaurant

The suggestion feature allows a user to "suggest" a restaurant they want to be added to the "database". This feature can be accessed via clicking on the 'Suggest Restaurant' button in the Header bar.

Opening hours data can be input in a format that is similar to the expected output. E.g. you can provide

```
monday: 9 AM - 6 PM, 8 PM - 1 AM
```

and this will be stored as

```json
{
  "monday": [
    { "type": "open", "value": 32400 },
    { "type": "close", "value": 64800 },
    { "type": "open", "value": 72000 }
  ],
  "tuesday": [{ "type": "close", "value": 3600 }]
}
```

### Dark Mode

The application supports dark and light viewing modes, which can be toggled between using the toggle switch on the top right.

## Thought process and choice of framework

Initially I started off the assignment as a Single Page Application (SPA) using [Vite](https://vitejs.dev/). However, after meeting the minimum requirement of parsing and displaying the input data, I wanted to extend the application's functionality to cover a more real world use-case. After some thinking, I envisioned a potential use-case for the application to be one where end-users could open up a list of restaurants and check their opening hours.

I chose Next.js 13 as my React framework of choice for a few reasons:

- Next.js 13 came out with a new [App Router](https://beta.nextjs.org/docs/getting-started#introducing-the-app-router) that leverages [React Server Components (RSC)](https://nextjs.org/docs/advanced-features/react-18/server-components) to enable applications that span the server and client in a much more seamless way. I was meaning to try out the new features in a project and found this to be the perfect opportunity to do so!
- The envisioned use-case for the application is perfect for leveraging Server Side Rendering. The opening hours data is static and therefore a user would benefit from the performance gains of having pages generated statically. In a real-world scenario, this would also be beneficial for SEO.
- Since I wanted to have some kind of persistence of data and the ability to retrieve/mutate the data, I needed a server. One option was to set up a simple Node/Express app with a few routes to meet my required use-cases but I felt that this would complicate the assignment. I could also use Next.js so that I could leverage Node.js APIs to read and write the files and also setup routes from within the Next.js application itself, so I opted for this approach.

## Testing

I have setup some unit tests for the `src/utils` directory because this is where the bulk of the parsing is done.

### Run tests

Run tests with the following command:

```bash
npm run test
```
