import ToDo from "../models/ToDo";
import { toDosRef } from "./firebaseService";

export const getItems = async () => {
    const items: ToDo[] = [];
    try {
        await toDosRef.once('value', snapshot => {
            snapshot.forEach((child) => {
                const item = child.val() as ToDo;
                item.id = child.key ?? item.id;
                items.push(item);
            });
        });
    } catch (error) {
        console.error(error);
    }
    
    return items;
}

export const addItem = async (item: ToDo) => {
    const items = await getItems();
    try {
        const snapshot = await toDosRef.push(item);
        item.id = snapshot.key ?? item.id;
        items.push(item);
    } catch (error) {
        console.error(error)
    }

    return items;
}

export const removeItem = async (itemToRemove: ToDo) => {
    let items = await getItems();
    try {
        items = items.filter(item => item.id !== itemToRemove.id);
        await toDosRef.child(itemToRemove.id).remove();
    } catch (error) {
        console.error(error)
    }

    return items;
}