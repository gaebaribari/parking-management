import { useState, useEffect } from "react";
import { useParkingInfoStore } from "../stores/useParkingInfo";

export function useBlockAccess() {
	const { parkingInfo } = useParkingInfoStore();
	const [blockAccess, setBlockAccess] = useState(false);

	useEffect(() => {
		if (window.history.state.idx == 0 || !parkingInfo) {
			setBlockAccess(true);
			return;
		}
	}, []);

	return blockAccess;
}
