export async function askBot(data: {
  text: string;
  image: { data: string; mimeType: string } | null;
}) {
  if (data.image) {
    let message = "";
    if (!data.text) {
      message =
        "If the image I uploaded is a leaf, identify and describe it for me. If it is not a leaf, then reject it and tell me to upload an image of leaf.";
    } else {
      message = data.text;
    }

    const prompt = {
      text: message,
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
  } else if (data.text) {
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
