import { useState } from "react";
import React from "react";
// 뒤로가기 있어야돼
// 결제하기 바로가는 버튼만들기 왜냐 결제하기는 돈 바로 가는게 좋을거같앗따

export default function Payment() {
	const [parkingTickets, setParkingTickets] = useState([
		{ id: 1, name: "2시간 할인", amount: 0, price: 2000 },
		{ id: 2, name: "3시간 할인", amount: 0, price: 3000 },
		{ id: 3, name: "종일권 (24시간)", amount: 0, price: 5000 },
	]);

	const handleIncrement = (id: number) => {
		setParkingTickets(
			parkingTickets.map((counter) =>
				counter.id === id ? { ...counter, amount: counter.amount + 1 } : counter
			)
		);
	};

	const handleDecrement = (id: number) => {
		setParkingTickets(
			parkingTickets.map((counter) =>
				counter.id === id
					? { ...counter, amount: Math.max(0, counter.amount - 1) }
					: counter
			)
		);
	};

	const totalPrice = parkingTickets.reduce(
		(sum, ticket) => sum + ticket.price * ticket.amount,
		0
	);

	const handleClick = async () => {};

	return (
		<div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								할인쿠폰종류
							</th>
							<th scope="col" className="px-6 py-3">
								구매수량
							</th>
							<th scope="col" className="px-6 py-3">
								구매금액
							</th>
						</tr>
					</thead>
					<tbody>
						{parkingTickets.map((ticket) => (
							<tr
								key={ticket.id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{ticket.name}
								</th>
								<td className="px-6 py-4">
									<div className="relative flex items-center max-w-[8rem]">
										<button
											type="button"
											id="decrement-button"
											onClick={() => handleDecrement(ticket.id)}
											data-input-counter-decrement="quantity-input"
											className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
										>
											<svg
												className="w-3 h-3 text-gray-900 dark:text-white"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 18 2"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M1 1h16"
												/>
											</svg>
										</button>
										<input
											type="text"
											id="quantity-input"
											data-input-counter
											data-input-counter-min="1"
											data-input-counter-max="50"
											aria-describedby="helper-text-explanation"
											className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="999"
											value={ticket.amount}
											required
										/>
										<button
											type="button"
											id="increment-button"
											onClick={() => handleIncrement(ticket.id)}
											data-input-counter-increment="quantity-input"
											className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
										>
											<svg
												className="w-3 h-3 text-gray-900 dark:text-white"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 18 18"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M9 1v16M1 9h16"
												/>
											</svg>
										</button>
									</div>
								</td>
								<td className="px-6 py-4">{ticket.price * ticket.amount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div>총 금액 : {totalPrice} 원 </div>
			<div>
				<button onClick={handleClick}>카카오 결제하기</button>
			</div>
		</div>
	);
}
