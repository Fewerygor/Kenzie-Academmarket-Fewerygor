import { Request, Response } from "express";
import { market } from "./database";
import { Product } from "./interfaces";

let id = 0;

export const createProduct = (req: Request, res: Response) => {
    id++;
    let date = Date.now() + 31557600000;

    const newProduct = {
        id: id,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        section: req.body.section,
        calories: req.body.calories,
        expirationDate: new Date(date)
    }

    market.push(newProduct);

    return res.status(201).json(newProduct);
};

export const getProducts = (req: Request, res: Response) => {
    return res.status(200).json(market);
};

export const getOneProduct = (req: Request, res: Response) => {
    const product = market.find(product => product.id === Number(req.params.id));

    return res.status(200).json(product);
};

export const updatePartialUser = (req: Request, res: Response) => {
    const product = market.find(product => product.id === Number(req.params.id));

    const productBody: Partial<Product> = {};

    const newProduct = { ...product, ...productBody };

    const index = market.findIndex(product => product.id === Number(req.params.id));

    market.splice(index, 1, newProduct as Product);

    return res.status(200).json(newProduct);
};

export const deleteProduct = (req: Request, res: Response) => {
    const index = market.findIndex(product => product.id === Number(req.params.id));

    market.splice(index, 1);

    return res.status(204).json();
};