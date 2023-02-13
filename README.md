# Front-end Test Task

Implemented [test task](https://axisbits.notion.site/Front-end-Test-Task-b33ebbab4ad04b0d925f1e2a543c51f0).
This application simply displays the incoming data from \*https://covid-api.com/api/reports/total?date=2022-01-19&iso=UKR

- Sometimes we don't have a data from this api for current date or previous seems because some data is not ready yet, so i get data from start previous 2 days ago.Example: if today is 2023-02-14, the date in the table will start with 2023-02-12, 2023-02-11, 2023-02-10, etc.

## Technologies:

- Nuxt 3
- Vite
- SSR
- Pinia
- Typescript
- Tailwind

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Sign in

## App overview

### Login

For testing app please login with hard coded credentials http://localhost:3000/login

```bash
Username: admin
Password: admin
```

![alt text](https://i.imgur.com/CR4pzyS.png)

### Home

Home screen: http://localhost:3000/
![alt text](https://i.imgur.com/yBkzk3f.png)

### Delete

You can delete item from table if you want.
![alt text](https://i.imgur.com/5e0FBzc.png)

### Refresh

You can refresh items in table.
![alt text](https://i.imgur.com/QaVEWYj.png)

### Logout

you can click on logout button for logout.
![alt text](https://i.imgur.com/tvAhQPc.png)

### Empty table

if you are deleted all items in table just click on the refresh button.
![alt text](https://i.imgur.com/JT6IjFU.png)
