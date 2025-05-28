interface ParkingInfoProps {
	parkingInfo: any;
	parkingTime: number;
}

export default function ParkingInfo({
	parkingInfo,
	parkingTime,
}: ParkingInfoProps) {
	const progressPercentage =
		parkingTime > 0 ? Math.min(100, (parkingTime / 24) * 100) : 0;
	const styles = {
		promAlert: {
			width: `${progressPercentage}%`,
		} as React.CSSProperties,
	};

	return (
		<div>
			<div className="flex justify-center">
				<img className="h-40 w-40 rounded-sm" src={parkingInfo?.imgUrl} />
			</div>
			<div>
				<p>
					<span className="font-bold">차 번호 :</span> {parkingInfo?.car_number}
				</p>
				<p>
					<span className="font-bold">주차 시간 :</span>
					{parkingTime >= 0 ? parkingTime : 0} 시간{" "}
				</p>
			</div>
			<div className="w-full bg-gray-200 my-4 rounded-full h-4">
				<div
					className="bg-blue-600 h-4 rounded-full"
					style={styles.promAlert}
				></div>
			</div>
		</div>
	);
}
