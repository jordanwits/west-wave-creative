export interface Web3FormsPayload {
  [key: string]: unknown
}

const PUBLIC_KEY =
  (typeof process !== "undefined" && (process as any).env?.NEXT_PUBLIC_WEB3FORMS_KEY) ||
  "050b9b0f-2682-4ea6-b5a9-7083512e599b"

export async function submitWeb3Form(payload: Web3FormsPayload) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ access_key: PUBLIC_KEY, ...payload, botcheck: "" }),
  })
  const result = await response.json()
  return result
}


