import ToDo from "../models/ToDo";

export function getItems() : ToDo[] {
    const itemsJson = sessionStorage.getItem("todos");

    return (itemsJson) ? (JSON.parse(itemsJson) as ToDo[]) : [];
}

export function addItem(item: ToDo) : ToDo[] {
    const items = getItems();
    items.push(item);
    console.log("added " + item.id);

    sessionStorage.setItem("todos", JSON.stringify(items));

    return items;
}

export function removeItem(id: string) : ToDo[] {
    const items = getItems();
    const itemToRemove = items.find(todo => todo.id === id);
    const itemToRemoveIndex = items.lastIndexOf(itemToRemove!);

    items.splice(itemToRemoveIndex, 1);
    console.log("removed " + itemToRemove?.id);

    sessionStorage.setItem("todos", JSON.stringify(items));

    return items;
}