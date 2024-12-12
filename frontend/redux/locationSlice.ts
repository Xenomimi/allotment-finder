import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { fetchHistory, createLocation, deleteLocation } from "../api/locationService";

interface Location {
    locationName : string,
    _id : string, 
    coordinates?: { lat: number; lng: number };
}

interface LocationState {
    locations : Location[],
    loading : boolean,
    error : string | null,
}

const initialState: LocationState = {
    locations: [],
    loading: false,
    error: null,
}

export const fetchLocations = createAsyncThunk<Location[]>('locations/fetchLocations',
    async (_, thunkAPI) => {
        try{
            const data = await fetchHistory();
            return data;
        } catch (error : any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addNewLocation = createAsyncThunk<Location, string>(
    'locations/addLocation',
    async(locationName, thunkApi) => {
        try{
            const newLocation = await createLocation(locationName);
            return newLocation;
        }catch(error : any){
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const removeLocation = createAsyncThunk<string, string>(
    'locations/deleteLocation',
    async (id, thunkAPI) => {
      try {
        await deleteLocation(id);
        return id;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const addMultipleLocations = createAsyncThunk<Location[], string[]>(
    'locations/addMultipleLocations',
    async (addresses, thunkAPI) => {
      try {
        const created = [];
        for (const address of addresses) {
          const newLocation = await createLocation(address); // API do tworzenia lokalizacji
          created.push(newLocation);
        }
        return created;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


const locationSlice = createSlice({
    name: "locations",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchLocations.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchLocations.fulfilled, (state, action : PayloadAction<Location[]>) =>{
            state.loading = false;
            state.locations = action.payload;
        })
        .addCase(fetchLocations.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.payload as string;
        })
        .addCase(addNewLocation.fulfilled, (state, action: PayloadAction<Location>) => {
            state.locations.push(action.payload);
        })
        .addCase(removeLocation.fulfilled, (state, action : PayloadAction<string>)=>{
            state.locations = state.locations.filter((loc)=>loc._id !== action.payload);
        })
        .addCase(addMultipleLocations.fulfilled, (state, action: PayloadAction<Location[]>) => {
            const newLocations = action.payload;
            const existingNames = new Set(state.locations.map(loc => loc.locationName));
          
            // Filtrowanie po stronie reduktora, aby uniknąć wprowadzania duplikatów do stanu
            const filteredLocations = newLocations.filter(loc => !existingNames.has(loc.locationName));
          
            // Dodajemy tylko nowe, unikalne lokalizacje
            state.locations = [...state.locations, ...filteredLocations];
          });
        
    }
})

export default locationSlice.reducer;

  