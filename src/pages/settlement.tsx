import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

type Data = {
	car_number: string;
	imgUrl: string;
	timestamp: string;
};

type ParkingData = {
	id: string;
	data: Data;
};

export default function Settlement() {
	const [carNumber, setCarNumber] = useState<string>();
	const [parkingRecord, setParkingRecord] = useState<ParkingData>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const q = query(collection(db, "parking_records"));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			const data = doc.data() as Data;
			if (carNumber && data.car_number && data.car_number.includes(carNumber)) {
				setParkingRecord({ id: doc.id, data });
			}
		});
	};

	return (
		<div>
			<div>
				<form onSubmit={handleSubmit}>
					<label
						htmlFor="search"
						className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
					>
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							value={carNumber}
							onChange={(e) => setCarNumber(e.target.value)}
							type="search"
							id="search"
							className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="뒷 번호 4자리"
							required
						/>
						<button
							type="submit"
							className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							조회
						</button>
					</div>
				</form>
			</div>
			<div>
				{parkingRecord?.data.car_number}
				<div className="flex justify-center">
					<img
						className="h-40 w-40 rounded-sm"
						src={parkingRecord?.data.imgUrl}
						alt=""
					/>
				</div>
				<div>
					프로그레스바 있으면 재밌을거같다 주차 조회하자마자 쭉 차오르는
					애니메이션
					<div className="relative">
						<div className="bg-gray-200 absolute rounded-full w-full h-2" />
						<div className="bg-green-400 absolute rounded-full w-2/3 h-2" />
					</div>
				</div>
			</div>
			<div>쿠폰 적용</div>
			<div>
				<ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
					<li className="w-full border-b border-gray-200 rounded-t-lg ">
						<div className="inline-flex items-start p-4 w-full">
							<label
								className="flex items-start cursor-pointer relative"
								htmlFor="discount2h"
							>
								<input
									type="checkbox"
									className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:border-blue-500"
									id="discount2h"
								/>
								<span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3.5 w-3.5"
										viewBox="0 0 20 20"
										fill="currentColor"
										stroke="currentColor"
										stroke-width="1"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										></path>
									</svg>
								</span>
							</label>
							<label
								className="cursor-pointer ml-2 text-slate-600 text-sm block w-full"
								htmlFor="discount2h"
							>
								<div>
									<p className="font-medium">2시간 할인</p>
									<p className="text-slate-500">남은수량 :</p>
								</div>
							</label>
						</div>
					</li>
					<li className="w-full border-b border-gray-200 rounded-t-lg">
						<div className="inline-flex items-start p-4 w-full">
							<label
								className="flex items-start cursor-pointer relative"
								htmlFor="discount3h"
							>
								<input
									type="checkbox"
									className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:border-blue-500"
									id="discount3h"
								/>
								<span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3.5 w-3.5"
										viewBox="0 0 20 20"
										fill="currentColor"
										stroke="currentColor"
										stroke-width="1"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										></path>
									</svg>
								</span>
							</label>
							<label
								className="cursor-pointer ml-2 text-slate-600 text-sm block w-full"
								htmlFor="discount3h"
							>
								<div>
									<p className="font-medium">3시간 할인</p>
									<p className="text-slate-500">남은수량 :</p>
								</div>
							</label>
						</div>
					</li>
					<li className="w-full border-b border-gray-200 rounded-t-lg ">
						<div className="inline-flex items-start p-4 w-full">
							<label
								className="flex items-start cursor-pointer relative"
								htmlFor="discount24h"
							>
								<input
									type="checkbox"
									className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-500 checked:border-blue-500"
									id="discount24h"
								/>
								<span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3.5 w-3.5"
										viewBox="0 0 20 20"
										fill="currentColor"
										stroke="currentColor"
										stroke-width="1"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										></path>
									</svg>
								</span>
							</label>
							<label
								className="cursor-pointer ml-2 text-slate-600 text-sm block w-full"
								htmlFor="discount24h"
							>
								<div>
									<p className="font-medium">종일권</p>
									<p className="text-slate-500">남은수량 :</p>
								</div>
							</label>
						</div>
					</li>
				</ul>
			</div>
			<div>
				<button className="mt-4 rounded-lg bg-blue-500 h-10 w-full text-white peer-invalid:bg-gray-500 text-sm disabled:bg-gray-300 disabled:opacity-50">
					적용하기
				</button>
			</div>
		</div>
	);
}
