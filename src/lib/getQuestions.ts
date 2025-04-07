export async function getQuestions() {
    try {
      const res = await fetch("/api/questions");
      if (!res.ok) throw new Error("Failed to fetch questions");
  
      const data = await res.json();
      return data;
    } catch (err) {
    console.error("Error fetching questions:", err);
    return null;
  }
}
