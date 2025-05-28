import { create } from "zustand";

interface ParkingInfoType {
	id: string;
	car_number: string;
	imgUrl: string;
	timestamp: string;
}

interface ParkingInfoState {
	parkingInfo: ParkingInfoType | undefined;
	updateParkingInfo: (newParkingInfo: ParkingInfoType | undefined) => void;
}

export const useParkingInfoStore = create<ParkingInfoState>()((set) => ({
	parkingInfo: undefined,
	updateParkingInfo: (newParkingInfo) =>
		set({
			parkingInfo: newParkingInfo,
		}),
}));
