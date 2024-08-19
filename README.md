# Envol

An application for joining the circus.

<a href="https://gitmoji.dev">
  <img
    src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
    alt="Gitmoji"
  />
</a>

# Stack

- Next.js - [https://nextjs.org/](https://nextjs.org/)
- Vercel (Server and DB) - [https://www.prisma.io/](https://www.prisma.io/)
- Prisma (PostgreSQL) - [https://www.prisma.io/](https://www.prisma.io/)
- Clerk (Auth) - [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
- Inngest (Events) - [https://github.com/inngest/inngest](https://github.com/inngest/inngest)
- Stripe (Payments) - [https://dashboard.stripe.com/dashboard](https://dashboard.stripe.com/dashboard)

## Development

### How to run development serve

```bash
npm run dev
```

### How to get Stripe Webhook events in development

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe --forward-connect-to localhost:3000/api/webhooks/stripe --events account.updated,customer.created,account.application.authorized,account.application.deauthorized,capability.updated
```

Trigger an individual webhook

```bash
stripe trigger account.updated
```

### How to run Inngest server in dev

```bash
npx inngest-cli@latest dev
```

### Prisma commands

```bash
npx prisma format # Clean up schema file
npx prisma generate # Create types for TypeScript
npx prisma db push # Migrate database
npx prisma studio # Open studio UI in browser
npx prisma db seed
```

### How to make a db backup

```bash
pg_dump "postgres://<username>:<password>@<dbname>" -f backup.dump
```
