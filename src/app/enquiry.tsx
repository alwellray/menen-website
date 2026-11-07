"use client";

import { FlowButton } from "../components/ui/flow-button";


import { useEffect, useState, type FormEvent } from "react";
import { contact, services } from "../content/company";

export default function Enquiry() {
  const [service, setService] = useState("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    function selectService() {
      const name = new URLSearchParams(location.hash.split("?")[1]).get("service");
      if (services.some((item) => item.title === name)) {
        setService(name ?? "");
        document.getElementById("contact")?.scrollIntoView();
      }
    }
    selectService();
    window.addEventListener("hashchange", selectService);
    return () => window.removeEventListener("hashchange", selectService);
  }, []);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `MANEN enquiry: ${data.get("request")} — ${service}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Project location: ${data.get("location") || "To be discussed"}`,
      "",
      String(data.get("message")),
    ].join("\n");
    const link = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft(link);
    window.location.href = link;
  }

  return (
    <form onSubmit={prepareEmail} className="enquiry">
      <div className="fields">
        <label>Full name<input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
        <label>Service<select name="service" value={service} onChange={(event) => setService(event.target.value)} required>
          <option value="">Choose a service</option>
          {services.map(({ title }) => <option key={title}>{title}</option>)}
          <option>General enquiry</option>
        </select></label>
        <label>Request type<select name="request"><option>Consultation</option><option>Quotation</option><option>Service information</option></select></label>
      </div>
      <label>Project or facility location <small>(optional)</small><input name="location" maxLength={120} /></label>
      <label>Tell us what you need<textarea name="message" rows={4} required maxLength={1200} /></label>
      <FlowButton type="submit" text="Open email draft" />
      <p className="form-note" role="status">{draft ? <>Send the draft from your email app. <a href={draft}>Reopen draft</a></> : "Review and send your enquiry from your email app."}</p>
    </form>
  );
}
