# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Todo

> [!IMPORTANT]
> Here is the things that i need to clear for this product considered ready

### MVP

- [ ] Authentication
- [ ] Add a task
- [ ] "All Task" Filter
- [ ] "Active Task" Filter
- [ ] "Completed Task" Filter
- [ ] Mark a task as completed
- [ ] Remove a task if its completed
- [ ] Change title of the task
- [ ] Change description of the task
- [ ] Clear all completed task

### Additional Feature

- [ ] Scheduling (day and time)
- [ ] Recurring Task Customization
- [ ] Attachment
- [ ] Advanced Search & Filtering
- [ ] Tag

### Authentication

- [ ] Email and password authentication
- [ ] Password check with HaveIBeenPwned
- [ ] Email verification
- [ ] 2FA with TOTP
- [ ] 2FA recovery codes
- [ ] Password reset
- [ ] Login throttling and rate limiting

Refrence: [Lucia Auth SvelteKit](https://github.com/lucia-auth/example-sveltekit-email-password-2fa)

### Task Item

- [ ] Add a task
