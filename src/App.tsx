import { createBrowserRouter, RouterProvider } from "react-router";
import Index from "./pages";
import Payment from "./pages/payment/payment";
import Success from "./pages/payment/success";
import Error from "./pages/error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />,
		errorElement: <Error />,
	},
	{
		path: "/payment",
		element: <Payment />,
	},
	{
		path: "/success",
		element: <Success />,
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
