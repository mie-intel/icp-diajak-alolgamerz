import { itemsModel } from "../modules/models";

export default function itemExist(req, res, next) {
    if(itemsModel.get({ iID: req.params.iID, cID: req.params.cID }).length === 0) {
        res.status(404).json("Item not found");
        return ;
    }
    next();
}