# Spond API documentation

This is an unofficial Documentation for the Spond API. I made this becouse I like Spond and want to use Spond events out side of spond.  

This codebase is a work in progress and does not reflect the full capabilities of the Spond API.

Visit the Swagger documentation at [https://martcl.github.io/spond/](https://martcl.github.io/spond/)



## Contributing

You can add new endpoints or update the existing ones in the `typesec` folder. I don't have the time to go trough all the endpoints so any contribution is welcome!

> How? My method is to proxy trafic through burp suite. This makes it possible to record every request, so I afterwords can note down how the endpoints works.

## Development 

To run the project locally, you can use the following commands:

```bash
git clone git@github.com:martcl/spond.git
cd spond
npm install
npm run watch
```

You can open swagger locally by running `npx serve -s dist` and open the browser at `http://localhost:3000`
