const API = `${window.location.origin}/api/items`;

export async function getItems() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch items");
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

export async function addItem(item) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error("Failed to add item");
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

export async function deleteItem(id) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete item");
    return await res.json();
  } catch (err) {
    return { error: err.message };
  }
}

