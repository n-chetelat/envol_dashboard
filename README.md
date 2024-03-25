# Kollage

An application for joining the circus.

<a href="https://gitmoji.dev">
  <img
    src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
    alt="Gitmoji"
  />
</a>

## Development

### How to run

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
