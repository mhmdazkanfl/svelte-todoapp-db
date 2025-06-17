# Svelte Todo App with Database

A modern, full-stack todo application built with **Svelte 5**, **SvelteKit**, and **SQLite** database. Features authentication, task management, and a beautiful UI with dark mode support.

## 🚀 Tech Stack

- **Frontend**: Svelte 5 (with runes), SvelteKit, TailwindCSS
- **Backend**: SvelteKit server functions
- **Database**: SQLite with Drizzle ORM
- **Authentication**: Session-based with email/username and password
- **UI Components**: Custom components built with shadcn/ui principles
- **Styling**: TailwindCSS with dark/light mode support

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📱 Features

### ✅ Implemented Features

#### Core Todo Functionality

- ✅ **Authentication** - Email/username and password login system
- ✅ **Add a task** - Create new tasks with title and description
- ✅ **"All Task" Filter** - View all tasks regardless of status
- ✅ **"Active Task" Filter** - View only incomplete tasks
- ✅ **"Completed Task" Filter** - View only completed tasks
- ✅ **Mark a task as completed** - Toggle task completion status
- ✅ **Remove a task** - Delete tasks (works for both completed and active)
- ✅ **Change title of the task** - Edit task titles through modal
- ✅ **Change description of the task** - Edit task descriptions through modal
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Search & Filtering** - Search tasks by title and description
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Real-time Updates** - UI updates immediately on changes
- ✅ **Task Details View** - Click to view full task details in modal

#### Authentication Features

- ✅ **Email and password authentication** - Full login/signup system
- ✅ **Session management** - Secure session handling
- ✅ **User registration** - Create new accounts
- ✅ **Database integration** - SQLite with Drizzle ORM

### 🚧 In Progress / Planned Features

#### MVP Remaining

- ❌ **Clear all completed tasks** - Bulk delete completed tasks

#### Additional Features (Future)

- ❌ **Scheduling** (day and time)
- ❌ **Recurring Task Customization**
- ❌ **Attachment** support
- ❌ **Advanced Search & Filtering** (beyond basic text search)
- ❌ **Tags** system

#### Enhanced Authentication (Infrastructure Ready)

- ❌ **Password check with HaveIBeenPwned** (schema ready)
- ❌ **Email verification** (schema ready)
- ❌ **2FA with TOTP** (schema ready)
- ❌ **2FA recovery codes** (schema ready)
- ❌ **Password reset** (schema ready)
- ❌ **Login throttling and rate limiting**

> **Note**: The database schema already includes fields for advanced authentication features like TOTP keys, email verification, and recovery codes. These features are structurally ready but not yet implemented in the UI.

## 🎯 Current Status

This todo application has successfully implemented **most of the MVP features** and is fully functional for daily task management. The app includes:

- Complete authentication system with secure sessions
- Full CRUD operations for tasks (Create, Read, Update, Delete)
- Advanced filtering and search capabilities
- Beautiful, responsive UI with dark mode
- Real-time updates and smooth user experience

**Ready for daily use!** 🎉

## 🔗 References

- [Lucia Auth SvelteKit Example](https://github.com/lucia-auth/example-sveltekit-email-password-2fa) - Authentication implementation reference
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview) - Framework documentation
- [SvelteKit](https://kit.svelte.dev/) - Full-stack framework
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> **Development Status**: Most MVP features complete ✅ | Ready for production use 🚀

## 🗂️ Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── TaskItem.svelte      # Individual task component
│   │   ├── TaskList.svelte      # Task list container
│   │   └── ui/                  # Reusable UI components
│   ├── server/
│   │   ├── db/                  # Database schema & connection
│   │   ├── task.ts              # Task-related server functions
│   │   ├── user.ts              # User management
│   │   ├── session.ts           # Session handling
│   │   └── password.ts          # Password utilities
│   └── utils.ts                 # Utility functions
├── routes/
│   ├── +layout.svelte           # Global layout with theme toggle
│   ├── +page.svelte             # Main todo app page
│   ├── login/                   # Login page
│   ├── signup/                  # Registration page
│   └── api/task/                # Task API endpoints
```
