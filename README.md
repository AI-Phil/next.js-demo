This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Prerequisites
This project was created using node.js v18.18.2 and npm 10.2.0.

### Install from package.json
```
npm install
```

### Set up Credentials
From Astra, download the Secure Connect bundle and put in this folder.

Copy file `.env.example` into new file `.env` and edit the keys/tokens.
```
OPENAI_API_KEY=<your OpenAI API key here>
CASSANDRA_TOKEN=<Your Astra DB token here, begins like AstraCS:....>
CASSANDRA_SCB=<your-secure-connect-filename-here.zip>
```

## Start the Server
```
npm run dev
```

In the browser, to go [http://localhost:3000](http://localhost:3000)
