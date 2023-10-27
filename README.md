# Ordering System

[![License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)
[![Discord](https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white)](https://discordapp.com/users/738982726392217611)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white&style=flat)](https://twitter.com/notlaww_)

### Built with:

[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![VS Code](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)
[![WebStorm](https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=webstorm&logoColor=white)](https://www.jetbrains.com/webstorm/)

Ordering system built with Next.js, Prisma, PostgreSQL, and Tailwind CSS.

## Getting Started

Configuring your email:
1. Go to [google accounts](https://myaccount.google.com/) page of google and login your test account
2. Click "Security" on the left side.
3. Enable 2-Step Verification
4. Scroll down and click "App Passwords"
5. Click "Select App"
6. Click "Other (Custom Name)"
7. Type any name you want.
8. Click Generate
9. Save the 16-character random password.


```dotenv
# save this for later use
EMAIL_USERNAME="the email of your test google account"
EMAIL_PASSWORD="the 16 digit random password"
```

First, clone the repository:

```bash
git clone https://github.com/tora-o/ordering-system.git

cd ordering-system
```

Then, install the dependencies:

```bash
npm install
```

Then, create a `.env.development.local` file in the root directory, see `.env.example` for an example.
```bash
cp .env.example .env.development.local
```

Then, apply migrations and generate Prisma client (make sure you have a PostgreSQL database running)

```bash
# Make sure you have a PostgreSQL database running
npm run prisma:generate

# This will apply migrations and seed the database
npm run prisma:migrate

# If seed fails, run this command
npm run prisma:seed:dev
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To generate new files:

```bash
npm run generate
# Select the file you want to generate from the list
```

To build the app:

```bash
# Build the app locally
npm run build

# Run the app
npm run start
```
