import { contractsModel, userModel } from "../modules/models";

export default function permission(req, res, next) {
    // If contract not exist
    if(contractsModel.get({ cID: req.params.cID }).length === 0) {
        res.status(404).json("Contract not found");
        return ;
    }

    // If cID is not in user contracts
    if(! JSON.parse(userModel.get({ uID: req.session.uID })[0].contracts).includes(parseInt(req.params.cID)) ) {
        res.status(403).json("You have no permission to view this contract");
        return ;
    }

    next();
}