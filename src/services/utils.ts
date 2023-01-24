export function storeHistory(query: string) {
  if (!localStorage.getItem("history")) {
    const history = [query];
    localStorage.setItem("history", JSON.stringify(history));
  } else {
    let history = JSON.parse(localStorage.getItem("history") as string);
    if (!history.includes(query)) history = [query, ...history];
    localStorage.setItem("history", JSON.stringify(history));
  }
}

export function cleanHistory() {
  localStorage.removeItem("history");
  window.location.reload();
}
