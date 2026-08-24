export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-space-lg">
      <h1
        className="font-display font-bold text-content-primary text-center"
        style={{
          fontSize: "var(--heading-display-2xl-size)",
          lineHeight: "var(--heading-display-2xl-line-height)",
          letterSpacing: "var(--heading-display-2xl-letter-spacing)",
        }}
      >
        Harmony
      </h1>
      <p
        className="mt-space-lg text-content-secondary font-body text-center max-w-2xl"
        style={{
          fontSize: "var(--text-xl-size)",
          lineHeight: "var(--text-xl-line-height)",
        }}
      >
        A centralised, Figma-driven design system. Big editorial titles,
        organised layouts, and effortless readability.
      </p>
      <div className="mt-space-xl flex gap-space-md">
        <button className="bg-background-brand text-content-on-brand px-space-lg py-space-sm rounded-radius-md font-sans font-semibold hover:bg-brand-600 transition-colors">
          Get started
        </button>
        <button className="border border-border-default text-content-primary px-space-lg py-space-sm rounded-radius-md font-sans font-semibold hover:bg-background-hover transition-colors">
          Documentation
        </button>
      </div>
    </main>
  );
}
