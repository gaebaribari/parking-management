import { CSSProperties } from "react";
import { SyncLoader } from "react-spinners";

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};

interface LoadingSpinnerProps {
	loading: boolean;
}

export default function LoadingSpinner({ loading }: LoadingSpinnerProps) {
	return (
		<div className="flex pb-5 align-middle justify-center">
			<SyncLoader
				color="#1447e6"
				loading={loading}
				cssOverride={override}
				size={10}
				data-testid="loader"
			/>
		</div>
	);
}
