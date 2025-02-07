import PocketBase from "pocketbase";
import { formatDate } from "./utils.mjs";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        data = data.map((item) => {
            item.img = pb.files.getURL(item, item.image);
            return item;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

//backend.mjs
export async function getOneOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}