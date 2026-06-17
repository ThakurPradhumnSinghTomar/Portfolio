"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  defaultPortfolioContent,
  parsePortfolioContent,
  portfolioStorageKey,
} from "@/lib/portfolio-data";

export default function AdminPage() {
  const [jsonValue, setJsonValue] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const savedData = parsePortfolioContent(
      window.localStorage.getItem(portfolioStorageKey),
    );
    setJsonValue(JSON.stringify(savedData ?? defaultPortfolioContent, null, 2));
  }, []);

  const handleSave = () => {
    const parsedData = parsePortfolioContent(jsonValue);
    if (!parsedData) {
      setStatus("Invalid JSON schema. Please keep all required fields.");
      return;
    }

    window.localStorage.setItem(portfolioStorageKey, JSON.stringify(parsedData));
    setStatus("Saved. Refresh the homepage to see updates.");
  };

  const handleReset = () => {
    window.localStorage.removeItem(portfolioStorageKey);
    setJsonValue(JSON.stringify(defaultPortfolioContent, null, 2));
    setStatus("Reset to default portfolio data.");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-10">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Content Editor</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          This hidden page lets you edit profile data (experience, projects, skills,
          education, about). Save changes to update the homepage content.
        </p>
        <textarea
          value={jsonValue}
          onChange={(event) => setJsonValue(event.target.value)}
          className="mt-5 h-[65vh] w-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          spellCheck={false}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={handleSave}>Save Content</Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset Defaults
          </Button>
        </div>
        {status ? (
          <p className="mt-3 text-sm text-[var(--muted-foreground)]">{status}</p>
        ) : null}
      </Card>
    </main>
  );
}
