This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

> 🔧 **Important:** This project reads the backend URL from an environment
> variable named `NEXT_PUBLIC_API_URL`. When running locally a default of
> `http://localhost:3000` is used, but on Vercel you **must** add the
> variable in the dashboard.
>
> 1. Go to your Vercel project dashboard.
> 2. Navigate to **Settings → Environment Variables**.
> 3. Add `NEXT_PUBLIC_API_URL` with value
>    `https://restaurant-management-system-server.onrender.com` (or your
>    custom backend URL).
> 4. Redeploy the project so the new value takes effect.
>
> For local development you can also create a `.env.local` file at the
> project root containing:
>
> ```bash
> NEXT_PUBLIC_API_URL=https://restaurant-management-system-server.onrender.com
> ```
>
> ### Deploying to Netlify
>
> Netlify also supports Next.js. You’ll need to add the same
> `NEXT_PUBLIC_API_URL` environment variable under **Site settings →
> Build & deploy → Environment** in your Netlify dashboard. Make sure the
> **Build command** is `npm run build` (or `pnpm build`, etc.) and the
> **Publish directory** is `.next` or use the preset “Next” selection.
>
> If you see the default Next.js welcome page ("To get started, edit the
> page.js file") after deploying, it generally means the deployment ran
> before your latest commits, or the build didn’t include your app
> changes. Check that the correct branch/commit is connected and review
> the deploy logs for errors. Re-deploy once the variable and branch are
> correct.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
