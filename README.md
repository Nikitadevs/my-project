# Nikita's portfolio

A responsive React and Vite portfolio with project search, project details, and light and dark themes.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run lint` to check the source.

## Update the content

The project list, skills, education, social links, and site details live in [siteData.js](src/components/siteData.js). Add a public address to `siteMeta.contactEmail` to show an email link on the contact page. Project links should point to the relevant public repositories.

When deploying the built site, configure the host to serve `index.html` for portfolio routes such as `/projects` and `/about`.
