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
        let data = await pb.collection('Maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getOffresBySurface(s) {
    const maisonSurface = await pb.collection('Maison').getFullList({
        filter: `surface > ${s}`,
    });
    maisonSurface.forEach((maison) => {
        maison.img = pb.files.getURL(maison, maison.image);
    });
    return maisonSurface;
}

export async function getOffresByPrice(minPrice, maxPrice) {
    const maisonPrice = await pb.collection('Maison').getFullList({
        filter: `prix > ${minPrice} && prix < ${maxPrice}`,
    });
    maisonPrice.forEach((maison) => {
        maison.img = pb.files.getURL(maison, maison.image);
    });
    return maisonPrice;
}

export async function addOffre(house) {
    try {
        await pb.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}