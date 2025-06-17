import { useState } from "react";
import React from "react";
import { SearchResponse, algoliasearch } from "algoliasearch";
import LoadingSpinner from "./LoadingSpinner";
import { useParkingInfoStore } from "../stores/useParkingInfo";

const client = algoliasearch(
	import.meta.env.VITE_ALGOLIA_APP_ID,
	import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY
);

export default function ParkingInput() {
	const [inputValue, setInputValue] = useState<string>("");
	const [inputErrorMessage, setInputErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const { updateParkingInfo } = useParkingInfoStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		updateParkingInfo(undefined);

		if (inputValue == "") {
			setInputErrorMessage("차량 번호 4자리를 입력해주세요");
			return;
		}

		if (Number.isNaN(Number(inputValue))) {
			setInputErrorMessage("숫자만 입력 가능합니다");
			return;
		} else if (inputValue.split(" ").join("").length !== 4) {
			setInputErrorMessage("숫자 4자리를 입력해주세요");
			return;
		}

		setLoading(true);
		const results = await getParkingInfo(inputValue);

		if (results.length == 0) {
			setLoading(false);
			setInputErrorMessage("등록되지않은 차량입니다");
			return;
		} else {
			updateParkingInfo({
				id: results[0]["objectID"] as string,
				car_number: results[0]["car_number"] as string,
				imgUrl: results[0]["imgUrl"] as string,
				timestamp: results[0]["timestamp"] as string,
			});
			setLoading(false);
		}
	};

	async function getParkingInfo(inputValue: string) {
		const { results } = await client.search({
			requests: [
				{
					indexName: "parking_records",
					query: inputValue,
					typoTolerance: false,
				},
			],
		});
		const { hits } = results[0] as SearchResponse;
		return hits;
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="relative">
					<input
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value);
							setInputErrorMessage("");
						}}
						id="search"
						className="block w-full p-4 ps-4 text-sm text-gray-900 border-2 border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:border-2 focus:outline-none"
						placeholder="뒷 번호 4자리"
					/>
					<button
						type="submit"
						className="btn-blue font-semibold absolute end-2.5 top-2.5 text-sm py-2 mt-0"
					>
						조회
					</button>
					<span className="font-medium tracking-wide text-red-500 text-xs ml-1">
						{inputErrorMessage}
					</span>
				</div>
			</form>
			{loading ? <LoadingSpinner loading={loading} /> : null}
		</div>
	);
}
