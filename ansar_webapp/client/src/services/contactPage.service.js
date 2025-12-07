// Service to fetch contact page content and submit user info

export async function fetchContactPageContent() {
  const res = await fetch('/api/contact-page-content');
  if (!res.ok) throw new Error('Failed to fetch contact page content');
  return res.json();
}

export async function submitContactUserInfo(data) {
  const res = await fetch('/api/contact-user-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to submit contact info');
  return res.json();
}
