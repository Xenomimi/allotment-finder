import { Request, Response } from "express";
import locationModel from "../models/Location"; // Upewnij się, że ścieżka jest poprawna


export const addLocation = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { locationName } = req.body;

        if (!locationName) {
            return res.status(400).json({
                success: false,
                message: "Location name is required",
            });
        }

        const newLocation = new locationModel({ locationName });
        await newLocation.save();


        return res.status(201).json({
            success: true,
            message: "Location added successfully",
            data: newLocation,
        });

    } catch (error) {
        console.error("Error adding location:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong with the server",
        });
    }
};


export const fetchLocationHistory = async(req : Request , res : Response) : Promise<Response> => {
    try{
        const locations = await locationModel.find({});
        return res.status(201).json({success: true , data : locations});

    } catch(error){
        console.error(error);
        return res.status(404).json({success: false , message : "couldn t fetch from backend"});
    }
}

export const deleteLocation = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const {id} = req.body;

        console.log("controller id : " + id);

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "id required"
            });
        }

        const deletedLocation = await locationModel.findByIdAndDelete(id);

        if (!deletedLocation) {
            return res.status(404).json({
                success: false,
                message: "location not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "deleted successfully"
        });

    } catch(error)
    {
        return res.status(404).json({success:false, message: error});
    }
}


