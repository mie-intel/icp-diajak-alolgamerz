import { itemsModel } from "../modules/models";

export default function meetingItem(req, res, next) {
    if(itemsModel.get({ iID: req.params.iID })[0].type !== "meeting") {
        res.status(409).json("Item is not a meeting");
        return ;
    }

    next();
}