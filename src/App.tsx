import { createBrowserRouter, RouterProvider } from "react-router";
import Index from "./pages";
import Payment from "./pages/payment/payment";
import Success from "./pages/payment/success";
import Detail from "./pages/detail";
import Confirm from "./pages/payment/confirm";
import Error from "./pages/error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />,
		errorElement: <Error />,
		children: [
			{
				path: "/detail/:objectId",
				element: <Detail />,
			},
		],
	},
	{
		path: "/confirm",
		element: <Confirm />,
	},
	{
		path: "/payment",
		element: <Payment price={10000} />,
	},
	{
		path: "/success",
		element: <Success />,
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
