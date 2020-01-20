import ToDo from "../models/ToDo";
import { toDosRef } from "./firebaseService";

export async function getItems() : Promise<ToDo[]> {
    const items: ToDo[] = [];
    await toDosRef.once('value', snapshot => {
        snapshot.forEach((child) => {
            const item = child.val() as ToDo;
            item.id = child.key ?? item.id;
            items.push(item);
        });
    });

    return items;
}

export async function addItem(item: ToDo) : Promise<ToDo[]> {
    const items = await getItems();
    await toDosRef.push(item).then(snapshot => {
        item.id = snapshot.key ?? item.id;
        items.push(item);
    });

    return items;
}

export async function removeItem(itemToRemove: ToDo) : Promise<ToDo[]> {
    let items = await getItems();
    items = items.filter(item => item.id !== itemToRemove.id);
    await toDosRef.child(itemToRemove.id).remove();

    return items;
}