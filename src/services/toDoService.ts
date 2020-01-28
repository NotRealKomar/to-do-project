import ToDo from "../models/ToDo";
import { toDosRef } from "./firebaseService";

export const getItems: () => Promise<ToDo[]> = async () => {
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
        throw error;
    }
    
    return items;
}

export const addItem: (item: ToDo) => Promise<ToDo[]> = async (item) => {
    const items = await getItems();
    try {
        const snapshot = await toDosRef.push(item);
        item.id = snapshot.key ?? item.id;
        items.push(item);
    } catch (error) {
        console.error(error);
        throw error;
    }

    return items;
}

export const removeItem: (itemToRemove: ToDo) => Promise<ToDo[]> = async (itemToRemove: ToDo) => {
    let items = await getItems();
    try {
        items = items.filter(item => item.id !== itemToRemove.id);
        await toDosRef.child(itemToRemove.id).remove();
    } catch (error) {
        console.error(error);
        throw error;
    }

    return items;
}