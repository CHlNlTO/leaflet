export async function askBot(data: {
  text: string;
  image: { data: string; mimeType: string } | null;
}) {
  if (data.image) {
    const prompt = {
      text: data.text,
      image: {
        data: data.image.data,
        mimeType: data.image.mimeType,
      },
    };

    const response = await fetch("/api/chatbot/image/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return await response.json();
  } else {
    const response = await fetch("/api/chatbot/text/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.text),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return await response.json();
  }
}
