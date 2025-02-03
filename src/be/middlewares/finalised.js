import { contractsModel } from "../modules/models";

export default function finalised(req, res, next) {
    if(!contractsModel.get({ cID: req.params.id })[0].isFinalised) {
        res.status(403).json("Contract is not finalised yet");
        return ;
    }
    
    next();
}