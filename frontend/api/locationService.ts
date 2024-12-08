import axios from 'axios';
const db_uri : string = 'http://localhost:5000';


interface Location{
  _id: string;
  locationName: string;
  coordinates?: { lat: number; lng: number };
}

interface CreateLocationResponse {
    success: boolean;
    message: string;
    data: Location;
}



export const createLocation = async(locationName : string) : Promise<Location>=> {
    try{
        const response = await axios.post<CreateLocationResponse>(db_uri + "/api/addLocation", {
            locationName : locationName
        });
        if(response.data.success){
            return response.data.data;
        }else{
            throw new Error("something went wrong ");
        }

    } catch (error) {
        console.log("something wrong with creating your location");
        throw new Error("something went wrong");
    }
}

export const fetchHistory = async (): Promise<Location[]> => {
    try {
        const response = await axios.get<{ success: boolean; data: Location[] }>(db_uri + '/api/fetchLocations');
        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error("API zwróciło błąd");
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Nie udało się pobrać lokalizacji");
        }
        throw new Error("Nie udało się pobrać historii lokalizacji");
    }
};


export const deleteLocation = async (id: string) => {
    try {
        const response = await axios.delete<{ success: boolean; message: string }>(db_uri + `/api/deleteLocation`, {
            data : {id : id}
        });

    } catch (error) {
        console.error("Error deleting location:", error);
    }
};

